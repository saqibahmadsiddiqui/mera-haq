import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { getKnowledgeBaseSummary, findCategoryByQuery, PAKISTANI_LAW_CATEGORIES } from "@/lib/laws-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, categoryId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Identify category if not provided
    const matchedCategory = categoryId
      ? PAKISTANI_LAW_CATEGORIES.find((c) => c.id === categoryId)
      : findCategoryByQuery(message);

    const knowledgeBase = getKnowledgeBaseSummary();

    const systemPrompt = `You are "Mera Haq" (میرا حق) — an empathetic, authoritative, and accessible AI Legal Rights Assistant designed specifically for everyday Pakistani citizens (tenants, employees, students, consumers, freelancers, gig workers).

Your purpose:
1. Explain the citizen's legal rights clearly in a natural mix of Roman Urdu and English (the way Pakistanis text and communicate casually, e.g., "Aap ka poora legal haq hai...", "Under the Punjab Consumer Protection Act 2005...").
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
            text: `Question from citizen: "${message}"\n${
              matchedCategory ? `Dispute category detected: ${matchedCategory.title} (${matchedCategory.urduTitle})` : ""
            }\nPlease provide a comprehensive, friendly rights explanation in Roman Urdu/English with law citations and next steps.`,
          },
        ],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        },
      });

      if (response && response.text) {
        aiResponseText = response.text;
      }
    } catch (apiError: any) {
      console.warn("Gemini API call returned an issue, using curated fallback knowledge base:", apiError?.message || apiError);
    }

    // If API failed or returned empty, use curated structured fallback
    if (!aiResponseText) {
      const cat = matchedCategory || PAKISTANI_LAW_CATEGORIES[0];
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
