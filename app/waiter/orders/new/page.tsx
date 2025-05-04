"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react"

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
  {
    id: "7",
    name: "Bruschetta",
    category: "Starters",
    price: 7.99,
    description: "Toasted bread with tomatoes and basil",
  },
  {
    id: "8",
    name: "Lasagna",
    category: "Main Course",
    price: 13.99,
    description: "Layered pasta with meat sauce and cheese",
  },
  {
    id: "9",
    name: "Cheesecake",
    category: "Desserts",
    price: 6.99,
    description: "Creamy cheesecake with berry compote",
  },
  { id: "10", name: "French Fries", category: "Sides", price: 3.99, description: "Crispy fried potatoes" },
  {
    id: "11",
    name: "Chicken Wings",
    category: "Starters",
    price: 9.99,
    description: "Spicy chicken wings with dipping sauce",
  },
  { id: "12", name: "Vegetable Soup", category: "Starters", price: 5.99, description: "Hearty vegetable soup" },
]

const tables = [
  { id: "1", name: "Table 1", capacity: 4, status: "available" },
  { id: "2", name: "Table 2", capacity: 2, status: "occupied" },
  { id: "3", name: "Table 3", capacity: 6, status: "occupied" },
  { id: "4", name: "Table 4", capacity: 4, status: "available" },
  { id: "5", name: "Table 5", capacity: 8, status: "occupied" },
]

export default function NewOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tableId = searchParams.get("table")

  const [table, setTable] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (tableId) {
      const foundTable = tables.find((t) => t.id === tableId)
      setTable(foundTable)
    }
  }, [tableId])

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find((item) => item.id === itemId)

    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item)))
    } else {
      setCart(cart.filter((item) => item.id !== itemId))
    }
  }

  const deleteFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = () => {
    // In a real app, you would make an API call to create the order
    console.log("Submitting order:", {
      tableId: table?.id,
      items: cart,
      total: calculateTotal(),
      waiter: "John Doe", // This would come from authentication
    })

    // Navigate back to tables page
    router.push("/waiter/tables")
  }

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Order - {table?.name}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Select items to add to the order</CardDescription>
              <div className="mt-2">
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="p-4">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="starters">Starters</TabsTrigger>
                  <TabsTrigger value="main">Main Course</TabsTrigger>
                  <TabsTrigger value="sides">Sides</TabsTrigger>
                  <TabsTrigger value="desserts">Desserts</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-2">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => addToCart(item)}
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{item.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {["starters", "main", "sides", "desserts"].map((category) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    <div className="grid gap-2">
                      {filteredItems
                        .filter((item) => {
                          const categoryName =
                            category === "main"
                              ? "Main Course"
                              : category.charAt(0).toUpperCase() + category.slice(0, -1) + "s"
                          return item.category === categoryName
                        })
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => addToCart(item)}
                          >
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Items in the current order</CardDescription>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No items in the order yet</p>
                  <p className="text-sm text-muted-foreground">Click on menu items to add them to the order</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteFromCart(item.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex items-center justify-between font-medium">
                    <div>Subtotal</div>
                    <div>${calculateTotal().toFixed(2)}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Tax (10%)</div>
                    <div>${(calculateTotal() * 0.1).toFixed(2)}</div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between font-bold text-lg">
                    <div>Total</div>
                    <div>${(calculateTotal() * 1.1).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={cart.length === 0} onClick={handleSubmitOrder}>
                Submit Order
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Table Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Table:</span>
                  <span>{table?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Capacity:</span>
                  <span>{table?.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span className={table?.status === "available" ? "text-green-600" : "text-red-600"}>
                    {table?.status === "available" ? "Available" : "Occupied"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
