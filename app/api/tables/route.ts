import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const tables = await db.collection("tables").find({}).toArray()

    return NextResponse.json(tables)
  } catch (error) {
    console.error("Error fetching tables:", error)
    return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, capacity } = body

    if (!name || !capacity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    const result = await db.collection("tables").insertOne({
      name,
      capacity: Number.parseInt(capacity),
      status: "available",
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId, success: true })
  } catch (error) {
    console.error("Error adding table:", error)
    return NextResponse.json({ error: "Failed to add table" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, capacity, status } = body

    if (!id) {
      return NextResponse.json({ error: "Missing table ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    const updateData: any = { updatedAt: new Date() }
    if (name) updateData.name = name
    if (capacity) updateData.capacity = Number.parseInt(capacity)
    if (status) updateData.status = status

    await db.collection("tables").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating table:", error)
    return NextResponse.json({ error: "Failed to update table" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing table ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    // Check if table has active orders
    const table = await db.collection("tables").findOne({ _id: new ObjectId(id) })
    if (table && table.status === "occupied") {
      return NextResponse.json({ error: "Cannot delete table with active orders" }, { status: 400 })
    }

    await db.collection("tables").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting table:", error)
    return NextResponse.json({ error: "Failed to delete table" }, { status: 500 })
  }
}
