
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongodb";
import Product from "../../../../../models/ProductModel";
 
export async function PUT(request: { json: () => PromiseLike<{ newName: any; newImage: any; newPrice: any; newCategory: any; }> | { newName: any; newImage: any; newPrice: any; newCategory: any; }; }, { params }: any) {
    const { id } = params;
    const { newName: name, newImage: image, newPrice: price, newCategory: category } = await request.json();
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, { name, image, price, category});
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
 
export async function GET(request: any, { params }: any) {
    const { id } = params;
    await connectMongoDB();
    const product = await Product.findOne({ _id: id });
    return NextResponse.json({ product }, { status: 200 });
}