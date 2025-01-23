"use client";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import Footer from "@/components/Footer";
import Head from "next/head";
import * as Sentry from "@sentry/nextjs"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// if (typeof window !== "undefined") {
//   import("./initSentry").then((module) => module.initSentry());
// }

if (typeof window !== "undefined") {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: 1,
    debug: false,
  });
}


// const metadata: Metadata = {
//   title: "Okorie Emmanuel's Portfolio",
//   description:
//     "Welcome to Okorie Emmanuel's Portfolio - Showcasing innovative Mobile and Web frontend development, and creative projects.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Ensures the component is rendered only after hydration
    setHydrated(true);

    if (typeof Sentry !== 'undefined') {
      console.log('Sentry is initialized');
      // Optionally you can log or send a test error
      Sentry.captureMessage("Sentry is working!");
    } else {
      console.log('Sentry is not defined');
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>{"Okorie Emmanuel's Portfolio"}</title>
        <meta
          name="description"
          content="Welcome to Okorie Emmanuel's Portfolio - Showcasing innovative Mobile and Web frontend development, and creative projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-black-100 antialiased`}
      >
        <FloatingNav navItems={navItems} />
        <div>
          {hydrated ? (
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          ) : (
            children // Render children without theme provider during SSR
          )}
        </div>

        <Footer />
      </body>
    </html>
  );
}
