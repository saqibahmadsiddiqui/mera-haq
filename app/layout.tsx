import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Mera Haq — AI Legal Rights Assistant',
  description:
    'Explains Pakistani legal rights in plain Roman Urdu and English for everyday disputes (rent, salary, cybercrime, consumer fraud) and generates ready-to-send complaint letters and legal notices.',
  openGraph: {
    title: 'Mera Haq — AI Legal Rights Assistant',
    description:
      'Explains Pakistani legal rights in plain Roman Urdu and English for everyday disputes (rent, salary, cybercrime, consumer fraud) and generates ready-to-send complaint letters and legal notices.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mera Haq — AI Legal Rights Assistant',
    description:
      'Explains Pakistani legal rights in plain Roman Urdu and English for everyday disputes (rent, salary, cybercrime, consumer fraud) and generates ready-to-send complaint letters and legal notices.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="h-full bg-[#fdfdfb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-teal-100 dark:selection:bg-teal-900 selection:text-teal-950 dark:selection:text-teal-100 transition-colors duration-200"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
