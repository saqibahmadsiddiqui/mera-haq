import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { PAKISTANI_LAW_CATEGORIES } from "@/lib/laws-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      categoryId = "tenant-deposit",
      complainantName = "Aggrieved Citizen",
      complainantCnic = "",
      complainantPhone = "03XX-XXXXXXX",
      complainantCity = "Lahore, Pakistan",
      complainantAddress = "Residential Address, Pakistan",
      respondentName = "Opposing Party / Landlord / Employer",
      respondentAddress = "Business / Residential Address, Pakistan",
      incidentDate = new Date().toLocaleDateString("en-GB"),
      disputedAmount = "",
      facts = "",
      demandType = "",
      noticeDays = 14,
    } = body;

    const matchedCat =
      PAKISTANI_LAW_CATEGORIES.find((c) => c.id === categoryId) ||
      PAKISTANI_LAW_CATEGORIES[0];

    const prompt = `You are a Senior High Court Advocate and Legal Draftsman in Pakistan.
Draft an official, impeccably structured Pakistani Legal Notice / Formal Application based on the following case facts:

DISPUTE DETAILS:
- Category: ${matchedCat.title} (${matchedCat.urduTitle})
- Applicable Pakistani Laws: ${matchedCat.laws.join("; ")}
- Competent Forum/Authority: ${matchedCat.authority}
- Complainant (Sender): ${complainantName} ${complainantCnic ? `(CNIC: ${complainantCnic})` : ""}
- Sender Contact & Address: ${complainantPhone}, ${complainantAddress}, ${complainantCity}
- Respondent (Recipient): ${respondentName}
- Recipient Address: ${respondentAddress}
- Date of Incident / Transaction: ${incidentDate}
- Disputed Claim / Amount: ${disputedAmount ? disputedAmount : "Damages and lawful dues"}
- Specific Demand: ${demandType || "Immediate restitution and compliance with law"}
- Mandatory Notice Period: ${noticeDays} calendar days
- Key Factual Narrative: ${facts || "Default failure to fulfill contractual/legal obligations under Pakistani law."}

INSTRUCTIONS FOR DRAFTING:
1. Use standard Pakistani legal drafting language (English with professional legal gravitas).
2. Start with a prominent HEADER: e.g., "LEGAL DEMAND NOTICE / FORMAL COMPLAINT" citing the specific Pakistani statutory sections.
3. Include Delivery Mode: "BY REGISTERED POST A.D. / UMS & ELECTRONIC DISPATCH".
4. Explicit "TO" and "FROM" blocks.
5. A clear bold "SUBJECT: ...".
6. Break down the facts into 5 to 7 clearly numbered paragraphs (1, 2, 3, 4, 5, 6, 7):
   - Para 1: Context and standing of the Sender.
   - Para 2: Factual timeline of the transaction, agreement, or interaction.
   - Para 3: Clear description of the breach, withholding, defect, or illegal conduct.
   - Para 4: Applicable Pakistani statutory provisions and violation thereof.
   - Para 5: Financial loss, mental agony, and damages incurred by the Sender.
   - Para 6: Specific Demand with the strict ${noticeDays}-day deadline to comply.
   - Para 7: Clear legal consequence clause: If compliance is not made within ${noticeDays} days, the Sender shall institute formal legal proceedings before the ${matchedCat.authority} and other competent courts of law at the Recipient's sole financial risk and cost, including claims for damages and statutory penalties.
7. End with formal sign-off: "Yours faithfully,", Sender Name, Date, Place, and a "Copy for Record" (C.C.) note.
8. Output only the clean formatted notice text. Do not wrap in markdown code blocks.`;

    let generatedLetterText = "";

    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.2,
        },
      });

      if (response && response.text) {
        generatedLetterText = response.text.trim();
        // Remove code block markers if any
        if (generatedLetterText.startsWith("```") && generatedLetterText.endsWith("```")) {
          generatedLetterText = generatedLetterText
            .replace(/^```(?:markdown|text)?\n/, "")
            .replace(/\n```$/, "");
        }
      }
    } catch (apiError: any) {
      console.warn("Gemini API call for letter generation failed, using legal template fallback:", apiError?.message || apiError);
    }

    // Fallback template if API was unavailable
    if (!generatedLetterText) {
      const today = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      generatedLetterText = `LEGAL DEMAND NOTICE
(ISSUED UNDER ${matchedCat.laws[0].toUpperCase()})

BY REGISTERED POST A.D. / UMS / COURIER & ELECTRONIC DISPATCH

Date: ${today}
Place: ${complainantCity}

TO:
${respondentName}
${respondentAddress}

FROM (SENDER):
${complainantName}
${complainantCnic ? `CNIC No: ${complainantCnic}\n` : ""}${complainantAddress}
${complainantCity}
Contact: ${complainantPhone}

SUBJECT: STATUTORY LEGAL NOTICE FOR ${demandType ? demandType.toUpperCase() : "REDRESSAL OF GRIEVANCE AND IMMEDIATE RESTITUTION"} UNDER ${matchedCat.laws[0].toUpperCase()}

Sir / Madam,

Under instructions and on behalf of myself (the Complainant), I hereby serve upon you this formal Statutory Legal Notice on the following facts, grounds, and legal premises:

1. That the Complainant is a law-abiding citizen of Pakistan residing at the address mentioned above, entitled to all fundamental and statutory rights guaranteed under the Constitution of the Islamic Republic of Pakistan and applicable laws.

2. That on or around ${incidentDate}, a lawful transaction / relationship was established between the parties pertaining to: ${matchedCat.title}.

3. That the specific facts and grievances are as follows:
   ${facts || "The Respondent has unlawfully failed, refused, and neglected to fulfill their statutory and contractual obligations, causing severe financial prejudice, inconvenience, and mental distress to the Complainant."}

4. That your aforesaid arbitrary and unlawful omission / act directly violates the provisions of ${matchedCat.laws.join(" as well as ")}, and constitutes an actionable legal breach.

5. That on account of your unlawful actions, the Complainant has suffered an actionable loss and claim amounting to ${disputedAmount || "the lawful statutory claim"} along with severe mental agony and unnecessary expenses.

6. That through this Statutory Legal Notice, you are hereby called upon and given STRICT NOTICE of ${noticeDays} DAYS from the receipt hereof to:
   a) Immediately fulfill the demand: ${demandType || "Comply with the lawful terms and disburse all outstanding dues/refunds"} (${disputedAmount ? `Amount: ${disputedAmount}` : ""});
   b) Tender an unconditional apology and confirm resolution in writing to the Complainant.

7. TAKE NOTICE that in the event of your failure, refusal, or neglect to comply with the requisitions of this Notice within the stipulated period of ${noticeDays} days, the Complainant shall be constrained to institute appropriate civil, criminal, and statutory proceedings against you before the ${matchedCat.authority}, District Consumer Protection Court, or other competent judicial forums. In such an event, you shall be solely liable for all ensuing costs, court fees, advocates' expenses, statutory penalties, and substantial damages.

A copy of this notice is retained on record for evidential purposes in court.

Yours faithfully,

_______________________
${complainantName}
${complainantPhone}
${complainantCity}

C.C.:
1. Retained in Office file for record and future litigation before the ${matchedCat.authority}.`;
    }

    return NextResponse.json({
      success: true,
      letterText: generatedLetterText,
      category: matchedCat.id,
      categoryTitle: matchedCat.title,
      authority: matchedCat.authority,
      noticeDays: noticeDays,
      complainantName: complainantName,
      respondentName: respondentName,
    });
  } catch (error: any) {
    console.error("Error in /api/generate-letter:", error);
    return NextResponse.json(
      {
        error: "Failed to generate legal notice.",
        details: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
