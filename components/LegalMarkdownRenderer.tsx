"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Scale, Shield, AlertTriangle, Lightbulb, ExternalLink } from "lucide-react";

interface LegalMarkdownRendererProps {
  content: string;
}

export const LegalMarkdownRenderer: React.FC<LegalMarkdownRendererProps> = ({
  content,
}) => {
  return (
    <div className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 selection:bg-teal-500 selection:text-white space-y-1">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl font-serif font-bold text-slate-950 dark:text-white mt-4 mb-2 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2.5 pl-3 border-l-4 border-teal-600 dark:border-teal-400 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => {
            const rawText = String(children);
            const isLawSection = rawText.includes("Qanoon") || rawText.includes("Law") || rawText.includes("📜");
            const isRightsSection = rawText.includes("Haqooq") || rawText.includes("Rights") || rawText.includes("🛡️");
            const isStepsSection = rawText.includes("Iqdamat") || rawText.includes("Steps") || rawText.includes("⚡");

            return (
              <div className="pt-3 pb-1 first:pt-0">
                <h3
                  className={`text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 px-2.5 py-1 rounded-lg ${
                    isLawSection
                      ? "bg-teal-50 dark:bg-teal-950/70 text-teal-950 dark:text-teal-200 border border-teal-200 dark:border-teal-800/80"
                      : isRightsSection
                      ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800/80"
                      : isStepsSection
                      ? "bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {isLawSection && <Scale className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />}
                  {isRightsSection && <Shield className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />}
                  {isStepsSection && <AlertTriangle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />}
                  <span>{children}</span>
                </h3>
              </div>
            );
          },
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2.5 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => {
            const rawText = String(children);
            const isDisclaimer = rawText.includes("Disclaimer") || rawText.includes("wakeel ki raye");
            const isTip = rawText.includes("💡") || rawText.includes("Tip:");

            if (isDisclaimer) {
              return (
                <div className="mt-3 rounded-xl border border-amber-200/90 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 p-2.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{children}</div>
                </div>
              );
            }

            if (isTip) {
              return (
                <div className="my-2.5 rounded-xl border border-teal-200 dark:border-teal-800/70 bg-teal-50/60 dark:bg-teal-950/30 p-2.5 text-xs text-teal-950 dark:text-teal-200 flex items-start gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div className="flex-1">{children}</div>
                </div>
              );
            }

            return (
              <p className="mb-2 last:mb-0 leading-relaxed font-sans text-slate-800 dark:text-slate-200">
                {children}
              </p>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-950 dark:text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-700 dark:text-slate-300">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="my-2 space-y-1.5 pl-0 list-none">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2.5 space-y-2 pl-0 list-none">
              {children}
            </ol>
          ),
          li: ({ children, ...props }: any) => {
            const isOrdered = props.ordered;
            const index = props.index;

            return (
              <li className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 leading-relaxed text-xs sm:text-sm">
                {isOrdered ? (
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/80 text-teal-900 dark:text-teal-200 text-[11px] font-bold mt-0.5 border border-teal-200 dark:border-teal-800/80 shadow-2xs">
                    {(typeof index === "number" ? index + 1 : 1)}
                  </span>
                ) : (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400 mt-2 shrink-0" />
                )}
                <div className="flex-1 space-y-1">{children}</div>
              </li>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-3 rounded-xl border-l-4 border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/40 px-4 py-2.5 text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 shadow-2xs">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-3 border-t border-slate-200/90 dark:border-slate-800" />
          ),
          code: ({ children, ...props }) => (
            <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-xs font-medium text-teal-900 dark:text-teal-300 border border-slate-200/60 dark:border-slate-700">
              {children}
            </code>
          ),
          table: ({ children }) => (
            <div className="my-3 w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100 dark:bg-slate-800/90 font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50/60 hover:dark:bg-slate-800/50 transition">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 font-semibold text-slate-900 dark:text-slate-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-teal-700 dark:text-teal-400 hover:text-teal-900 hover:dark:text-teal-300 underline underline-offset-2 transition"
            >
              <span>{children}</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-70" />
            </a>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
