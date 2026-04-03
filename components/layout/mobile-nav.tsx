"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ScanSearch,
  ClipboardCheck,
  Video,
  BarChart3,
  MessageSquare,
  Settings,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"
import { NAV_ITEMS } from "@/lib/constants"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Briefcase,
  Users,
  ScanSearch,
  ClipboardCheck,
  Video,
  BarChart3,
  MessageSquare,
  Settings,
}

const PRIMARY_ITEMS = NAV_ITEMS.slice(0, 4)
const MORE_ITEMS = NAV_ITEMS.slice(4)

export function MobileNav() {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false)

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const anyMoreActive = MORE_ITEMS.some((item) => isActive(item.href))

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-[var(--gray-200)] h-16"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 h-full">
        {PRIMARY_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon]
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                active
                  ? "text-[var(--brand-600)]"
                  : "text-[var(--gray-400)]"
              }`}
            >
              {Icon && <Icon size={20} />}
              <span className="text-[10px] leading-none">{item.label}</span>
            </Link>
          )
        })}

        {/* "More" button */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className={`flex flex-col items-center justify-center gap-1 transition-colors w-full ${
                anyMoreActive
                  ? "text-[var(--brand-600)]"
                  : "text-[var(--gray-400)]"
              }`}
            >
              <MoreHorizontal size={20} />
              <span className="text-[10px] leading-none">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto rounded-t-xl pb-8">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-base text-[var(--gray-900)]">
                More
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1">
              {MORE_ITEMS.map((item) => {
                const Icon = ICON_MAP[item.icon]
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSheetOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                        : "text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                    }`}
                  >
                    {Icon && <Icon size={20} />}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
