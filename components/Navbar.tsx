"use client";

import React from "react";
import { PhoneCall, BookOpen, FileText, Scale, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenHelplines: () => void;
  onOpenLawLibrary: () => void;
  onOpenDraftNotice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHelplines,
  onOpenLawLibrary,
  onOpenDraftNotice,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/90 bg-[#fcfcf9]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity (Visible on small screens, condensed on desktop where sidebar is present) */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-950 text-teal-300 shadow-sm">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-black tracking-tight text-teal-950 sm:text-xl">
                Mera Haq
              </span>
              <span className="font-serif italic text-sm text-teal-700">
                میرا حق
              </span>
              <span className="hidden sm:inline-block rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 border border-teal-200">
                Pakistan
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              AI Legal Rights &amp; Notice Generator
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            id="nav-law-library-btn"
            onClick={onOpenLawLibrary}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-950 shadow-2xs"
            title="Browse Pakistani Laws & Rights"
          >
            <BookOpen className="h-3.5 w-3.5 text-teal-700" />
            <span className="hidden sm:inline">Law Directory</span>
            <span className="sm:hidden">Laws</span>
          </button>

          <button
            id="nav-helplines-btn"
            onClick={onOpenHelplines}
            className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/90 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 shadow-2xs"
            title="Emergency Helplines (FIA 1991, Consumer 1334, Police 15)"
          >
            <PhoneCall className="h-3.5 w-3.5 text-amber-700" />
            <span className="hidden sm:inline">Helplines</span>
            <span className="sm:hidden">1991</span>
          </button>

          <button
            id="nav-draft-notice-btn"
            onClick={onOpenDraftNotice}
            className="flex items-center gap-1.5 rounded-full bg-teal-950 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-black"
          >
            <FileText className="h-3.5 w-3.5 text-teal-300" />
            <span>Draft Notice</span>
          </button>
        </div>
      </div>
    </header>
  );
};

