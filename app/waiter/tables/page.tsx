"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, Plus } from "lucide-react"

// Mock data - would be fetched from API in a real app
const tables = [
  { id: "1", name: "Table 1", capacity: 4, status: "available" },
  { id: "2", name: "Table 2", capacity: 2, status: "occupied" },
  { id: "3", name: "Table 3", capacity: 6, status: "occupied" },
  { id: "4", name: "Table 4", capacity: 4, status: "available" },
  { id: "5", name: "Table 5", capacity: 8, status: "occupied" },
  { id: "6", name: "Table 6", capacity: 2, status: "available" },
  { id: "7", name: "Table 7", capacity: 4, status: "available" },
  { id: "8", name: "Table 8", capacity: 6, status: "occupied" },
  { id: "9", name: "Table 9", capacity: 2, status: "available" },
  { id: "10", name: "Table 10", capacity: 4, status: "available" },
  { id: "11", name: "Table 11", capacity: 8, status: "occupied" },
  { id: "12", name: "Table 12", capacity: 4, status: "available" },
]

export default function TablesPage() {
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState<any>(null)

  const handleNewOrder = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId)
    setSelectedTable(table)
    setIsNewOrderDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tables</h2>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tables</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <Card key={table.id} className={table.status === "occupied" ? "border-red-200" : "border-green-200"}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{table.name}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        table.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {table.status === "available" ? "Available" : "Occupied"}
                    </div>
                  </div>
                  <CardDescription>Capacity: {table.capacity} people</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    {table.status === "available" ? (
                      <Button className="w-full" onClick={() => handleNewOrder(table.id)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Order
                      </Button>
                    ) : (
                      <div className="w-full flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <ClipboardList className="mr-2 h-4 w-4" />
                          View Order
                        </Button>
                        <Button className="flex-1">Bill</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tables
              .filter((table) => table.status === "available")
              .map((table) => (
                <Card key={table.id} className="border-green-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{table.name}</CardTitle>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Available</div>
                    </div>
                    <CardDescription>Capacity: {table.capacity} people</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => handleNewOrder(table.id)}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="occupied" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tables
              .filter((table) => table.status === "occupied")
              .map((table) => (
                <Card key={table.id} className="border-red-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{table.name}</CardTitle>
                      <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Occupied</div>
                    </div>
                    <CardDescription>Capacity: {table.capacity} people</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        View Order
                      </Button>
                      <Button className="flex-1">Bill</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Order for {selectedTable?.name}</DialogTitle>
            <DialogDescription>Create a new order for this table</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">Would you like to create a new order for this table?</p>
            <p className="text-sm font-medium">
              Table: {selectedTable?.name}
              <br />
              Capacity: {selectedTable?.capacity} people
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewOrderDialogOpen(false)}>
              Cancel
            </Button>
            <Link href={`/waiter/orders/new?table=${selectedTable?.id}`}>
              <Button>Create Order</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
