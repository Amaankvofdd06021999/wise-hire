"use client"

import React, { useState, useEffect } from "react"
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
  ChevronsLeft,
  ChevronsRight,
  type LucideIcon,
} from "lucide-react"
import { NAV_ITEMS } from "@/lib/constants"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1280) {
        setCollapsed(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
      <aside
        className={`
          hidden md:flex flex-col fixed left-0 top-0 h-screen
          border-r border-[var(--gray-200)] bg-white
          transition-all duration-300 z-40
          ${collapsed ? "w-16" : "w-16 xl:w-60"}
        `}
      >
        {/* Top: Logo + Workspace */}
        <div className="flex items-center gap-3 px-3 py-5 border-b border-[var(--gray-200)]">
          <div className="w-8 h-8 rounded-md bg-[var(--brand-600)] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          {!collapsed && (
            <div className="hidden xl:block overflow-hidden">
              <p className="text-xl font-semibold text-[var(--brand-600)] leading-tight truncate">
                WiseHire
              </p>
              <p className="text-xs text-[var(--gray-500)] truncate">
                Amaan's Team
              </p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon]
            const active = isActive(item.href)

            const linkClasses = `
              flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${collapsed ? "justify-center" : "justify-start"}
              ${
                active
                  ? "bg-[var(--brand-50)] text-[var(--brand-700)] border-l-[3px] border-[var(--brand-600)] pl-[calc(0.75rem-3px)]"
                  : "text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
              }
            `

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} className={linkClasses}>
                      {Icon && <Icon size={18} />}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link key={item.href} href={item.href} className={linkClasses}>
                {Icon && <Icon size={18} className="shrink-0" />}
                <span className="hidden xl:block truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom: Avatar + User Info + Toggle */}
        <div className="border-t border-[var(--gray-200)] px-3 py-4">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[var(--brand-100)] flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-[var(--brand-700)]">AS</span>
            </div>

            {/* User info — hidden when collapsed or below xl */}
            {!collapsed && (
              <div className="hidden xl:block overflow-hidden flex-1">
                <p className="text-sm font-medium text-[var(--gray-700)] truncate">
                  Amaan Shahana
                </p>
                <p className="text-xs text-[var(--gray-500)] truncate">Admin</p>
              </div>
            )}
          </div>

          {/* Collapse toggle — xl only */}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden xl:flex mt-3 w-full items-center justify-center p-1.5 rounded-md text-[var(--gray-400)] hover:bg-[var(--gray-50)] hover:text-[var(--gray-700)] transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        </div>
      </aside>
  )
}
