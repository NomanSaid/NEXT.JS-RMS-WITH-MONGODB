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
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Trash } from "lucide-react"

// Mock data - would be fetched from API in a real app
const menuItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    category: "Main Course",
    price: 12.99,
    description: "Classic pizza with tomato sauce and mozzarella",
  },
  {
    id: "2",
    name: "Caesar Salad",
    category: "Starters",
    price: 8.99,
    description: "Fresh romaine lettuce with Caesar dressing",
  },
  {
    id: "3",
    name: "Spaghetti Carbonara",
    category: "Main Course",
    price: 14.99,
    description: "Pasta with egg, cheese, and pancetta",
  },
  { id: "4", name: "Tiramisu", category: "Desserts", price: 6.99, description: "Coffee-flavored Italian dessert" },
  { id: "5", name: "Garlic Bread", category: "Sides", price: 4.99, description: "Toasted bread with garlic butter" },
  {
    id: "6",
    name: "Chocolate Cake",
    category: "Desserts",
    price: 7.99,
    description: "Rich chocolate cake with ganache",
  },
]

const categories = ["Starters", "Main Course", "Sides", "Desserts", "Beverages"]

export default function MenuManagement() {
  const [items, setItems] = useState(menuItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  })

  const handleAddItem = () => {
    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      price: Number.parseFloat(newItem.price),
      description: newItem.description,
    }

    setItems([...items, item])
    setNewItem({ name: "", category: "", price: "", description: "" })
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
              <DialogDescription>Add a new item to your restaurant menu</DialogDescription>
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
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
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

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="starters">Starters</TabsTrigger>
          <TabsTrigger value="main">Main Course</TabsTrigger>
          <TabsTrigger value="sides">Sides</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="beverages">Beverages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Menu Items</CardTitle>
              <CardDescription>Manage all items in your restaurant menu</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.description}</TableCell>
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
                                <DialogTitle>Edit Menu Item</DialogTitle>
                                <DialogDescription>Make changes to the menu item</DialogDescription>
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
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-price">Price ($)</Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      step="0.01"
                                      value={currentItem.price}
                                      onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={currentItem.description}
                                      onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
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

        {/* Other tabs would filter the items by category */}
        {["starters", "main", "sides", "desserts", "beverages"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{tab.charAt(0).toUpperCase() + tab.slice(1)}</CardTitle>
                <CardDescription>Manage {tab} in your restaurant menu</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items
                      .filter(
                        (item) => item.category.toLowerCase() === (tab === "main" ? "main course" : tab.slice(0, -1)),
                      )
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon">
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
        ))}
      </Tabs>
    </div>
  )
}
