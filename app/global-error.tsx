'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Layout Error:', error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfb] px-4 text-center font-sans antialiased text-slate-900">
        <div className="max-w-md p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Kuch masla pesh aya (Application Error)</h2>
          <p className="text-slate-600 text-sm">
            An unexpected error occurred while loading the application.
          </p>
          <button
            onClick={() => reset()}
            className="w-full px-5 py-2.5 rounded-xl bg-teal-800 text-white text-sm font-medium hover:bg-teal-900 transition-colors shadow-xs"
          >
            Dobara Koshish Karein (Try Again)
          </button>
        </div>
      </body>
    </html>
  );
}
