import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tableId, items, total, waiter } = body

    if (!tableId || !items || !total || !waiter) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    // Create the order
    const result = await db.collection("orders").insertOne({
      tableId,
      items,
      total: Number.parseFloat(total),
      waiter,
      status: "pending",
      createdAt: new Date(),
      date: new Date().toISOString().split("T")[0],
    })

    // Update table status
    await db
      .collection("tables")
      .updateOne({ _id: new ObjectId(tableId) }, { $set: { status: "occupied", currentOrderId: result.insertedId } })

    return NextResponse.json({ id: result.insertedId, success: true })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status, items, total } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    const updateData: any = { status, updatedAt: new Date() }

    if (items) updateData.items = items
    if (total) updateData.total = Number.parseFloat(total)

    const order = await db.collection("orders").findOne({ _id: new ObjectId(id) })

    await db.collection("orders").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    // If order is completed, free up the table
    if (status === "completed" && order) {
      await db
        .collection("tables")
        .updateOne({ _id: new ObjectId(order.tableId) }, { $set: { status: "available", currentOrderId: null } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
