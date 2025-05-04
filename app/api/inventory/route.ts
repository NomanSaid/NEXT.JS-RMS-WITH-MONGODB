import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const inventory = await db.collection("inventory").find({}).toArray()

    return NextResponse.json(inventory)
  } catch (error) {
    console.error("Error fetching inventory items:", error)
    return NextResponse.json({ error: "Failed to fetch inventory items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, quantity, unit, category } = body

    if (!name || !quantity || !unit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    const result = await db.collection("inventory").insertOne({
      name,
      quantity: Number.parseFloat(quantity),
      unit,
      category,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId, success: true })
  } catch (error) {
    console.error("Error adding inventory item:", error)
    return NextResponse.json({ error: "Failed to add inventory item" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, quantity, unit, category } = body

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    const updateData: any = { updatedAt: new Date() }
    if (name) updateData.name = name
    if (quantity) updateData.quantity = Number.parseFloat(quantity)
    if (unit) updateData.unit = unit
    if (category) updateData.category = category

    await db.collection("inventory").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating inventory item:", error)
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    await db.collection("inventory").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting inventory item:", error)
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}
