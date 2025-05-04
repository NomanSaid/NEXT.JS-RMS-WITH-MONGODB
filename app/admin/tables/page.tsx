"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Trash } from "lucide-react"

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

export default function AdminTablesPage() {
  const [tablesList, setTablesList] = useState(tables)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTable, setCurrentTable] = useState<any>(null)
  const [newTable, setNewTable] = useState({
    name: "",
    capacity: "",
  })

  const handleAddTable = () => {
    const table = {
      id: Date.now().toString(),
      name: newTable.name,
      capacity: Number.parseInt(newTable.capacity),
      status: "available",
    }

    setTablesList([...tablesList, table])
    setNewTable({ name: "", capacity: "" })
    setIsAddDialogOpen(false)

    // In a real app, you would make an API call to save the table
  }

  const handleEditTable = () => {
    if (!currentTable) return

    const updatedTables = tablesList.map((table) => (table.id === currentTable.id ? currentTable : table))

    setTablesList(updatedTables)
    setIsEditDialogOpen(false)

    // In a real app, you would make an API call to update the table
  }

  const handleDeleteTable = (id: string) => {
    // Check if table is occupied
    const table = tablesList.find((t) => t.id === id)
    if (table && table.status === "occupied") {
      alert("Cannot delete a table that is currently occupied")
      return
    }

    const updatedTables = tablesList.filter((table) => table.id !== id)
    setTablesList(updatedTables)

    // In a real app, you would make an API call to delete the table
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tables Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Table</DialogTitle>
              <DialogDescription>Add a new table to your restaurant</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Table Name</Label>
                <Input
                  id="name"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTable}>Add Table</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tables</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tables</CardTitle>
              <CardDescription>Manage all tables in your restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tablesList.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.capacity} people</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            table.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {table.status === "available" ? "Available" : "Occupied"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setCurrentTable(table)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Table</DialogTitle>
                                <DialogDescription>Make changes to the table</DialogDescription>
                              </DialogHeader>
                              {currentTable && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Table Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={currentTable.name}
                                      onChange={(e) => setCurrentTable({ ...currentTable, name: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-capacity">Capacity</Label>
                                    <Input
                                      id="edit-capacity"
                                      type="number"
                                      value={currentTable.capacity}
                                      onChange={(e) =>
                                        setCurrentTable({ ...currentTable, capacity: Number.parseInt(e.target.value) })
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditTable}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTable(table.id)}
                            disabled={table.status === "occupied"}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Tables</CardTitle>
              <CardDescription>View all available tables</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tablesList
                    .filter((table) => table.status === "available")
                    .map((table) => (
                      <TableRow key={table.id}>
                        <TableCell className="font-medium">{table.name}</TableCell>
                        <TableCell>{table.capacity} people</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setCurrentTable(table)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTable(table.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupied" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupied Tables</CardTitle>
              <CardDescription>View all occupied tables</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tablesList
                    .filter((table) => table.status === "occupied")
                    .map((table) => (
                      <TableRow key={table.id}>
                        <TableCell className="font-medium">{table.name}</TableCell>
                        <TableCell>{table.capacity} people</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setCurrentTable(table)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
