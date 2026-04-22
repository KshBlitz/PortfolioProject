import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import MouseGlow from "@/components/MouseGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalash Mahajan — SOC Analyst & Detection Engineer",
  description:
    "Personal website of Kalash Mahajan — SOC Analyst and Detection Engineer from Pune, India. Building and operating security systems from detection rules to full SOC pipelines.",
  keywords: [
    "SOC Analyst",
    "Detection Engineer",
    "Cybersecurity",
    "SIEM",
    "Wazuh",
    "ELK Stack",
    "Microsoft Sentinel",
    "Pune",
    "India",
    "Kalash Mahajan",
  ],
  authors: [{ name: "Kalash Mahajan" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230D9488'/><text x='50%25' y='54%25' font-size='14' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'>KM</text></svg>",
  },
  openGraph: {
    title: "Kalash Mahajan — SOC Analyst & Detection Engineer",
    description:
      "Building and operating security systems — from detection rules to full SOC pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MouseGlow />
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                fontFamily: "var(--font-geist-sans), sans-serif",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
