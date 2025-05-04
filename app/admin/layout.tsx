import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar isAdmin={true} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
