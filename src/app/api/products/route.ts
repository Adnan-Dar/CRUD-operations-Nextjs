
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import Product from "../../../../models/ProductModel";
 
export async function GET() {
    await connectMongoDB();
    const products = await Product.find();
    return NextResponse.json({ products });
}
 
export async function POST(request:any) {
    const { name, image,price,category } = await request.json();
    await connectMongoDB();
    await Product.create({ name, image, price, category });
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
}
 
export async function DELETE(request:any) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}