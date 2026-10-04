import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";

export const dynamic = "force-dynamic";
import {
  getKnowledgeBaseSummary,
  findCategoryByQuery,
  classifyQuery,
  getOffTopicRefusalMessage,
  getScopeIntroductionMessage,
  PAKISTANI_LAW_CATEGORIES,
} from "@/lib/laws-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, categoryId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const trimmedMsg = message.trim();

    // Classify query intent and check for off-topic, capabilities inquiry, or legal dispute
    const {
      isOffTopic: preClassifiedOffTopic,
      matchedCategory: autoCategory,
      isGeneralLegal,
      isScopeQuery,
    } = classifyQuery(trimmedMsg);

    // Fast-path response for scope/capability inquiries ("What kind of issues can you solve?")
    if (isScopeQuery && !categoryId) {
      return NextResponse.json({
        text: getScopeIntroductionMessage(),
        category: "scope-overview",
        categoryTitle: "Mera Haq Supported Legal Scope & Services",
        categoryUrdu: "قانونی مسائل اور خدمات کا احاطہ",
        lawsCited: [
          "Punjab/Sindh Rented Premises Acts",
          "Payment of Wages Act 1936",
          "PECA 2016 (FIA Cybercrime)",
          "Consumer Protection Acts",
          "Contract Act 1872",
        ],
        authority: "Relevant Courts, Tribunals & Ombudsmen of Pakistan",
        helpline: "FIA: 1991 | Consumer: 1334 | Traffic: 1915",
        portalUrl: "https://complaint.fia.gov.pk",
        canGenerateLetter: false,
        isOffTopic: false,
        sources: [],
        standardNoticeDays: 14,
        sampleNoticeTitle: "Formal Legal Notice / Complaint Letter",
      });
    }

    // If user explicitly sent a categoryId from a card chip, honor it
    const matchedCategory = categoryId
      ? PAKISTANI_LAW_CATEGORIES.find((c) => c.id === categoryId) || autoCategory
      : autoCategory;

    // Fast-path deterministic refusal for clearly off-topic queries (e.g., weather, cricket, recipes)
    if (preClassifiedOffTopic && !categoryId) {
      return NextResponse.json({
        text: getOffTopicRefusalMessage(trimmedMsg),
        category: "off-topic",
        categoryTitle: "Ghair Mutaliqa Sawal (Out of Scope)",
        categoryUrdu: "غیر متعلقہ سوال",
        lawsCited: [],
        authority: "",
        helpline: "",
        portalUrl: "",
        canGenerateLetter: false,
        isOffTopic: true,
        sources: [],
        standardNoticeDays: 0,
        sampleNoticeTitle: "",
      });
    }

    const knowledgeBase = getKnowledgeBaseSummary();

    const systemPrompt = `You are "Mera Haq" (میرا حق) — an empathetic, authoritative, and accessible AI Legal Rights Assistant designed specifically for everyday Pakistani citizens (tenants, employees, students, consumers, freelancers, gig workers).

CRITICAL SCOPE & RELEVANCE GUARDRAIL:
You are STRICTLY a Pakistani Legal Rights Assistant.
If the citizen's query is UNRELATED to law, legal rights, civil or criminal disputes, consumer grievances, tenancy, workplace issues, cybercrime, police/traffic matters, or legal documentation (for example: asking about weather, sports/cricket, cooking, general knowledge, movies, jokes, coding):
1. DO NOT answer the off-topic query.
2. DO NOT fabricate or cite tenancy laws or criminal statutes for an unrelated topic.
3. Start your entire reply with the tag "[OFF_TOPIC]" on the very first line.
4. Politely explain in Roman Urdu and English that Mera Haq only covers Pakistani legal rights and disputes, and guide them on what legal issues they can ask about.

IF THE CITIZEN ASKS ABOUT YOUR CAPABILITIES, WHAT ISSUES YOU CAN SOLVE, OR HOW YOU CAN HELP:
1. Do NOT fabricate an active lawsuit roadmap or cite generic court procedures like Article 10-A.
2. Provide a clear, empowering breakdown of the 8 legal dispute areas Mera Haq handles (Tenant & Rent disputes, Unpaid salary, Cybercrime/PECA blackmail, Consumer fraud/Daraz, Wrongful termination, Traffic challans, Freelancer payment breach, Banking/Easypaisa fraud).
3. Explain that you provide plain-language verdicts, exact Pakistani laws, competent authorities/forums, evidence-gathering roadmaps, and ready-to-use formal legal notices.
4. Invite the user to describe their situation in Roman Urdu or English.

FOR LEGITIMATE LEGAL & RIGHTS QUERIES:
1. Explain the citizen's legal rights clearly in a natural mix of Roman Urdu and English (the way Pakistanis text casually, e.g., "Aap ka poora legal haq hai...", "Under the Punjab Consumer Protection Act 2005...").
2. Clearly cite the exact Pakistani law, act, or ordinance by name (e.g., Punjab Rented Premises Act 2009, Payment of Wages Act 1936, PECA 2016, Punjab Consumer Protection Act 2005, Contract Act 1872).
3. Name the exact competent authority / forum (e.g. Special Judge Rent / Rent Tribunal, FIA Cybercrime Wing, District Consumer Protection Court, Authority under Payment of Wages Act, Banking Mohtasib).
4. Give a practical 3-step action roadmap (Gather proofs/WhatsApp chats -> Send formal statutory legal notice -> Approach designated portal/court).
5. Always maintain an empowering, polite, and reassuring tone.
6. End every answer with a standard reminder that this is general legal education and not formal courtroom legal advice.

Here is the reference knowledge base of Pakistani laws and authorities:
${knowledgeBase}

FORMAT YOUR RESPONSE IN CLEAN, HIGHLY READABLE MARKDOWN:
- Start with a direct, reassuring 1-2 sentence verdict in Roman Urdu (e.g., "**Aap ka poora haq hai:** ...").
- **📜 Kaunsa Qanoon Lagu Hota Hai (Applicable Pakistani Law):** Name the exact statute and authority.
- **🛡️ Aap ke Bunyadi Haqooq (Your Key Rights):** 2-3 crisp bullet points.
- **⚡ 3 Zaroori Iqdamat (Next 3 Steps to Take):**
  1. *Saboot Mehfooz Karein (Gather Proofs)*: WhatsApp chats, receipts, bank statements.
  2. *Qanooni Notice Bhejein (Issue Formal Notice)*: Mention standard notice period (7, 14, or 15 days).
  3. *Authority se Ruju Karein (Approach Authority)*: Provide helpline/portal name.
- Highlight the "Generate Complaint Letter" capability so the user knows they can click the button below to generate a ready-to-use formal legal notice.
- **⚠️ Disclaimer**: "Mera Haq general qanooni maloomat faraham karta hai, yeh court ke liye wakeel ki raye ka mutabadil nahi hai."`;

    let aiResponseText = "";
    let isModelOffTopic = false;
    let sources: Array<{ title: string; url: string }> = [];
    let lawsCited: string[] = matchedCategory ? matchedCategory.laws : [];
    let authorityName = matchedCategory ? matchedCategory.authority : "Relevant District Authority / Court";

    try {
      const ai = getGeminiClient();

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Add conversation history if provided
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          if (item.sender === "user") {
            contents.push({ role: "user", parts: [{ text: item.text }] });
          } else if (item.sender === "ai") {
            contents.push({ role: "model", parts: [{ text: item.text }] });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [
          {
            text: `Question from citizen: "${trimmedMsg}"\n${
              matchedCategory
                ? `Dispute category detected: ${matchedCategory.title} (${matchedCategory.urduTitle})`
                : ""
            }\nIf this is an unrelated non-legal question (such as weather, entertainment, cooking), begin with [OFF_TOPIC] and politely decline. Otherwise search the web for relevant Pakistani statutory rules/portals and provide a comprehensive rights explanation in Roman Urdu/English with law citations.`,
          },
        ],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2,
          tools: [{ googleSearch: {} }],
        },
      });

      if (response && response.text) {
        let rawText = response.text.trim();
        if (rawText.startsWith("[OFF_TOPIC]")) {
          isModelOffTopic = true;
          aiResponseText = rawText.replace("[OFF_TOPIC]", "").trim();
        } else {
          aiResponseText = rawText;

          // Extract Google Search grounding sources & citations
          const candidate = response.candidates?.[0];
          const groundingMetadata = (candidate as any)?.groundingMetadata;
          const groundingChunks = groundingMetadata?.groundingChunks;

          if (Array.isArray(groundingChunks)) {
            const seenUrls = new Set<string>();
            for (const chunk of groundingChunks) {
              const uri = chunk?.web?.uri;
              const title = chunk?.web?.title;
              if (uri && typeof uri === "string" && !seenUrls.has(uri)) {
                seenUrls.add(uri);
                try {
                  const parsed = new URL(uri);
                  sources.push({
                    title: title || parsed.hostname.replace(/^www\./, ""),
                    url: uri,
                  });
                } catch {
                  sources.push({
                    title: title || uri,
                    url: uri,
                  });
                }
              }
            }
          }
        }
      }
    } catch (apiError: any) {
      console.warn("Gemini API call returned an issue, using curated fallback knowledge base:", apiError?.message || apiError);
    }

    // Handle off-topic response detected by model
    if (isModelOffTopic) {
      return NextResponse.json({
        text: aiResponseText || getOffTopicRefusalMessage(trimmedMsg),
        category: "off-topic",
        categoryTitle: "Ghair Mutaliqa Sawal (Out of Scope)",
        categoryUrdu: "غیر متعلقہ سوال",
        lawsCited: [],
        authority: "",
        helpline: "",
        portalUrl: "",
        canGenerateLetter: false,
        isOffTopic: true,
        sources: [],
        standardNoticeDays: 0,
        sampleNoticeTitle: "",
      });
    }

    // Curated structured fallback if API call was empty or errored
    if (!aiResponseText) {
      if (matchedCategory) {
        const cat = matchedCategory;
        aiResponseText = `**Aap ka poora qanooni haq hai:** Pakistani qanoon aap ko is mamlay me mukammal tahaffuz faraham karta hai.

### 📜 Kaunsa Qanoon Lagu Hota Hai (Applicable Pakistani Law):
* **Qanoon (Law):** ${cat.laws.join(", ")}
* **Mutaliqa Authority (Forum):** ${cat.authority} (${cat.authorityUrdu})
* **Helpline / Portal:** ${cat.helpline || "District Court Facilitation"} | ${cat.portalUrl || "Local Judiciary Portal"}

### 🛡️ Aap ke Bunyadi Haqooq (Your Key Rights):
${cat.keyRights.map((r) => `* **${r}**`).join("\n")}

### ⚡ 3 Zaroori Iqdamat (Action Steps to Take Right Now):
1. **Saboot Mehfooz Karein (Document Everything):** ${cat.actionSteps[0]}
2. **Qanooni Notice Bhejein (Serve Formal Notice):** ${cat.actionSteps[1]} (${cat.standardNoticeDays} din ka notice zaroori hai).
3. **Authority se Ruju Karein (File Complaint):** ${cat.actionSteps[2]}

💡 *Tip: Aap neeche diye gaye **"Generate Complaint Letter / Legal Notice"** button par click kar ke foran apne naam aur details ke sath ready-to-send formal legal notice download kar sakte hain.*

---
*⚠️ **Disclaimer**: Mera Haq gives general legal information based on Pakistani statutes, not formal legal advice. Consult a licensed advocate for courtroom litigation.*`;
      } else if (isGeneralLegal) {
        aiResponseText = `**Aap ka poora qanooni haq hai:** Pakistani qanoon aur Constitution har shehri ke bunyadi haqooq ki hifazat karta hai.

### 📜 Kaunsa Qanoon Lagu Hota Hai (Applicable Pakistani Law):
* **Pakistani Qanooni Nizam:** Code of Civil Procedure 1908 / Pakistan Penal Code 1860 / Constitution of the Islamic Republic of Pakistan (Articles 9, 10-A, 14, 24).
* **Mutaliqa Authority (Forum):** District & Sessions Courts / Concerned District Magistrate / Provincial Ombudsman (Mohtasib).
* **Legal Facilitation:** District Bar Legal Aid Committee / High Court Facilitation Center.

### 🛡️ Aap ke Bunyadi Haqooq (Your Key Rights):
* **Due Process & Fair Trial:** Article 10-A ke tehat har shehri ka haq hai ke usay fair hearing aur legal representation di jaye.
* **Protection of Property & Rights:** Bina qanooni decree ya judicial order ke koi shakhs ya idara aap ke haqooq zabt nahi kar sakta.
* **Statutory Notice Requirement:** Kisi bhi civil litigation se qabal dosri party ko formal legal notice bhejna lazmi hota hai.

### ⚡ 3 Zaroori Iqdamat (Next Steps):
1. **Saboot Mehfooz Karein:** Tamam agreements, receipts, bank records aur WhatsApp chats mehfooz karein.
2. **Formal Legal Notice Bhejein:** 14 din ka statutory demand notice bhaij kar grievance redressal demand karein.
3. **Adalat ya Authority se Ruju Karein:** Agar dosri party notice ke baad amal na kare toh barah-e-raast mutaliqa forum par petition daair karein.

---
*⚠️ **Disclaimer**: Mera Haq gives general legal information based on Pakistani statutes, not courtroom advocate representation.*`;
      } else {
        // Query has no legal context and is off-topic
        return NextResponse.json({
          text: getOffTopicRefusalMessage(trimmedMsg),
          category: "off-topic",
          categoryTitle: "Ghair Mutaliqa Sawal (Out of Scope)",
          categoryUrdu: "غیر متعلقہ سوال",
          lawsCited: [],
          authority: "",
          helpline: "",
          portalUrl: "",
          canGenerateLetter: false,
          isOffTopic: true,
          sources: [],
          standardNoticeDays: 0,
          sampleNoticeTitle: "",
        });
      }
    }

    return NextResponse.json({
      text: aiResponseText,
      category: matchedCategory ? matchedCategory.id : "general-dispute",
      categoryTitle: matchedCategory ? matchedCategory.title : "General Pakistani Legal Dispute",
      categoryUrdu: matchedCategory ? matchedCategory.urduTitle : "عمومی قانونی تنازعہ",
      lawsCited: lawsCited,
      authority: authorityName,
      helpline: matchedCategory?.helpline,
      portalUrl: matchedCategory?.portalUrl,
      canGenerateLetter: true,
      isOffTopic: false,
      sources: sources,
      standardNoticeDays: matchedCategory?.standardNoticeDays || 14,
      sampleNoticeTitle: matchedCategory?.sampleNoticeTitle || "Formal Legal Notice under Pakistani Law",
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        error: "Failed to process legal consultation request.",
        details: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

