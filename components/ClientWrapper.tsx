"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "@/app/provider";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import Footer from "@/components/Footer";
import * as Sentry from "@sentry/nextjs";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof Sentry !== "undefined") {
      Sentry.captureMessage("Sentry is working in production!");
    }
  }, []);

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </div>
      <Footer />
    </>
  );
}
