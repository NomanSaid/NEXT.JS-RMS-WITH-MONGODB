import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const menuItems = await db.collection("menuItems").find({}).toArray()

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, price, description } = body

    if (!name || !category || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    const result = await db.collection("menuItems").insertOne({
      name,
      category,
      price: Number.parseFloat(price),
      description,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId, success: true })
  } catch (error) {
    console.error("Error adding menu item:", error)
    return NextResponse.json({ error: "Failed to add menu item" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, category, price, description } = body

    if (!id || !name || !category || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("restaurant")

    await db.collection("menuItems").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          category,
          price: Number.parseFloat(price),
          description,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
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

    await db.collection("menuItems").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
