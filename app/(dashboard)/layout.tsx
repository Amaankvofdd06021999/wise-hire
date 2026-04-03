"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AriaPanel } from "@/components/layout/aria-panel";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main
        id="main-content"
        className="flex-1 overflow-y-auto pb-16 md:pb-0 transition-all duration-300"
        style={{ marginLeft: `var(--sidebar-width)` }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-[var(--brand-600)]"
        >
          Skip to main content
        </a>
        {children}
      </main>
      <MobileNav />
      <AriaPanel />
      {/* CSS variable that syncs sidebar width to main margin */}
      <style>{`
        :root {
          --sidebar-width: 0px;
        }
        @media (min-width: 768px) {
          :root {
            --sidebar-width: ${collapsed ? "4rem" : "4rem"};
          }
        }
        @media (min-width: 1280px) {
          :root {
            --sidebar-width: ${collapsed ? "4rem" : "15rem"};
          }
        }
      `}</style>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </TooltipProvider>
  );
}
