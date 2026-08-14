"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { HelplinesModal } from "@/components/HelplinesModal";
import { LawDirectoryModal } from "@/components/LawDirectoryModal";
import {
  ComplaintLetterModal,
  NoticeInitialData,
} from "@/components/ComplaintLetterModal";
import { Footer } from "@/components/Footer";
import { LawCategory } from "@/lib/laws-db";
import { BookOpen, PhoneCall, FileText, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const [isHelplinesOpen, setIsHelplinesOpen] = useState(false);
  const [isLawLibraryOpen, setIsLawLibraryOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeInitialData, setNoticeInitialData] = useState<
    NoticeInitialData | undefined
  >(undefined);

  const handleOpenDraftNotice = (data?: NoticeInitialData) => {
    setNoticeInitialData(data);
    setIsNoticeModalOpen(true);
  };

  const handleSelectCategoryForChat = (cat: LawCategory) => {
    setIsLawLibraryOpen(false);
  };

  const handleSelectCategoryForNotice = (cat: LawCategory) => {
    setIsLawLibraryOpen(false);
    setNoticeInitialData({
      category: cat.id,
      demandType: cat.sampleNoticeTitle,
      facts: `Dispute under ${cat.title} (${cat.laws[0]}).`,
    });
    setIsNoticeModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fdfdfb] text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-950">
      {/* Editorial Aside Sidebar (Visible on Desktop) */}
      <aside className="hidden lg:flex lg:w-[360px] xl:w-[380px] shrink-0 border-r border-slate-200/90 bg-[#fcfcf9] p-8 xl:p-10 flex-col justify-between overflow-y-auto">
        <div className="space-y-8">
          {/* Masthead */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-serif font-black tracking-tighter text-teal-950 leading-none">
              Mera Haq
            </h1>
            <p className="text-xl xl:text-2xl font-serif italic text-teal-700 mt-2 leading-none">
              میرا حق
            </p>
          </div>

          {/* Section Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl xl:text-3xl font-serif font-bold leading-tight text-slate-900">
              Apna Haq Jaanein.
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              A free AI assistant explaining Pakistani legal rights in simple Roman Urdu and English. Get citations and formal complaint letters in seconds.
            </p>

            {/* Quick Action Navigation in Editorial Sidebar */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsNoticeModalOpen(true)}
                className="w-full flex items-center justify-between rounded-xl bg-teal-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-black transition text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-teal-300" />
                  <span>Draft Complaint Notice</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-teal-300" />
              </button>

              <button
                onClick={() => setIsLawLibraryOpen(true)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-teal-400 hover:bg-teal-50/60 hover:text-teal-950 transition text-left shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-teal-700" />
                  <span>Browse Statutory Directory</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>

              <button
                onClick={() => setIsHelplinesOpen(true)}
                className="w-full flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2.5 text-xs font-semibold text-amber-950 hover:bg-amber-100 transition text-left shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-amber-700" />
                  <span>Emergency Helplines (1991)</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-amber-700" />
              </button>
            </div>

            {/* Trusted Sources */}
            <div className="pt-4 border-t border-slate-200/80">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 block mb-3">
                Trusted Statutory Sources
              </span>
              <ul className="text-xs space-y-2.5 font-medium text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0" />
                  <span>Payment of Wages Act 1936</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0" />
                  <span>PECA Cybercrime Laws 2016</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0" />
                  <span>Consumer Protection Acts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0" />
                  <span>Punjab / Sindh Rented Premises Acts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0" />
                  <span>Banking Companies Ordinance &amp; Ombudsman</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Disclaimer Card */}
        <div className="bg-teal-50/90 p-5 rounded-2xl border border-teal-100/90 mt-8">
          <p className="text-[11px] leading-relaxed text-teal-950">
            <strong>Legal Disclaimer:</strong> This tool provides statutory legal literacy, not individual courtroom counsel. For contentious court matters, consult a licensed advocate of the High Court.
          </p>
        </div>
      </aside>

      {/* Main Workspace (Top Navbar + Interactive Chat + Footer) */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen bg-[#fdfdfb]">
        {/* Navigation Header */}
        <Navbar
          onOpenHelplines={() => setIsHelplinesOpen(true)}
          onOpenLawLibrary={() => setIsLawLibraryOpen(true)}
          onOpenDraftNotice={() => handleOpenDraftNotice()}
        />

        {/* Main Chat Canvas with Radial Dot-Grid Texture */}
        <main className="flex flex-1 flex-col bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
          <ChatInterface
            onOpenDraftNotice={handleOpenDraftNotice}
            onOpenHelplines={() => setIsHelplinesOpen(true)}
          />
        </main>

        {/* Persistent Legal Disclaimer Footer */}
        <Footer
          onOpenHelplines={() => setIsHelplinesOpen(true)}
          onOpenLawLibrary={() => setIsLawLibraryOpen(true)}
        />
      </div>

      {/* Modals & Drawers */}
      <HelplinesModal
        isOpen={isHelplinesOpen}
        onClose={() => setIsHelplinesOpen(false)}
      />

      <LawDirectoryModal
        isOpen={isLawLibraryOpen}
        onClose={() => setIsLawLibraryOpen(false)}
        onSelectCategoryForChat={handleSelectCategoryForChat}
        onSelectCategoryForNotice={handleSelectCategoryForNotice}
      />

      <ComplaintLetterModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        initialData={noticeInitialData}
      />
    </div>
  );
}

