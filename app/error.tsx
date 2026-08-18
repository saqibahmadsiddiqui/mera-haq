'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route Segment Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfb] px-4 text-center">
      <div className="max-w-md p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Kuch masla pesh aya (Something went wrong)</h2>
        <p className="text-slate-600 text-sm">
          An error occurred while loading this section. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="w-full px-5 py-2.5 rounded-xl bg-teal-800 text-white text-sm font-medium hover:bg-teal-900 transition-colors shadow-xs"
        >
          Dobara Koshish Karein (Try Again)
        </button>
      </div>
    </div>
  );
}
