import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Restaurant Management System</h1>
          <p className="mt-2 text-lg text-muted-foreground">Manage orders, menu items, and track sales</p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiter Interface</CardTitle>
              <CardDescription>Take orders, manage tables, and generate bills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access the waiter dashboard to manage customer orders and tables.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/waiter" className="w-full">
                <Button className="w-full">Enter as Waiter</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Interface</CardTitle>
              <CardDescription>Manage menu, view reports, and track inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access the admin dashboard to manage restaurant operations.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin" className="w-full">
                <Button className="w-full" variant="outline">
                  Enter as Admin
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
