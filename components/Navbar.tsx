"use client";

import React from "react";
import {
  PhoneCall,
  BookOpen,
  FileText,
  Scale,
  Sun,
  Moon,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenHelplines: () => void;
  onOpenLawLibrary: () => void;
  onOpenDraftNotice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onOpenHelplines,
  onOpenLawLibrary,
  onOpenDraftNotice,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/90 dark:border-slate-800 bg-[#fcfcf9]/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200 shrink-0">
      <div className="flex h-14 items-center justify-between px-3 sm:px-5">
        {/* Left side: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sidebar Toggle Button */}
          <button
            id="sidebar-toggle-btn"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-100 hover:dark:bg-slate-700 hover:text-teal-900 hover:dark:text-teal-400 transition"
            title={isSidebarOpen ? "Collapse sidebar (چھپائیں)" : "Expand sidebar (کھولیں)"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </button>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-950 dark:bg-teal-700 text-teal-300 dark:text-teal-100 shadow-sm shrink-0">
              <Scale className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-base sm:text-lg font-black tracking-tight text-teal-950 dark:text-teal-100">
                  Mera Haq
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-teal-700 dark:text-teal-400">
                  میرا حق
                </span>
                <span className="hidden md:inline-block rounded-full bg-teal-50 dark:bg-teal-950/80 px-2 py-0.2 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Quick Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Law Directory button */}
          <button
            id="nav-law-library-btn"
            onClick={onOpenLawLibrary}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition hover:border-teal-400 hover:bg-teal-50/50 hover:dark:bg-slate-700 hover:text-teal-950 hover:dark:text-teal-300 shadow-2xs"
            title="Browse Pakistani Laws & Rights"
          >
            <BookOpen className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
            <span className="hidden md:inline">Law Directory</span>
            <span className="md:hidden hidden sm:inline">Laws</span>
          </button>

          {/* Emergency Helpline button */}
          <button
            id="nav-helplines-btn"
            onClick={onOpenHelplines}
            className="flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-800/80 bg-amber-50/90 dark:bg-amber-950/40 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-300 transition hover:bg-amber-100 hover:dark:bg-amber-900/60 shadow-2xs"
            title="Emergency Helplines (FIA 1991, Consumer 1334, Police 15)"
          >
            <PhoneCall className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
            <span className="hidden md:inline">Helplines</span>
            <span className="md:hidden">1991</span>
          </button>

          {/* Draft Notice button */}
          <button
            id="nav-draft-notice-btn"
            onClick={onOpenDraftNotice}
            className="flex items-center gap-1.5 rounded-full bg-teal-950 dark:bg-teal-700 px-3 sm:px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-black hover:dark:bg-teal-600"
          >
            <FileText className="h-3.5 w-3.5 text-teal-300 dark:text-teal-200" />
            <span className="hidden sm:inline">Draft Notice</span>
            <span className="sm:hidden">Notice</span>
          </button>

          {/* Light / Dark Mode Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-100 hover:dark:bg-slate-700 hover:text-amber-600 hover:dark:text-amber-400 transition"
            title={theme === "dark" ? "Switch to Light mode (لائٹ موڈ)" : "Switch to Dark mode (ڈارک موڈ)"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400 animate-spin-once" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};


