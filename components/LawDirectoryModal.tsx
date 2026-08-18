"use client";

import React, { useState } from "react";
import { X, BookOpen, ChevronRight, Scale, Shield, Clock, ExternalLink } from "lucide-react";
import { PAKISTANI_LAW_CATEGORIES } from "@/lib/laws-db";
import type { LawCategory } from "@/lib/laws-db";

interface LawDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategoryForChat: (cat: LawCategory) => void;
  onSelectCategoryForNotice: (cat: LawCategory) => void;
}

export const LawDirectoryModal: React.FC<LawDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectCategoryForChat,
  onSelectCategoryForNotice,
}) => {
  const [selectedCat, setSelectedCat] = useState<LawCategory>(PAKISTANI_LAW_CATEGORIES[0]);
  const [searchFilter, setSearchFilter] = useState("");

  if (!isOpen) return null;

  const filteredCategories = PAKISTANI_LAW_CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.laws.some((l) => l.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl bg-[#fdfdfb] shadow-2xl ring-1 ring-slate-200 overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/90 bg-[#fcfcf9] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-950 text-teal-300 shadow-sm">
              <Scale className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-teal-950">
                Pakistani Legal Rights &amp; Statutory Directory
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Core statutes, forum jurisdictions, notice periods &amp; procedures
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left list of categories */}
          <div className="md:col-span-4 border-r border-slate-200 bg-[#fcfcf9]/70 p-3 overflow-y-auto max-h-[30vh] md:max-h-[75vh]">
            <input
              type="text"
              placeholder="Search laws & disputes..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="mb-2 w-full rounded-xl border border-slate-300/90 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
            <div className="space-y-1">
              {filteredCategories.map((cat) => {
                const isActive = selectedCat.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    className={`w-full text-left rounded-xl p-2.5 transition flex items-center justify-between ${
                      isActive
                        ? "bg-teal-950 text-white shadow-xs"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm">{cat.title}</div>
                      <div
                        className={`text-[11px] font-medium ${
                          isActive ? "text-teal-300" : "text-slate-500"
                        }`}
                      >
                        {cat.urduTitle}
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-teal-300" : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right detail view */}
          <div className="md:col-span-8 p-5 overflow-y-auto max-h-[50vh] md:max-h-[75vh] space-y-4 bg-white">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  {selectedCat.title}
                </h4>
                <span className="rounded-full bg-teal-50 px-3 py-0.5 text-xs font-bold text-teal-900 border border-teal-200">
                  Notice: {selectedCat.standardNoticeDays} Days
                </span>
              </div>
              <p className="text-xs font-serif italic text-teal-800 mt-0.5">
                {selectedCat.urduTitle}
              </p>
              <p className="text-xs text-slate-600 mt-1.5">{selectedCat.tagline}</p>
            </div>

            {/* Applicable Law Box */}
            <div className="rounded-xl border border-slate-200 bg-[#fcfcf9] p-3.5 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-teal-700" />
                Applicable Pakistani Acts &amp; Statutes:
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                {selectedCat.laws.map((law, idx) => (
                  <li key={idx} className="font-medium">
                    {law}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900">Competent Authority: </span>
                {selectedCat.authority} ({selectedCat.authorityUrdu})
              </div>
            </div>

            {/* Plain Roman Urdu Overview */}
            <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-3.5 space-y-1.5">
              <div className="text-xs font-bold text-teal-950">
                🇵🇰 Roman Urdu Me Khulasa (Plain Explanation):
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedCat.summaryRomanUrdu}
              </p>
            </div>

            {/* Protected Rights */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-teal-700" />
                Guaranteed Citizen Rights:
              </div>
              <div className="space-y-1.5">
                {selectedCat.keyRights.map((r, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 bg-white border border-slate-200/90 rounded-lg p-2 shadow-2xs"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-900">
                      ✓
                    </span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  onSelectCategoryForChat(selectedCat);
                  onClose();
                }}
                className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition text-center"
              >
                💬 Ask Question in Chat
              </button>
              <button
                onClick={() => {
                  onSelectCategoryForNotice(selectedCat);
                  onClose();
                }}
                className="flex-1 rounded-full bg-teal-950 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-black transition text-center flex items-center justify-center gap-1.5"
              >
                <span>Draft Legal Notice</span>
                <span className="text-teal-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

