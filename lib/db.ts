import clientPromise from "./mongodb"

export async function getMenuItems() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const menuItems = await db.collection("menuItems").find({}).toArray()
    return JSON.parse(JSON.stringify(menuItems))
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return []
  }
}

export async function getOrders() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function getTables() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const tables = await db.collection("tables").find({}).toArray()
    return JSON.parse(JSON.stringify(tables))
  } catch (error) {
    console.error("Error fetching tables:", error)
    return []
  }
}

export async function getInventoryItems() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const inventory = await db.collection("inventory").find({}).toArray()
    return JSON.parse(JSON.stringify(inventory))
  } catch (error) {
    console.error("Error fetching inventory items:", error)
    return []
  }
}

export async function getSalesData() {
  try {
    const client = await clientPromise
    const db = client.db("restaurant")
    const sales = await db
      .collection("orders")
      .aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: "$date", totalSales: { $sum: "$total" } } },
        { $sort: { _id: -1 } },
        { $limit: 30 },
      ])
      .toArray()
    return JSON.parse(JSON.stringify(sales))
  } catch (error) {
    console.error("Error fetching sales data:", error)
    return []
  }
}
