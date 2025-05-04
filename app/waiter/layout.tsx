import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function WaiterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar isAdmin={false} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
