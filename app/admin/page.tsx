import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, DollarSign, ShoppingCart, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$15,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+24</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
                <Coffee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+3 new items this week</p>
              </CardContent>
            </Card>

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
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Orders placed in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* This would be populated with actual order data */}
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
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Items running low on stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* This would be populated with actual inventory data */}
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">Tomatoes</div>
                    <div className="text-sm text-red-500">Low (2 kg)</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">Chicken</div>
                    <div className="text-sm text-red-500">Low (3 kg)</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">Olive Oil</div>
                    <div className="text-sm text-red-500">Low (1 bottle)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>View your restaurant sales performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {/* This would contain a chart component */}
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Sales chart would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>Download detailed reports for your restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Daily Sales Report</div>
                  <div className="text-sm text-muted-foreground">Download PDF</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Weekly Sales Report</div>
                  <div className="text-sm text-muted-foreground">Download PDF</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Monthly Sales Report</div>
                  <div className="text-sm text-muted-foreground">Download PDF</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
