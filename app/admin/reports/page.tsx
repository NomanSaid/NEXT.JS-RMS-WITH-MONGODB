"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - would be fetched from API in a real app
const salesData = [
  { date: "2023-05-01", totalSales: 1245.75, orders: 42 },
  { date: "2023-05-02", totalSales: 1532.5, orders: 51 },
  { date: "2023-05-03", totalSales: 1378.25, orders: 46 },
  { date: "2023-05-04", totalSales: 1687.0, orders: 55 },
  { date: "2023-05-05", totalSales: 2145.5, orders: 68 },
  { date: "2023-05-06", totalSales: 2356.75, orders: 72 },
  { date: "2023-05-07", totalSales: 1987.25, orders: 63 },
]

const topSellingItems = [
  { name: "Margherita Pizza", category: "Main Course", quantity: 145, revenue: 1885.55 },
  { name: "Spaghetti Carbonara", category: "Main Course", quantity: 112, revenue: 1679.88 },
  { name: "Caesar Salad", category: "Starters", quantity: 98, revenue: 881.02 },
  { name: "Tiramisu", category: "Desserts", quantity: 87, revenue: 608.13 },
  { name: "Garlic Bread", category: "Sides", quantity: 76, revenue: 379.24 },
]

const inventoryUsage = [
  { name: "Tomatoes", initialStock: 50, consumed: 42, remaining: 8 },
  { name: "Chicken", initialStock: 40, consumed: 28, remaining: 12 },
  { name: "Flour", initialStock: 100, consumed: 65, remaining: 35 },
  { name: "Mozzarella", initialStock: 30, consumed: 25, remaining: 5 },
  { name: "Olive Oil", initialStock: 20, consumed: 8, remaining: 12 },
]

export default function AdminReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [reportType, setReportType] = useState("daily")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily Report</SelectItem>
            <SelectItem value="weekly">Weekly Report</SelectItem>
            <SelectItem value="monthly">Monthly Report</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {reportType === "daily" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        )}

        {reportType === "custom" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        )}

        <Button className="w-[180px] md:ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="items">Top Selling Items</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>Overview of sales for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Sales chart would be displayed here
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Average Order Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell>{format(new Date(day.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{day.orders}</TableCell>
                      <TableCell>${day.totalSales.toFixed(2)}</TableCell>
                      <TableCell>${(day.totalSales / day.orders).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
              <CardDescription>Most popular items for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Top items chart would be displayed here
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingItems.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.revenue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Usage</CardTitle>
              <CardDescription>Inventory consumption for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Inventory usage chart would be displayed here
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Initial Stock</TableHead>
                    <TableHead>Consumed</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Usage %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryUsage.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.initialStock}</TableCell>
                      <TableCell>{item.consumed}</TableCell>
                      <TableCell>{item.remaining}</TableCell>
                      <TableCell>{((item.consumed / item.initialStock) * 100).toFixed(1)}%</TableCell>
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
