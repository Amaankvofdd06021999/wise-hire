"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AriaPanel } from "@/components/layout/aria-panel";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto pb-16 md:pb-0 md:ml-16 xl:ml-60 transition-all duration-300"
        >
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-[var(--brand-600)]">
            Skip to main content
          </a>
          {children}
        </main>
        <MobileNav />
        <AriaPanel />
      </div>
    </TooltipProvider>
  );
}
