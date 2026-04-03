"use client"

import React from "react"
import Link from "next/link"
import { Bell, ChevronRight, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
}

export function Header({ title, subtitle, breadcrumbs }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-5 lg:px-10 lg:py-6 bg-white border-b border-[var(--gray-200)]">
      {/* Left: breadcrumbs + title + subtitle */}
      <div className="flex flex-col gap-1 min-w-0">
        {/* Breadcrumb — hidden on mobile */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="hidden md:flex items-center gap-1 text-sm"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <ChevronRight
                      size={14}
                      className="text-[var(--gray-400)] shrink-0"
                    />
                  )}
                  {isLast || !crumb.href ? (
                    <span className="text-[var(--gray-900)] font-medium truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-[var(--gray-500)] hover:text-[var(--gray-700)] transition-colors truncate"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </nav>
        )}

        {/* Title */}
        <h1 className="text-xl font-semibold text-[var(--gray-900)] leading-tight truncate lg:text-2xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-[var(--gray-500)] leading-relaxed mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: bell + avatar dropdown */}
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {/* Bell button */}
        <button
          className="relative p-2.5 rounded-full text-[var(--gray-500)] hover:bg-[var(--gray-50)] hover:text-[var(--gray-700)] transition-colors border border-[var(--gray-200)]"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--error-500)] rounded-full" />
        </button>

        {/* User avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:ring-offset-2">
              <Avatar className="h-9 w-9 cursor-pointer border border-[var(--gray-200)]">
                <AvatarFallback className="bg-[var(--brand-100)] text-[var(--brand-700)] text-xs font-semibold">
                  AS
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[var(--gray-900)]">
                  Amaan Shahana
                </p>
                <p className="text-xs text-[var(--gray-500)]">
                  amaan@happening.design
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/login"
                className="flex items-center gap-2 cursor-pointer text-[var(--error-600)]"
              >
                <LogOut size={16} />
                Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
