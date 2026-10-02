"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { HelplinesModal } from "@/components/HelplinesModal";
import { LawDirectoryModal } from "@/components/LawDirectoryModal";
import { ComplaintLetterModal } from "@/components/ComplaintLetterModal";
import type { NoticeInitialData } from "@/components/ComplaintLetterModal";
import { LawCategory } from "@/lib/laws-db";
import {
  BookOpen,
  PhoneCall,
  FileText,
  ArrowUpRight,
  PanelLeftClose,
} from "lucide-react";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    <div className="flex h-screen max-h-screen w-full overflow-hidden bg-[#fdfdfb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-teal-100 dark:selection:bg-teal-900 selection:text-teal-950 dark:selection:text-teal-100">
      {/* Mobile Backdrop when Sidebar is Open on small screens */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Editorial Aside Sidebar (Collapsible on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-full bg-[#fcfcf9] dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
          isSidebarOpen
            ? "w-[320px] sm:w-[350px] xl:w-[380px] p-6 xl:p-8 opacity-100 translate-x-0"
            : "w-0 p-0 border-r-0 opacity-0 pointer-events-none -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full justify-between min-w-[280px]">
          {/* Top content (Scrollable if viewport is small) */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-1">
            {/* Masthead Header with Close Button */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl xl:text-4xl font-serif font-black tracking-tighter text-teal-950 dark:text-teal-100 leading-none">
                  Mera Haq
                </h1>
                <p className="text-xl xl:text-2xl font-serif italic text-teal-700 dark:text-teal-400 mt-1 leading-none">
                  میرا حق
                </p>
              </div>

              {/* Close Sidebar Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
                className="rounded-xl p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Collapse sidebar (چھپائیں)"
              >
                <PanelLeftClose className="h-5 w-5" />
              </button>
            </div>

            {/* Section Introduction */}
            <div className="space-y-4">
              <h2 className="text-xl xl:text-2xl font-serif font-bold leading-tight text-slate-900 dark:text-white">
                Apna Haq Jaanein.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-sm">
                A free AI assistant explaining Pakistani legal rights in simple Roman Urdu and English. Get citations and formal complaint letters in seconds.
              </p>

              {/* Quick Action Navigation in Editorial Sidebar */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => handleOpenDraftNotice()}
                  className="w-full flex items-center justify-between rounded-xl bg-teal-950 dark:bg-teal-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-black hover:dark:bg-teal-600 transition text-left"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-300" />
                    <span>Draft Complaint Notice</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-teal-300" />
                </button>

                <button
                  onClick={() => setIsLawLibraryOpen(true)}
                  className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-400 hover:bg-teal-50/60 hover:dark:bg-slate-700 hover:text-teal-950 hover:dark:text-teal-300 transition text-left shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                    <span>Browse Statutory Directory</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setIsHelplinesOpen(true)}
                  className="w-full flex items-center justify-between rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/40 px-4 py-2.5 text-xs font-semibold text-amber-950 dark:text-amber-300 hover:bg-amber-100 hover:dark:bg-amber-900/60 transition text-left shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    <span>Emergency Helplines (1991)</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                </button>
              </div>

              {/* Trusted Sources */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500 block mb-3">
                  Trusted Statutory Sources
                </span>
                <ul className="text-xs space-y-2.5 font-medium text-slate-600 dark:text-slate-400">
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

          {/* Bottom Legal Disclaimer Card (Always pinned cleanly at bottom, never stretches) */}
          <div className="shrink-0 pt-4">
            <div className="bg-teal-50/90 dark:bg-slate-800/80 p-4 rounded-2xl border border-teal-100/90 dark:border-slate-700">
              <p className="text-[11px] leading-relaxed text-teal-950 dark:text-teal-200">
                <strong>Legal Disclaimer:</strong> This tool provides statutory legal literacy, not individual courtroom counsel. For contentious court matters, consult a licensed advocate of the High Court.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace (Top Navbar + Interactive Chat) */}
      <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden bg-[#fdfdfb] dark:bg-slate-950">
        {/* Navigation Header */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenHelplines={() => setIsHelplinesOpen(true)}
          onOpenLawLibrary={() => setIsLawLibraryOpen(true)}
          onOpenDraftNotice={() => handleOpenDraftNotice()}
        />

        {/* Main Chat Canvas with Radial Dot-Grid Texture */}
        <main className="flex flex-1 flex-col h-full min-h-0 overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
          <ChatInterface
            onOpenDraftNotice={handleOpenDraftNotice}
            onOpenHelplines={() => setIsHelplinesOpen(true)}
          />
        </main>
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
