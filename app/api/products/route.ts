// app/api/products/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// ensure table exists before anything else
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT NOT NULL,
      imageUrl TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function GET() {
  try {
    await ensureTable();
    const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const { name, price, description, imageUrl } = await request.json();
    if (!name || typeof price !== "number" || !description) {
      return NextResponse.json(
        { error: "Missing required fields: name, price (number), description" },
        { status: 400 }
      );
    }
    const { rows } = await sql`
      INSERT INTO products (name, price, description, imageUrl)
      VALUES (${name}, ${price}, ${description}, ${imageUrl || null})
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
