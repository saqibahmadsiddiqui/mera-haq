import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mera Haq (میرا حق) — AI Legal Rights & Notice Generator for Pakistan',
  description:
    'Instant legal rights answers in Roman Urdu and English for tenants, employees, cyber harassment victims, consumers, and freelancers in Pakistan. Cites Pakistani statutes and generates formal complaint letters and legal notices.',
  openGraph: {
    title: 'Mera Haq (میرا حق) — AI Legal Rights Assistant',
    description:
      'Know your legal rights under Pakistani law and generate ready-to-send complaint letters and legal notices.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mera Haq (میرا حق) — AI Legal Rights Assistant',
    description:
      'Know your legal rights under Pakistani law and generate ready-to-send complaint letters and legal notices.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body suppressHydrationWarning className="h-full bg-[#fdfdfb] text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-950">
        {children}
      </body>
    </html>
  );
}
