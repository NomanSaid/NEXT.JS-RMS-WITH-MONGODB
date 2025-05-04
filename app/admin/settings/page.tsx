"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [restaurantName, setRestaurantName] = useState("My Restaurant")
  const [address, setAddress] = useState("123 Main Street, City, Country")
  const [phone, setPhone] = useState("+1 234 567 890")
  const [email, setEmail] = useState("contact@myrestaurant.com")
  const [taxRate, setTaxRate] = useState("10")
  const [currency, setCurrency] = useState("USD")
  const [timeZone, setTimeZone] = useState("UTC")
  const [enableOnlineOrders, setEnableOnlineOrders] = useState(true)
  const [enableReservations, setEnableReservations] = useState(true)
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [autoAssignTables, setAutoAssignTables] = useState(false)

  const handleSaveGeneralSettings = () => {
    // In a real app, this would make an API call to save the settings
    console.log("Saving general settings:", {
      restaurantName,
      address,
      phone,
      email,
      taxRate,
      currency,
      timeZone,
    })
    alert("General settings saved successfully!")
  }

  const handleSaveFeatureSettings = () => {
    // In a real app, this would make an API call to save the settings
    console.log("Saving feature settings:", {
      enableOnlineOrders,
      enableReservations,
      enableNotifications,
      autoAssignTables,
    })
    alert("Feature settings saved successfully!")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your restaurant's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input
                  id="restaurant-name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="CST">Central Time (CST)</SelectItem>
                      <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="online-orders">Online Orders</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to place orders online</p>
                </div>
                <Switch id="online-orders" checked={enableOnlineOrders} onCheckedChange={setEnableOnlineOrders} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reservations">Reservations</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to make table reservations</p>
                </div>
                <Switch id="reservations" checked={enableReservations} onCheckedChange={setEnableReservations} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications for new orders and reservations</p>
                </div>
                <Switch id="notifications" checked={enableNotifications} onCheckedChange={setEnableNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-assign">Auto-assign Tables</Label>
                  <p className="text-sm text-muted-foreground">Automatically assign tables to new orders</p>
                </div>
                <Switch id="auto-assign" checked={autoAssignTables} onCheckedChange={setAutoAssignTables} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveFeatureSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage staff accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Admin Users</h3>
                  <p className="text-sm text-muted-foreground mb-4">Users with full system access</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">sarah@example.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Waiters</h3>
                  <p className="text-sm text-muted-foreground mb-4">Staff with order management access</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <p className="font-medium">Mike Wilson</p>
                        <p className="text-sm text-muted-foreground">mike@example.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <p className="font-medium">Emily Davis</p>
                        <p className="text-sm text-muted-foreground">emily@example.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <p className="font-medium">Robert Brown</p>
                        <p className="text-sm text-muted-foreground">robert@example.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add New User</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Manage your system data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium">Create Backup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a backup of your restaurant data including orders, menu items, and settings
                </p>
                <Button>Create Backup</Button>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium">Restore Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Restore your restaurant data from a previous backup
                </p>
                <div className="grid gap-4">
                  <Input type="file" />
                  <Button variant="outline">Restore from Backup</Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium">Scheduled Backups</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure automatic backups of your restaurant data
                </p>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="scheduled-backups">Enable Scheduled Backups</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup data daily</p>
                  </div>
                  <Switch id="scheduled-backups" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
