import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Coffee, DollarSign, Users } from "lucide-react"

export default function WaiterDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Waiter Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tables</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7/12</div>
            <p className="text-xs text-muted-foreground">58% occupancy rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Orders Today</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 active orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Today</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$487.25</div>
            <p className="text-xs text-muted-foreground">From 12 orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Items</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Margherita</div>
            <p className="text-xs text-muted-foreground">Ordered 8 times today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Your Recent Orders</CardTitle>
            <CardDescription>Orders you've taken in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">Table 5</div>
                  <div className="text-sm text-muted-foreground">Order #1234</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$45.50</div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">Table 3</div>
                  <div className="text-sm text-muted-foreground">Order #1233</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$78.25</div>
                  <div className="text-sm text-muted-foreground">3 hours ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">Table 8</div>
                  <div className="text-sm text-muted-foreground">Order #1232</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$32.75</div>
                  <div className="text-sm text-muted-foreground">5 hours ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Table Status</CardTitle>
            <CardDescription>Current status of all tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-medium">Table 1</div>
                <div className="text-sm text-green-500">Available</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-medium">Table 2</div>
                <div className="text-sm text-red-500">Occupied</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-medium">Table 3</div>
                <div className="text-sm text-red-500">Occupied</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-medium">Table 4</div>
                <div className="text-sm text-green-500">Available</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-medium">Table 5</div>
                <div className="text-sm text-red-500">Occupied</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
