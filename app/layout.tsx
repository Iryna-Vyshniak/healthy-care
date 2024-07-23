import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/common/ThemeProvider';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'HealthyCare',
  description:
    'A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.',
  icons: { icon: '/assets/icons/logo.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body
        className={cn(
          'min-h-screen remove-scrollbar dark:bg-dark-300 bg-light font-sans antialiased text-slate-950 dark:text-white bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] dark:from-[#00032a] dark:via-slate-950 dark:to-dark-200 bg-no-repeat bg-cover',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          enableColorScheme={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
