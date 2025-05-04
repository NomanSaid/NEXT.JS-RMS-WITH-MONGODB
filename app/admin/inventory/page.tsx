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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Search, Trash } from "lucide-react"

// Mock data - would be fetched from API in a real app
const inventoryItems = [
  {
    id: "1",
    name: "Tomatoes",
    quantity: 5,
    unit: "kg",
    category: "Vegetables",
    threshold: 3,
  },
  {
    id: "2",
    name: "Chicken",
    quantity: 8,
    unit: "kg",
    category: "Meat",
    threshold: 5,
  },
  {
    id: "3",
    name: "Olive Oil",
    quantity: 2,
    unit: "bottle",
    category: "Oils",
    threshold: 3,
  },
  {
    id: "4",
    name: "Flour",
    quantity: 15,
    unit: "kg",
    category: "Dry Goods",
    threshold: 10,
  },
  {
    id: "5",
    name: "Mozzarella",
    quantity: 7,
    unit: "kg",
    category: "Dairy",
    threshold: 4,
  },
  {
    id: "6",
    name: "Basil",
    quantity: 1,
    unit: "kg",
    category: "Herbs",
    threshold: 0.5,
  },
  {
    id: "7",
    name: "Garlic",
    quantity: 2,
    unit: "kg",
    category: "Vegetables",
    threshold: 1,
  },
  {
    id: "8",
    name: "Pasta",
    quantity: 20,
    unit: "kg",
    category: "Dry Goods",
    threshold: 10,
  },
]

const categories = ["Vegetables", "Meat", "Dairy", "Dry Goods", "Herbs", "Oils", "Spices", "Beverages"]

export default function AdminInventoryPage() {
  const [items, setItems] = useState(inventoryItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    unit: "",
    category: "",
    threshold: "",
  })

  const handleAddItem = () => {
    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: Number.parseFloat(newItem.quantity),
      unit: newItem.unit,
      category: newItem.category,
      threshold: Number.parseFloat(newItem.threshold),
    }

    setItems([...items, item])
    setNewItem({ name: "", quantity: "", unit: "", category: "", threshold: "" })
    setIsAddDialogOpen(false)

    // In a real app, you would make an API call to save the item
  }

  const handleEditItem = () => {
    if (!currentItem) return

    const updatedItems = items.map((item) => (item.id === currentItem.id ? currentItem : item))

    setItems(updatedItems)
    setIsEditDialogOpen(false)

    // In a real app, you would make an API call to update the item
  }

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)

    // In a real app, you would make an API call to delete the item
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const isLowStock = (item: any) => {
    return item.quantity <= item.threshold
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
              <DialogDescription>Add a new item to your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.01"
                  value={newItem.threshold}
                  onChange={(e) => setNewItem({ ...newItem, threshold: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory items..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="low">Low Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Inventory Items</CardTitle>
              <CardDescription>Manage all items in your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            isLowStock(item) ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {isLowStock(item) ? "Low Stock" : "In Stock"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setCurrentItem(item)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Inventory Item</DialogTitle>
                                <DialogDescription>Make changes to the inventory item</DialogDescription>
                              </DialogHeader>
                              {currentItem && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={currentItem.name}
                                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Select
                                      value={currentItem.category}
                                      onValueChange={(value) => setCurrentItem({ ...currentItem, category: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map((category) => (
                                          <SelectItem key={category} value={category}>
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-quantity">Quantity</Label>
                                      <Input
                                        id="edit-quantity"
                                        type="number"
                                        step="0.01"
                                        value={currentItem.quantity}
                                        onChange={(e) =>
                                          setCurrentItem({
                                            ...currentItem,
                                            quantity: Number.parseFloat(e.target.value),
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-unit">Unit</Label>
                                      <Input
                                        id="edit-unit"
                                        value={currentItem.unit}
                                        onChange={(e) => setCurrentItem({ ...currentItem, unit: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-threshold">Low Stock Threshold</Label>
                                    <Input
                                      id="edit-threshold"
                                      type="number"
                                      step="0.01"
                                      value={currentItem.threshold}
                                      onChange={(e) =>
                                        setCurrentItem({
                                          ...currentItem,
                                          threshold: Number.parseFloat(e.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditItem}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
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

        <TabsContent value="low" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be restocked</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems
                    .filter((item) => isLowStock(item))
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-red-600 font-medium">{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.threshold}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setCurrentItem(item)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
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
