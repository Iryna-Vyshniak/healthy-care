import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

// Import metadata from a JSON file
import metadataJson from '@/shared/data/meta.json';

import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/components/common/ThemeProvider';

import './globals.css';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: metadataJson.title,
  description: metadataJson.description,
  icons: metadataJson.icons,
  keywords: metadataJson.keywords,
  applicationName: metadataJson.applicationName,
  authors: metadataJson.authors,
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
          'remove-scrollbar bg-light min-h-screen bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] bg-cover bg-no-repeat font-sans text-slate-950 antialiased dark:bg-dark-300 dark:from-[#00032a] dark:via-slate-950 dark:to-dark-200 dark:text-white',
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
