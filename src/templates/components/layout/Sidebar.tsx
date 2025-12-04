"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

interface SidebarProps {
  logo?: React.ReactNode;
  groups: SidebarGroup[];
  footer?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

export function Sidebar({ 
  logo, 
  groups, 
  footer,
  className,
  collapsible = true,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card flex flex-col",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            {logo || <span className="text-xl font-bold">Logo</span>}
          </Link>
        )}
        {collapsible && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(isCollapsed && "mx-auto")}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.title && !isCollapsed && (
              <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.title}
              </h4>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              "rounded-full px-2 py-0.5 text-xs",
                              isActive
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && !isCollapsed && (
        <div className="border-t p-4">
          {footer}
        </div>
      )}
    </motion.aside>
  );
}

// Content wrapper that adjusts for sidebar
interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarWidth?: number;
}

export function SidebarLayout({ children, sidebarWidth = 256 }: SidebarLayoutProps) {
  return (
    <main 
      className="min-h-screen transition-all duration-200"
      style={{ marginLeft: sidebarWidth }}
    >
      {children}
    </main>
  );
}
