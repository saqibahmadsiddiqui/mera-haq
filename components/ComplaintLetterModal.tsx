"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  Edit3,
  RefreshCw,
} from "lucide-react";
import { PAKISTANI_LAW_CATEGORIES } from "@/lib/laws-db";
import { generateLegalNoticePDF } from "@/lib/pdf-generator";

export interface NoticeInitialData {
  category?: string;
  facts?: string;
  respondentName?: string;
  disputedAmount?: string;
  demandType?: string;
}

interface ComplaintLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: NoticeInitialData;
}

interface ModalContentProps {
  onClose: () => void;
  initialData?: NoticeInitialData;
}

const ComplaintLetterModalContent: React.FC<ModalContentProps> = ({
  onClose,
  initialData,
}) => {
  const defaultCategory = initialData?.category || "tenant-deposit";
  const defaultCatObj =
    PAKISTANI_LAW_CATEGORIES.find((c) => c.id === defaultCategory) ||
    PAKISTANI_LAW_CATEGORIES[0];

  const [selectedCatId, setSelectedCatId] = useState<string>(defaultCategory);
  const [complainantName, setComplainantName] = useState<string>("Ahmed Khan");
  const [complainantCnic, setComplainantCnic] = useState<string>("35202-XXXXXXX-X");
  const [complainantPhone, setComplainantPhone] = useState<string>("0300-1234567");
  const [complainantCity, setComplainantCity] = useState<string>("Lahore, Punjab");
  const [complainantAddress, setComplainantAddress] = useState<string>(
    "House 12, Street 4, Gulberg III, Lahore"
  );

  const [respondentName, setRespondentName] = useState<string>(
    initialData?.respondentName || "Muhammad Tariq (Landlord)"
  );
  const [respondentAddress, setRespondentAddress] = useState<string>(
    "Property No. 54-B, Main Boulevard, Lahore"
  );
  const [incidentDate, setIncidentDate] = useState<string>(
    new Date().toLocaleDateString("en-GB")
  );
  const [disputedAmount, setDisputedAmount] = useState<string>(
    initialData?.disputedAmount || "PKR 65,000"
  );
  const [facts, setFacts] = useState<string>(
    initialData?.facts ||
      "The landlord has wrongfully withheld the security deposit of PKR 65,000 after the tenant vacated the premises on agreed date with all utility bills cleared."
  );
  const [demandType, setDemandType] = useState<string>(
    initialData?.demandType || defaultCatObj.sampleNoticeTitle
  );
  const [noticeDays, setNoticeDays] = useState<number>(
    defaultCatObj.standardNoticeDays
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");

  const currentCategory =
    PAKISTANI_LAW_CATEGORIES.find((c) => c.id === selectedCatId) ||
    PAKISTANI_LAW_CATEGORIES[0];

  const handleGenerateNotice = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: selectedCatId,
          complainantName,
          complainantCnic,
          complainantPhone,
          complainantCity,
          complainantAddress,
          respondentName,
          respondentAddress,
          incidentDate,
          disputedAmount,
          facts,
          demandType,
          noticeDays,
        }),
      });

      const data = await response.json();
      if (data.letterText) {
        setGeneratedLetter(data.letterText);
        setActiveTab("preview");
      }
    } catch (err) {
      console.error("Failed to generate letter:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!generatedLetter) return;
    generateLegalNoticePDF(generatedLetter, {
      title: "Statutory Legal Notice",
      categoryTitle: currentCategory.title,
      complainantName,
      respondentName,
      date: incidentDate,
    });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Legal Notice - ${complainantName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; font-size: 14px; color: #000; }
            pre { white-space: pre-wrap; font-family: inherit; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <pre>${generatedLetter}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-2xl bg-[#fdfdfb] shadow-2xl ring-1 ring-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/90 bg-[#fcfcf9] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-950 text-teal-300 shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-teal-950">
              Pakistani Legal Notice &amp; Complaint Drafter
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Statutory compliant draft formatted for Pakistan courts &amp; tribunals
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Modal Body: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
        {/* Left Column: Case Facts & Party Inputs */}
        <div className="lg:col-span-5 border-r border-slate-200 p-4 sm:p-5 overflow-y-auto max-h-[45vh] lg:max-h-[75vh] space-y-4 bg-[#fcfcf9]/70">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Dispute Category
            </label>
            <select
              value={selectedCatId}
              onChange={(e) => {
                const newCatId = e.target.value;
                setSelectedCatId(newCatId);
                const cat = PAKISTANI_LAW_CATEGORIES.find((c) => c.id === newCatId);
                if (cat) {
                  setNoticeDays(cat.standardNoticeDays);
                  setDemandType(cat.sampleNoticeTitle);
                }
              }}
              className="w-full rounded-xl border border-slate-300/90 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            >
              {PAKISTANI_LAW_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title} ({cat.urduTitle})
                </option>
              ))}
            </select>
          </div>

          {/* Applicable Forum Info Card */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-3 text-xs text-teal-950">
            <span className="font-bold">Target Forum: </span>
            {currentCategory.authority}
            <div className="text-[11px] text-teal-800 font-medium mt-0.5">
              Applicable: {currentCategory.laws[0]}
            </div>
          </div>

          {/* Complainant (Sender) Section */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              1. Your Details (Complainant / Sender)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                  placeholder="e.g. Ahmed Khan"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  CNIC (Optional)
                </label>
                <input
                  type="text"
                  value={complainantCnic}
                  onChange={(e) => setComplainantCnic(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                  placeholder="35202-XXXXXXX-X"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={complainantPhone}
                  onChange={(e) => setComplainantPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                  placeholder="0300-1234567"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  City &amp; Province
                </label>
                <input
                  type="text"
                  value={complainantCity}
                  onChange={(e) => setComplainantCity(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                  placeholder="Lahore, Punjab"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-slate-600 font-medium">
                Your Address
              </label>
              <input
                type="text"
                value={complainantAddress}
                onChange={(e) => setComplainantAddress(e.target.value)}
                className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                placeholder="Street/Area address"
              />
            </div>
          </div>

          {/* Respondent Section */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              2. Opposing Party (Respondent / Recipient)
            </span>
            <div>
              <label className="text-[11px] text-slate-600 font-medium">
                Name / Company / Landlord
              </label>
              <input
                type="text"
                value={respondentName}
                onChange={(e) => setRespondentName(e.target.value)}
                className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                placeholder="e.g. Tariq Mehmood (Landlord) / ABC Co."
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 font-medium">
                Recipient Address / Location
              </label>
              <input
                type="text"
                value={respondentAddress}
                onChange={(e) => setRespondentAddress(e.target.value)}
                className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                placeholder="Address of property or office"
              />
            </div>
          </div>

          {/* Facts & Claim Section */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              3. Dispute Facts &amp; Demands
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  Incident Date
                </label>
                <input
                  type="text"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  Disputed Amount (PKR)
                </label>
                <input
                  type="text"
                  value={disputedAmount}
                  onChange={(e) => setDisputedAmount(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                  placeholder="e.g. PKR 75,000"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-600 font-medium">
                Summary of Facts (What happened?)
              </label>
              <textarea
                rows={3}
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none font-sans"
                placeholder="State the agreement date, what was promised, what failed, and any dates..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  Specific Legal Demand
                </label>
                <input
                  type="text"
                  value={demandType}
                  onChange={(e) => setDemandType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                  placeholder="e.g. Immediate release of security deposit"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 font-medium">
                  Notice Period
                </label>
                <select
                  value={noticeDays}
                  onChange={(e) => setNoticeDays(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300/90 bg-white px-2.5 py-1.5 text-xs focus:border-teal-700 focus:outline-none"
                >
                  <option value={7}>7 Calendar Days (Urgent)</option>
                  <option value={14}>14 Calendar Days (Standard)</option>
                  <option value={15}>15 Calendar Days (Consumer Law)</option>
                  <option value={30}>30 Calendar Days (Lease Termination)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Trigger Button */}
          <button
            onClick={handleGenerateNotice}
            disabled={isGenerating}
            className="w-full rounded-full bg-teal-950 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-teal-300" />
                <span>Drafting Legal Notice with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-teal-300" />
                <span>
                  {generatedLetter
                    ? "Re-Generate Legal Notice"
                    : "Generate Official Legal Notice"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Notice Document Preview / Editor */}
        <div className="lg:col-span-7 flex flex-col bg-white p-4 sm:p-5 overflow-hidden">
          {/* Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition ${
                  activeTab === "preview"
                    ? "bg-white text-teal-950 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Document View
              </button>
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition ${
                  activeTab === "edit"
                    ? "bg-white text-teal-950 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-1">
                  <Edit3 className="h-3 w-3" />
                  Edit Text
                </span>
              </button>
            </div>

            {generatedLetter && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
                  title="Copy Notice Text"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
                  title="Print Notice"
                >
                  <Printer className="h-3.5 w-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1.5 rounded-full bg-teal-950 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-black transition"
                >
                  <Download className="h-3.5 w-3.5 text-teal-300" />
                  <span>Download PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Document Body Area */}
          <div className="flex-1 overflow-y-auto mt-3 p-3 sm:p-4 rounded-xl border border-slate-200/90 bg-[#fcfcf9]">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center space-y-3">
                <RefreshCw className="h-8 w-8 text-teal-700 animate-spin" />
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    Structuring Legal Notice &amp; Statutory Grounds...
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    Applying Pakistani statutes, section citations, standard formal notice terminology, and statutory remedy clauses.
                  </p>
                </div>
              </div>
            ) : generatedLetter ? (
              activeTab === "preview" ? (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200/80 font-serif text-xs sm:text-sm text-slate-900 whitespace-pre-wrap leading-relaxed">
                  {generatedLetter}
                </div>
              ) : (
                <textarea
                  rows={18}
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  className="w-full h-full font-mono text-xs p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-800 border border-teal-100">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">
                    No Notice Generated Yet
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    Fill in the dispute facts on the left and click <strong>&quot;Generate Official Legal Notice&quot;</strong> to create a ready-to-dispatch Pakistani legal complaint in seconds.
                  </p>
                </div>
                <button
                  onClick={handleGenerateNotice}
                  className="mt-2 rounded-full bg-teal-950 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-black transition"
                >
                  Draft Now
                </button>
              </div>
            )}
          </div>

          {/* Practical Dispatch Instructions */}
          {generatedLetter && (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-[11px] text-amber-950">
              <span className="font-bold">📮 How to Serve This Notice in Pakistan: </span>
              Print 2 copies. Send one via <strong>Pakistan Post Registered A.D. / TCS / UMS</strong> to the opposing party&apos;s address. Keep the courier receipt and the second copy safely as court-admissible evidence.
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export const ComplaintLetterModal: React.FC<ComplaintLetterModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm">
      <ComplaintLetterModalContent
        key={`${initialData?.category || "def"}-${initialData?.facts || ""}`}
        onClose={onClose}
        initialData={initialData}
      />
    </div>
  );
};
