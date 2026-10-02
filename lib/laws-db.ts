export interface LawCategory {
  id: string;
  title: string;
  urduTitle: string;
  iconName: string;
  tagline: string;
  laws: string[];
  authority: string;
  authorityUrdu: string;
  helpline?: string;
  portalUrl?: string;
  summaryRomanUrdu: string;
  summaryEnglish: string;
  keyRights: string[];
  actionSteps: string[];
  standardNoticeDays: number;
  sampleNoticeTitle: string;
  exampleQueries: string[];
}

export const PAKISTANI_LAW_CATEGORIES: LawCategory[] = [
  {
    id: "tenant-deposit",
    title: "Tenant & Rent Disputes",
    urduTitle: "کرایہ دار اور سیکیورٹی ڈپازٹ کے حقوق",
    iconName: "Home",
    tagline: "Security deposit withholding, illegal eviction, arbitrary rent hikes",
    laws: [
      "Punjab Rented Premises Act, 2009 (Sections 7, 8, 15, 19)",
      "Sindh Rented Premises Ordinance, 1979 (Sections 10, 15)",
      "Islamabad Rent Restriction Act, 2001 / 2023",
      "KPK Rented Premises Act, 2014"
    ],
    authority: "Special Judge Rent / Rent Tribunal / Rent Controller",
    authorityUrdu: "رینٹ ٹریبونل / اسپیشل جج رینٹ",
    helpline: "District Rent Controller Office",
    portalUrl: "https://punjab.gov.pk / Local District Judiciary",
    summaryRomanUrdu:
      "Makaan malik (landlord) bina kisi waja ya bina saboot ke aap ka security deposit nahi rok sakta. Agar makaan khali karte waqt normal wear & tear ke ilawa koi nuksan nahi hua, toh pura deposit wapis karna qanooni farz hai. Is ke ilawa, bina 30-60 din ke legal notice aur baghair Rent Tribunal ke order ke aap ko zabardasti nahi nikala ja sakta, aur na hi bijli/pani/gas band ki ja sakti hai.",
    summaryEnglish:
      "Under Pakistani Tenancy laws, a landlord cannot arbitrarily withhold the tenant's security deposit upon peaceful handover. Deduction is only lawful for actual documented damages or unpaid utility bills. Unlawful eviction without notice and tribunal orders is strictly prohibited, and cutting off utilities is a penal offence under the Tenancy Acts.",
    keyRights: [
      "Full refund of security deposit within agreed handover timeframe.",
      "Protection from arbitrary eviction without Rent Controller decree.",
      "Protection from disconnection of basic utilities (water, gas, electricity).",
      "Statutory notice period (minimum 1 to 2 months) before lease termination.",
      "Legal rent receipt upon every monthly payment."
    ],
    actionSteps: [
      "Gather evidence: Tenancy agreement copy, rent payment receipts/bank transfer proofs, and handover utility clearance bills.",
      "Send a formal 14-day Legal Notice to the Landlord demanding the immediate release of the security deposit.",
      "If unresponsive, file an application before the local Special Judge (Rent) / Rent Tribunal for recovery of security deposit and damages."
    ],
    standardNoticeDays: 14,
    sampleNoticeTitle: "Legal Notice for Refund of Security Deposit & Peaceful Tenancy Handover",
    exampleQueries: [
      "Landlord won't return my security deposit (PKR 60,000)",
      "Makaan malik bina notice ke ghar khali karne ka keh raha hai",
      "Can landlord cut my electricity or gas connection over rent dispute?"
    ]
  },
  {
    id: "unpaid-salary",
    title: "Unpaid Salary & Wages",
    urduTitle: "غیر ادا شدہ تنخواہ اور ملازمین کے حقوق",
    iconName: "Briefcase",
    tagline: "Delayed wages, unauthorized deductions, final settlement delays",
    laws: [
      "Payment of Wages Act, 1936 (Sections 5, 15)",
      "West Pakistan Industrial & Commercial Employment (Standing Orders) Ordinance, 1968",
      "Provincial Industrial Relations Acts (PIRA / SIRA / KPIRA)"
    ],
    authority: "Authority Appointed Under Payment of Wages Act / District Labor Court",
    authorityUrdu: "اتھارٹی پیمنٹ آف ویجز ایکٹ / لیبر کورٹ",
    helpline: "Provincial Labor Directorate / 0800-02345",
    portalUrl: "https://labour.punjab.gov.pk / Provincial Labor Dept",
    summaryRomanUrdu:
      "Pakistan ke labor qanoon ke mutabiq, har employer ka farz hai ke woh maah khatam hone ke 7 se 10 din ke andar aap ki puri tankhwah ada kare. Tankhwah rokna, ghair-qanooni kataoti (deductions) karna, ya resignation ke baad final settlement delay karna qanoonan jurm hai. Aap 3 saal tak ki arrears plus 10x compensation claim kar sakte hain.",
    summaryEnglish:
      "Under the Payment of Wages Act 1936 and Standing Orders 1968, employers are legally obligated to disburse wages within 7 to 10 days of the wage period. Withholding salary, making unauthorized deductions, or stalling final settlement upon resignation is unlawful, entitling the employee to arrears plus statutory compensation through the Labor Authority.",
    keyRights: [
      "Timely payment of salary within 7-10 days of month end.",
      "Zero unauthorized pay cuts without written lawful consent.",
      "Complete final settlement (Gratuity, Provident Fund, Leave Encashment, Pending Dues) within 30 days of exit.",
      "Right to claim up to 10x compensation for delayed/withheld wages.",
      "Protection from retaliatory termination for demanding lawful wages."
    ],
    actionSteps: [
      "Assemble proofs: Appointment letter, work emails, attendance logs, salary slips, and bank statements.",
      "Issue a 7-day Demand Notice for Unpaid Wages to Company Management / HR.",
      "File a formal Claim under Section 15 of Payment of Wages Act before the Authority for Payment of Wages in your district."
    ],
    standardNoticeDays: 7,
    sampleNoticeTitle: "Formal Demand Notice for Immediate Clearance of Withheld Salary & Dues",
    exampleQueries: [
      "Boss hasn't paid my salary in 2 months and giving fake excuses",
      "Company ne resign ke baad final settlement rok li hai",
      "Can employer deduct 50% salary without warning in Pakistan?"
    ]
  },
  {
    id: "cybercrime-harassment",
    title: "Cybercrime & Online Harassment",
    urduTitle: "آن لائن ہراسانی، بلیک میلنگ اور سائبر کرائم",
    iconName: "ShieldAlert",
    tagline: "Blackmail, unauthorized photo sharing, fake profiles, online threats, scams",
    laws: [
      "Prevention of Electronic Crimes Act (PECA), 2016 (Sections 20, 21, 24)",
      "Pakistan Penal Code, 1860 (Sections 506, 509)",
      "Telegraph Act, 1885"
    ],
    authority: "FIA Cyber Crime Wing (Federal Investigation Agency - CCW)",
    authorityUrdu: "ایف آئی اے سائبر کرائم ونگ (FIA CCW)",
    helpline: "1991 (Toll-Free) | WhatsApp: 0336-6006060",
    portalUrl: "https://complaint.fia.gov.pk",
    summaryRomanUrdu:
      "PECA 2016 ke Section 21 ke mutabiq kisi ki zaati tasaveer/videos bina ijazat share karna, blackmail karna, ya Section 20/24 ke tehat online stalk aur dharmiya dena sangin na-qabil-e-zamanat jurm hai jis ki saza 3 se 5 saal qaid aur 50 lakh tak jurmana hai. Foran saboot (screenshots, URLs, phone numbers) mehfooz karein aur FIA Cybercrime ko direct complaint karein.",
    summaryEnglish:
      "Under PECA 2016 (Sections 20, 21 & 24), online harassment, blackmail, extortion using personal data/photos, stalking, and creating fake profiles are non-bailable criminal offenses punishable by up to 5 years imprisonment and heavy fines. The Federal Investigation Agency (FIA) Cybercrime Wing has statutory jurisdiction to track, subpoena, and prosecute perpetrators.",
    keyRights: [
      "Right to immediate digital privacy and protection of reputation under Section 20 & 21 PECA.",
      "Protection from non-consensual dissemination of private images/videos.",
      "Right to file an expedited online complaint directly with FIA Cybercrime Wing.",
      "Option to register confidential complaints, especially for female victims.",
      "Statutory takedown and blocking of illicit content via PTA & FIA coordination."
    ],
    actionSteps: [
      "DO NOT delete chats: Take timestamped screenshots of messages, caller IDs, WhatsApp chats, social media profiles, and URLs.",
      "File an online complaint immediately at complaint.fia.gov.pk or call FIA Helpline 1991.",
      "Draft and submit a formal written complaint letter to the In-Charge, FIA Cyber Crime Reporting Centre (CCRC) of your division."
    ],
    standardNoticeDays: 3,
    sampleNoticeTitle: "Formal Criminal Complaint for Cyber Blackmail, Harassment & Defamation under PECA 2016",
    exampleQueries: [
      "Someone is blackmailing me with private photos online on WhatsApp",
      "Fake social media profile created with my name and phone number",
      "Received threatening calls and extortion messages on WhatsApp"
    ]
  },
  {
    id: "consumer-fraud",
    title: "Consumer Rights & Defective Goods",
    urduTitle: "صارفین کے حقوق اور فراڈ مصنوعات کا ازالہ",
    iconName: "ShoppingBag",
    tagline: "Damaged online purchases, fake goods, refusal to refund, deceptive warranty",
    laws: [
      "Punjab Consumer Protection Act, 2005 (Sections 13, 14, 21, 28)",
      "Sindh Consumer Protection Act, 2014",
      "Islamabad Consumer Protection Act, 1995",
      "KPK Consumer Protection Act, 1997"
    ],
    authority: "District Consumer Protection Court (DCPC) / Consumer Council",
    authorityUrdu: "ڈسٹرکٹ کنزیومر کورٹ (صارفین کی عدالت)",
    helpline: "Consumer Court Helpline: 1334 / 0800-02345",
    portalUrl: "https://pcpc.punjab.gov.pk",
    summaryRomanUrdu:
      "Agar kisi dukandar, online store (Daraz, Instagram, website) ya company ne defective ya kharab saman bheja hai, ya warranty pura karne se inkaar kiya hai, toh Consumer Court aap ko 100% refund ke sath mental agony aur damages ka muawaza dilwa sakti hai. Pehle 15 din ka Legal Notice bhejna zaroori hota hai, phir Consumer Court me muft case file hota hai.",
    summaryEnglish:
      "Provincial Consumer Protection Acts empower buyers to obtain a full refund, product replacement, and substantial compensation for defective goods, faulty services, or deceptive trade practices. The process requires issuing a mandatory 15-day statutory Legal Notice to the manufacturer/seller, followed by filing a claim before the District Consumer Court with zero court fee.",
    keyRights: [
      "Right to receive goods matching advertised merchantable quality.",
      "Full refund or immediate replacement for defective, broken, or counterfeit items.",
      "Zero court fees for filing complaints in the District Consumer Protection Court.",
      "Right to claim damages for mental torture, financial loss, and legal expenses.",
      "Fast-track judicial disposal (typically within 6 months)."
    ],
    actionSteps: [
      "Save the order receipt, courier tracking slip, unboxing photos/video, and conversation with seller.",
      "Serve a 15-Day Statutory Legal Notice under the Consumer Protection Act via registered post/TCS/email.",
      "If the seller refuses or fails to respond within 15 days, file a complaint before the District Consumer Protection Court."
    ],
    standardNoticeDays: 15,
    sampleNoticeTitle: "15-Day Statutory Legal Notice for Defective Product Refund & Damages under Consumer Protection Act",
    exampleQueries: [
      "I got a fake/damaged product on Daraz/Instagram, seller won't refund",
      "Authorized service center is refusing to honor 1-year warranty for AC/phone",
      "Online clothing brand sent wrong cheap item and blocked my number"
    ]
  },
  {
    id: "wrongful-termination",
    title: "Wrongful Job Termination",
    urduTitle: "نوکری سے بلا جواز برطرفی اور نوٹس پیریڈ کے حقوق",
    iconName: "UserX",
    tagline: "Fired without 1-month notice, sudden termination without reason, illegal dismissal",
    laws: [
      "West Pakistan Industrial & Commercial Employment (Standing Orders) Ordinance, 1968 (Standing Order 12)",
      "Provincial Industrial Relations Acts (Section 25-A Grievance Notice)",
      "Constitution of Pakistan (Article 18 - Freedom of Trade & Profession)"
    ],
    authority: "Labor Court / Provincial Directorate of Labor",
    authorityUrdu: "صوبائی لیبر کورٹ / ڈائریکٹوریٹ آف لیبر",
    helpline: "Provincial Labor Department / 0800-02345",
    portalUrl: "https://labour.punjab.gov.pk",
    summaryRomanUrdu:
      "Pakistan ke labor laws ke mutabiq permanent ya contractual employee ko bina kisi tehreeri wajah (written reason) aur bina 1 maah ke notice (ya 1 maah ki izafi tankhwah) ke foran terminate nahi kiya ja sakta. Agar aap ko ghair-qanooni tor par nikala gaya hai, toh aap 90 din ke andar Grievance Notice bhej kar Labor Court me reinstatement ya compensation claim kar sakte hain.",
    summaryEnglish:
      "Under Standing Order 12 of the Industrial & Commercial Employment Ordinance 1968, an employer cannot terminate employment without stating explicit written reasons, nor without providing one month's prior notice or one month's salary in lieu. Aggrieved workers have the statutory right to serve a Section 25-A Grievance Notice within 90 days and seek reinstatement with back-benefits in Labor Court.",
    keyRights: [
      "Mandatory 1-month prior written notice OR 1 month gross salary in lieu.",
      "Requirement of explicit, justifiable written grounds for termination in termination letter.",
      "Mandatory domestic inquiry before termination on alleged misconduct charges.",
      "Right to receive all accumulated provident funds, gratuity, and dues immediately.",
      "Statutory right to challenge termination under Section 25-A of Industrial Relations Act."
    ],
    actionSteps: [
      "Collect employment contract, termination email/letter, past pay stubs, and performance appraisal records.",
      "Serve a formal 'Grievance Notice under Section 25-A' to the Managing Director/Employer within 90 days.",
      "If the employer fails to redress within 15 days, institute a Grievance Petition before the presiding Judge of the Labor Court."
    ],
    standardNoticeDays: 15,
    sampleNoticeTitle: "Grievance Notice under Section 25-A against Unlawful Termination & Claim for Dues",
    exampleQueries: [
      "My employer fired me today with no prior notice and no reason given",
      "Company fired me on the spot and refused to give 1 month salary in lieu",
      "Boss forced me to resign without paying my dues"
    ]
  },
  {
    id: "traffic-challan",
    title: "Arbitrary Traffic Challan Disputes",
    urduTitle: "ٹریفک چالان اور غلط جرمانے کا قانونی ازالہ",
    iconName: "AlertTriangle",
    tagline: "Fake violations, faulty traffic warden actions, unfair electronic fines",
    laws: [
      "Provincial Motor Vehicles Ordinance, 1965",
      "Police Order, 2002 (Sections 155, 156)",
      "Provincial Safe Cities Authority Acts (e.g. PSCA Act 2016)"
    ],
    authority: "SP Traffic / Traffic Police Grievance Cell / Judicial Magistrate (Traffic)",
    authorityUrdu: "ایس پی ٹریفک شکایت سیل / جوڈیشل مجسٹریٹ",
    helpline: "Traffic Police Helpline: 1915 / Safe City 15",
    portalUrl: "https://psca.gop.pk / Citizen Feedback Portal",
    summaryRomanUrdu:
      "Agar traffic warden ne ghalat challan kiya hai, camera photo me gari aap ki nahi thi, ya bina kisi qanooni violation ke ticket kata gaya hai, toh aap ko isay challenge karne ka qanooni haq hai. Warden aap ka CNIC/License bina ticket zabt nahi kar sakta. Aap 10 din ke andar SP Traffic Office ya designated Traffic Grievance Cell me challan cancellation ki darkhwast de sakte hain.",
    summaryEnglish:
      "Under the Provincial Motor Vehicles Ordinance 1965 and Police Order 2002, citizens have the legal remedy to dispute erroneous manual or e-challans issued without evidential proof or due process. Traffic police officers are prohibited from arbitrarily retaining original documents, and disputes can be submitted for administrative review before the SP Traffic or contested before a Traffic Magistrate.",
    keyRights: [
      "Right to inspect video/photographic evidence for e-challans (PSCA/Safe City).",
      "Right to a fair hearing before paying contested penalties.",
      "Protection from arbitrary document confiscation without statutory seizure memo.",
      "Right to file administrative review before Superintendent of Police (SP Traffic).",
      "Right to approach the Judicial Magistrate Traffic to challenge wrongful citations."
    ],
    actionSteps: [
      "Take photos of the location, challan receipt, vehicle registration, and any dashcam or GPS evidence.",
      "Submit an Online / In-person Grievance Application to the SP Traffic Grievance Cell or Safe City Authority.",
      "Appear before the Traffic Magistrate on the scheduled date if the administrative review is rejected."
    ],
    standardNoticeDays: 7,
    sampleNoticeTitle: "Administrative Application for Cancellation of Erroneous Traffic Challan",
    exampleQueries: [
      "I got an unfair traffic challan for jumping signal which was green",
      "Received Safe City e-challan for a car number that doesn't belong to me",
      "Traffic warden took my original driving license without giving proper receipt"
    ]
  },
  {
    id: "freelance-contract",
    title: "Freelancer & Small Contract Breaches",
    urduTitle: "فری لانسنگ اور کاروباری معاہدے کی خلاف ورزی",
    iconName: "FileCheck",
    tagline: "Client refused payment after delivery, ghosted on milestone, breach of contract",
    laws: [
      "Contract Act, 1872 (Sections 73, 74 - Breach & Compensation)",
      "Electronic Transactions Ordinance (ETO), 2002",
      "Qanun-e-Shahadat Order, 1984 (Admissibility of Digital Evidence)",
      "Small Claims and Minor Offences Courts Ordinance, 2002"
    ],
    authority: "Senior Civil Judge / Small Claims Court / Dispute Arbitration",
    authorityUrdu: "اسمال کلیمز کورٹ / سول جج",
    helpline: "District Courts Facilitation Centre",
    portalUrl: "https://www.lhc.gov.pk / Provincial Judiciary",
    summaryRomanUrdu:
      "Agar kisi Pakistani client ya company ne aap se software, design, content, ya koi kaam karwaya aur delivery ke baad paise dene se inkaar kar diya ya block kar diya, toh WhatsApp chats, emails aur invoices qanoonan valid agreement hain (Contract Act 1872 & ETO 2002). Aap 7 din ka Legal Notice bhej kar Small Claims Court me recovery claim kar sakte hain.",
    summaryEnglish:
      "Under the Contract Act 1872 and the Electronic Transactions Ordinance 2002, digital agreements, email correspondence, and WhatsApp confirmations constitute legally binding contracts. Freelancers and service providers can initiate recovery proceedings for unpaid delivered milestones along with damages through the Small Claims and Minor Offences Court.",
    keyRights: [
      "Legal recognition of digital agreements, emails, and WhatsApp chats as binding evidence.",
      "Right to full compensation for completed and delivered milestones under Section 73 Contract Act.",
      "Right to charge interest / damages for wrongful financial deprivation.",
      "Fast-track recovery through the Small Claims Court for disputes under statutory pecuniary limits.",
      "Immediate ownership retention of intellectual property until full clearance of dues."
    ],
    actionSteps: [
      "Export all WhatsApp chats, email approvals, project scope documents, and delivery receipts with timestamps.",
      "Issue a formal 7-Day Final Legal Notice for Recovery of Outstanding Professional Fees.",
      "File a Summary Suit or Small Claims petition before the Civil Judge / Small Claims Court."
    ],
    standardNoticeDays: 7,
    sampleNoticeTitle: "Formal Legal Notice for Payment of Outstanding Professional Services Fees under Contract Act 1872",
    exampleQueries: [
      "Local software client took app delivery and refused to pay final PKR 120,000",
      "Client ghosted and blocked me on WhatsApp after receiving website design",
      "Is WhatsApp agreement legally valid in Pakistani courts for freelance work?"
    ]
  },
  {
    id: "bank-wallet-fraud",
    title: "Bank & Digital Wallet Fraud",
    urduTitle: "بینک اور ایزی پیسہ / جاز کیش فراڈ",
    iconName: "CreditCard",
    tagline: "Easypaisa/JazzCash unauthorized transfer, ATM card skimming, bank delay in chargeback",
    laws: [
      "Payment Systems and Electronic Fund Transfers Act, 2007 (Sections 34, 38)",
      "Banking Companies Ordinance, 1962",
      "State Bank of Pakistan (SBP) Consumer Protection Framework"
    ],
    authority: "Banking Mohtasib Pakistan (Banking Ombudsman) / SBP Banking Conduct Dept",
    authorityUrdu: "بینکنگ محتسب پاکستان / اسٹیٹ بینک آف پاکستان",
    helpline: "Banking Mohtasib: 021-99217334-38",
    portalUrl: "https://www.bankingmohtasib.gov.pk",
    summaryRomanUrdu:
      "Agar aap ke bank account, Easypaisa ya JazzCash se kisi ne unauthorized transaction ki hai ya ATM me paise phans gaye aur bank 7 din me refund nahi kar raha, toh SBP regulations ke tehat bank ki zimmedari hai. Agar bank 45 din me masla hal na kare, toh Banking Mohtasib (Banking Ombudsman) foran bank ko refund karne ka hukam deta hai.",
    summaryEnglish:
      "Under the Payment Systems and Electronic Fund Transfers Act 2007 and SBP guidelines, financial institutions and microfinance wallets (Easypaisa/JazzCash) must maintain dispute resolution protocols for unauthorized debits. If unresolved within 45 days, citizens can lodge a complaint with the Banking Mohtasib Pakistan for binding restitution.",
    keyRights: [
      "Mandatory investigation of disputed electronic fund transfers within statutory timelines.",
      "Right to compensation for ATM failure when money is debited but not dispensed.",
      "Free dispute resolution via the statutory Banking Ombudsman (Banking Mohtasib).",
      "Protection from bank negligence in multi-factor transaction security.",
      "Right to immediate blocking of compromised cards/accounts upon reporting."
    ],
    actionSteps: [
      "Immediately call bank/wallet helpline to block account/card and obtain a formal Complaint Reference Number.",
      "Submit a written dispute form along with account statements and SMS transaction alerts.",
      "If the bank fails to resolve within 45 days, file a formal complaint online at bankingmohtasib.gov.pk."
    ],
    standardNoticeDays: 14,
    sampleNoticeTitle: "Formal Grievance Complaint to Banking Mohtasib for Unauthorized Electronic Transfer & Non-Reversal",
    exampleQueries: [
      "Easypaisa account had unauthorized deduction of PKR 45,000 without OTP",
      "ATM debited PKR 25,000 but didn't dispense cash and bank is delaying",
      "How to file complaint against bank with Banking Mohtasib Pakistan?"
    ]
  }
];

export function getKnowledgeBaseSummary(): string {
  return PAKISTANI_LAW_CATEGORIES.map((cat, idx) => {
    return `### Category ${idx + 1}: ${cat.title} (${cat.urduTitle})
- **Applicable Pakistani Laws**: ${cat.laws.join("; ")}
- **Competent Authority**: ${cat.authority} (${cat.authorityUrdu})
- **Helpline / Portal**: ${cat.helpline || "N/A"} | ${cat.portalUrl || "N/A"}
- **Plain Roman Urdu Overview**: ${cat.summaryRomanUrdu}
- **Plain English Overview**: ${cat.summaryEnglish}
- **Key Protected Rights**: ${cat.keyRights.join(" | ")}
- **Recommended Action Steps**: ${cat.actionSteps.join(" -> ")}
- **Standard Notice Timeline**: ${cat.standardNoticeDays} days`;
  }).join("\n\n");
}

/**
 * Checks if a query is clearly off-topic and unrelated to Pakistani legal rights or citizen disputes.
 * Handles common off-topic topics like weather, sports, cooking, coding, general trivia, entertainment, etc.
 */
export function isExplicitlyOffTopic(query: string): boolean {
  const q = query.toLowerCase().trim();

  // Common off-topic triggers
  const offTopicPatterns = [
    /\b(weather|whether|mausam|mosam|rain|barish|barsat|temperature|degree|humidity|forecast|heatwave|cold|sunny)\b/,
    /\b(cricket|psl|ipl|match|score|wicket|football|fifa|messi|ronaldo|babar azam|virat|hockey)\b/,
    /\b(recipe|khana|biryani|salan|cook|cooking|cake|pizza|burger|tea|chai|coffee)\b/,
    /\b(python|javascript|typescript|react|code|coding|programming|function|syntax|html|css|bug|compiler)\b/,
    /\b(movie|film|cinema|song|gana|geet|actor|actress|drama|season|netflix|youtube channel)\b/,
    /\b(joke|latifa|jokes|shayari|poetry|sher|kahani|story|astrology|horoscope|zodiac)\b/,
    /\b(crypto|bitcoin|ethereum|forex trading|stock price|gold rate|dollar rate today)\b/,
    /\b(who is the (prime minister|president|king|queen|founder)|capital of|population of|distance between)\b/,
    /\b(translate (this|into|to)|how to speak|meaning of word|grammar)\b/,
    /\b(how are you|kese ho|kia hal hai|kya haal hai|hi|hello|hey|salam|assalam|bye)\b$/
  ];

  // If matched one of the off-topic patterns AND does not contain a legal keyword
  const matchesOffTopic = offTopicPatterns.some((pattern) => pattern.test(q));
  if (matchesOffTopic && !hasPakistaniLegalContext(q)) {
    return true;
  }

  return false;
}

/**
 * Checks if the text has any legal dispute, rights, statutory or court context in Pakistan
 */
export function hasPakistaniLegalContext(query: string): boolean {
  const q = query.toLowerCase();
  const legalKeywords = [
    "law", "qanoon", "kanoon", "legal", "court", "adalat", "wakeel", "vakil", "advocate",
    "rights", "haq", "haqooq", "notice", "fir", "police", "thanay", "thana", "magistrate",
    "judge", "tribunal", "section", "act", "ordinance", "constitution",
    "deposit", "landlord", "rent", "kiraya", "makaan", "makan", "tenant", "evict", "eviction",
    "salary", "wage", "tankhwah", "tankha", "settlement", "gratuity", "allowance", "boss", "job", "fire", "fired", "terminate", "dismiss",
    "cyber", "peca", "fia", "blackmail", "harass", "leak", "photo", "dhamki", "threat", "scam",
    "daraz", "consumer", "defect", "refund", "warranty", "shopping", "kharab",
    "challan", "traffic", "warden", "license", "fine", "signal", "safe city",
    "freelance", "contract", "agreement", "invoice", "client", "milestone", "breach",
    "bank", "atm", "easypaisa", "jazzcash", "mohtasib", "ombudsman", "cheque", "dishonor", "489",
    "fraud", "dhoka", "chori", "theft", "stolen", "property", "zameen", "qabza", "wirasat", "inheritance",
    "talaq", "divorce", "khula", "maintenance", "kharcha", "bail", "zamanat", "custody", "illegal"
  ];

  return legalKeywords.some((kw) => q.includes(kw));
}

export interface QueryIntentResult {
  isOffTopic: boolean;
  matchedCategory?: LawCategory;
  isGeneralLegal: boolean;
  isScopeQuery?: boolean;
}

export function isScopeOrCapabilitiesQuery(query: string): boolean {
  const q = query.toLowerCase().trim();
  const patterns = [
    /what kind of/i,
    /what (types|type|category|categories) of/i,
    /what (issues|problems|disputes|cases) (can|do|will) you/i,
    /give (me|us) a solution/i,
    /provide (me|us)?\s*(a\s*)?solution/i,
    /what can you (do|solve|help|provide)/i,
    /what solutions? (can|do) you/i,
    /how can you help/i,
    /what is your (scope|purpose|role|feature)/i,
    /what can i ask/i,
    /what do you do/i,
    /kin (masail|cheezon|kanoon|qanoon) m(e|ein) madad/i,
    /aap k(ya|ia) kar sakte h(ain|n)/i,
    /introduce yourself/i,
    /what is mera haq/i,
    /who are you/i,
    /services? (you provide|available)/i,
  ];
  return patterns.some((p) => p.test(q));
}

export function getScopeIntroductionMessage(): string {
  return `### ⚖️ Mera Haq (میرا حق) — Supported Legal Issues & Solutions

**Mera Haq** is an AI Legal Rights & Notice Generator tailored for everyday Pakistani citizens (tenants, employees, consumers, freelancers, gig workers, and students).

Whenever you face a dispute or violation of rights, Mera Haq provides:
1. **Clear Legal Verdict & Rights Breakdown** in easy Roman Urdu + English.
2. **Exact Pakistani Statute & Sections** (e.g. *Punjab Rented Premises Act 2009*, *Payment of Wages Act 1936*, *PECA 2016*).
3. **Designated Forum / Court / Helpline** to approach (e.g. *Rent Tribunal*, *Labor Court*, *FIA Cybercrime*, *Consumer Court*).
4. **Actionable 3-Step Evidence & Notice Roadmap**.
5. **Ready-to-Use Formal Legal Notice Generator** to send to the opposing party.

---

### 🛡️ The 8 Core Legal Dispute Areas We Solve:

1. **🏠 Tenant & Rent Disputes (کرایہ داری کے مسائل)**
   * Landlord unlawfully withholding your security deposit.
   * Arbitrary eviction threats without 30–60 days statutory notice.
   * Landlord cutting off electricity, water, or gas connections.
   * *Forum:* Special Judge Rent / Rent Tribunal.

2. **💼 Unpaid Salary & Delayed Wages (تنخواہ اور ملازمین کے حقوق)**
   * Employer withholding monthly salary or delaying final settlement upon resignation.
   * Unlawful pay cuts or refusal to pay gratuity and provident fund.
   * *Forum:* Authority Under Payment of Wages Act / Labor Court.

3. **🛡️ Cybercrime & Online Harassment (آن لائن ہراسانی و بلیک میلنگ)**
   * Blackmailing with private pictures/videos on WhatsApp or social media.
   * Identity theft, fake profile creation, online stalking, or threats.
   * *Forum:* FIA Cyber Crime Wing (Helpline: 1991 | complaint.fia.gov.pk).

4. **🛍️ Consumer Rights & Online Shopping Fraud (صارفین کے حقوق)**
   * Daraz, Instagram, or local store delivering fake/defective goods and refusing refund.
   * Refusal to honor 1-year product warranty.
   * *Forum:* District Consumer Protection Court (Zero court fees).

5. **👔 Wrongful Job Termination (نوکری سے بلا جواز برطرفی)**
   * Sudden termination without 1-month written notice or 1-month gross pay in lieu.
   * Firing without formal inquiry or stated legal grounds.
   * *Forum:* Provincial Labor Court (Section 25-A Grievance Notice).

6. **🚦 Erroneous Traffic Challans (غلط ٹریفک چالان)**
   * Wrong Safe City e-challan or incorrect traffic warden ticket.
   * Confiscation of driving license/CNIC without a lawful seizure memo.
   * *Forum:* SP Traffic Grievance Cell / Judicial Magistrate.

7. **💻 Freelancer & Small Contract Breaches (فری لانسنگ معاوضہ)**
   * Client taking software/design delivery and refusing payment or ghosting on WhatsApp.
   * Enforcing digital agreements and WhatsApp chat contracts under Contract Act 1872.
   * *Forum:* Small Claims & Minor Offences Court.

8. **💳 Bank & Digital Wallet Fraud (بینک اور ایزی پیسہ / جاز کیش فراڈ)**
   * Unauthorized Easypaisa/JazzCash debits or ATM cash dispensing failure.
   * Bank failing to resolve chargeback complaints within 45 days.
   * *Forum:* Banking Mohtasib Pakistan (Banking Ombudsman).

---

💡 **How to begin:**
Simply describe your situation in Roman Urdu or English below (e.g., *"Makaan malik deposit wapis nahi de raha"* or *"Company hasn't paid my 2 months salary"*), or click any suggestion chip below to get an instant legal verdict and formal legal notice!`;
}

export function classifyQuery(query: string): QueryIntentResult {
  const q = query.toLowerCase().trim();

  // 1. Explicit off-topic check
  if (isExplicitlyOffTopic(q)) {
    return {
      isOffTopic: true,
      matchedCategory: undefined,
      isGeneralLegal: false,
      isScopeQuery: false,
    };
  }

  // 2. Check if the user is asking about capabilities/scope of the app
  if (isScopeOrCapabilitiesQuery(q)) {
    return {
      isOffTopic: false,
      matchedCategory: undefined,
      isGeneralLegal: true,
      isScopeQuery: true,
    };
  }

  // 3. Specific law category match
  const matched = findCategoryByQuery(q);
  if (matched) {
    return {
      isOffTopic: false,
      matchedCategory: matched,
      isGeneralLegal: false,
      isScopeQuery: false,
    };
  }

  // 4. Has general legal context
  if (hasPakistaniLegalContext(q)) {
    return {
      isOffTopic: false,
      matchedCategory: undefined,
      isGeneralLegal: true,
      isScopeQuery: false,
    };
  }

  // 5. If query doesn't match legal keywords and has 0 category match:
  return {
    isOffTopic: true,
    matchedCategory: undefined,
    isGeneralLegal: false,
    isScopeQuery: false,
  };
}

export function getOffTopicRefusalMessage(query: string): string {
  return `**Yeh sawal Pakistani qanooni haqooq ke daire se bahir hai (Out of Scope Query):**

Aap ka sawal *"“${query.length > 50 ? query.substring(0, 50) + "..." : query}”"* Pakistani qanoon ya shehri haqooq se mutaliq nahi hai. 

**"Mera Haq" (میرا حق)** sirf aur sirf Pakistani shehriyon ko un ke **qanooni haqooq (Legal Rights)**, civil & criminal masail, aur official statutory legal notices tayyar karne ke liye banaya gaya hai. Hum mausam (weather), general chit-chat, sports ya non-legal sawalat ke jawabat nahi de sakte.

---

### 🛡️ Aap kin masail par Mera Haq se madad le sakte hain?
* **🏠 Makaan Malik aur Kiraya Disputes:** Security deposit wapis na milna, bila-waja ghar khali karne ka kehna, bijli/gas katna (Punjab Rented Premises Act 2009).
* **💼 Tankhwah aur Mulazmat:** 2-3 mah se salary na milna, bila notice job se terminate karna (Payment of Wages Act 1936).
* **🛡️ Cybercrime aur Online Harassment:** WhatsApp par blackmailing, zaati tasaveer leak karne ki dhamki (PECA 2016 - FIA Cybercrime).
* **🛍️ Consumer Rights & Online Fraud:** Daraz/Instagram se kharab ya nakli saman milna, refund se inkaar (Consumer Protection Act).
* **🚦 Ghalat Traffic Challan:** Safe City e-challan ya warden ke ghalat jurmanay ko challenge karna.
* **💻 Freelance Contract Breaches:** Client ka project lene ke baad payment rok lena (Contract Act 1872).
* **💳 Bank aur Digital Wallets:** Easypaisa, JazzCash ya ATM se unauthorized paise katna (Banking Mohtasib).

💡 *Neeche diye gaye kisi bhi scenario par click karein ya apna qanooni masla Roman Urdu ya English me likhein.*`;
}

export function findCategoryByQuery(query: string): LawCategory | undefined {
  const q = query.toLowerCase();
  if (q.includes("deposit") || q.includes("landlord") || q.includes("rent") || q.includes("kiraya") || q.includes("makaan") || q.includes("makan") || q.includes("tenant") || q.includes("evict") || q.includes("bijli") || q.includes("gas") || q.includes("owner")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "tenant-deposit");
  }
  if (q.includes("salary") || q.includes("wage") || q.includes("tankhwah") || q.includes("tankha") || q.includes("settlement") || q.includes("gratuity") || q.includes("boss") || q.includes("pay") || q.includes("deduct") || q.includes("unpaid")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "unpaid-salary");
  }
  if (q.includes("blackmail") || q.includes("cyber") || q.includes("photo") || q.includes("video") || q.includes("harass") || q.includes("threat") || q.includes("whatsapp") || q.includes("fake") || q.includes("leak") || q.includes("dhamki") || q.includes("peca") || q.includes("fia")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "cybercrime-harassment");
  }
  if (q.includes("daraz") || q.includes("defect") || q.includes("refund") || q.includes("product") || q.includes("seller") || q.includes("warranty") || q.includes("consumer") || q.includes("shopping") || q.includes("kharab") || q.includes("fraud product")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "consumer-fraud");
  }
  if (q.includes("fire") || q.includes("fired") || q.includes("terminate") || q.includes("job") || q.includes("dismiss") || q.includes("notice period") || q.includes("nikal") || q.includes("resign")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "wrongful-termination");
  }
  if (q.includes("challan") || q.includes("traffic") || q.includes("warden") || q.includes("license") || q.includes("signal") || q.includes("fine") || q.includes("police") || q.includes("safe city")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "traffic-challan");
  }
  if (q.includes("freelance") || q.includes("client") || q.includes("invoice") || q.includes("project") || q.includes("developer") || q.includes("contract") || q.includes("ghost") || q.includes("milestone")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "freelance-contract");
  }
  if (q.includes("easypaisa") || q.includes("jazzcash") || q.includes("atm") || q.includes("bank") || q.includes("fraud") || q.includes("otp") || q.includes("transfer") || q.includes("mohtasib")) {
    return PAKISTANI_LAW_CATEGORIES.find((c) => c.id === "bank-wallet-fraud");
  }
  return undefined;
}
