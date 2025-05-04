"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChefHat,
  ClipboardList,
  Coffee,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isAdmin?: boolean
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Menu Management", href: "/admin/menu", icon: Coffee },
    { name: "Orders", href: "/admin/orders", icon: ClipboardList },
    { name: "Tables", href: "/admin/tables", icon: Users },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const waiterLinks = [
    { name: "Dashboard", href: "/waiter", icon: LayoutDashboard },
    { name: "Tables", href: "/waiter/tables", icon: Users },
    { name: "Orders", href: "/waiter/orders", icon: ClipboardList },
    { name: "Menu", href: "/waiter/menu", icon: Coffee },
  ]

  const links = isAdmin ? adminLinks : waiterLinks

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b px-3 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {!collapsed && <span>Restaurant MS</span>}
          <ChefHat className={cn("h-6 w-6", collapsed ? "mx-auto" : "")} />
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {links.map((link, index) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-2">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  )
}
