import type { Metadata } from "next";
import { Figtree, DM_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["400", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Marie Anik Paradis - Portfolio",
  description: "Senior UX & Product Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);var m=p.get('mode');var t;if(m==='dark'||m==='light'){t=m;try{localStorage.setItem('theme',t)}catch(e){}}else{if(m!==null){console.warn('[portfolio] Invalid ?mode= value: "'+m+'", defaulting to light')}try{t=localStorage.getItem('theme')}catch(e){}if(t!=='dark'&&t!=='light'){t='light'}}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body)",
          lineHeight: "var(--text-body-lh)",
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
