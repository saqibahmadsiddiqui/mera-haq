import React from 'react';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-transparent px-4 text-center">
      <div className="max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-950 dark:bg-teal-700 text-teal-300 dark:text-teal-100 shadow-xs">
          <Scale className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">404</h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Safha Dastyab Nahi Hai (Page Not Found)
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl bg-teal-800 dark:bg-teal-700 text-white text-sm font-semibold hover:bg-teal-900 hover:dark:bg-teal-600 transition-colors shadow-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Wapas Home Jayein (Back to Home)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
