"use client";

import React from "react";
import { Scale } from "lucide-react";

interface FooterProps {
  onOpenHelplines: () => void;
  onOpenLawLibrary: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHelplines,
  onOpenLawLibrary,
}) => {
  return (
    <footer className="w-full border-t border-slate-200/90 bg-[#fcfcf9] py-3.5 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Scale className="h-4 w-4 text-teal-800 shrink-0" />
          <p>
            <strong>Mera Haq (میرا حق)</strong> provides general statutory information for educational &amp; legal literacy purposes. For complex litigation, consult a licensed advocate.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-semibold text-slate-600">
          <button
            onClick={onOpenHelplines}
            className="hover:text-teal-900 transition hover:underline"
          >
            Helplines (1991 / 1334)
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={onOpenLawLibrary}
            className="hover:text-teal-900 transition hover:underline"
          >
            Statute Directory
          </button>
        </div>
      </div>
    </footer>
  );
};

