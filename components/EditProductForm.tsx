"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEditProductForm } from "../lib/validation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export default function EditProductForm({
  id,
  name,
  image,
  price,
  category,
}: {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}) {
  const [newName, setNewTitle] = useState(name);
  const [newImage, setNewImage] = useState(image);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);
  const [errors, setErrors] = useState<any[]>([]);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const safeParsedResults = validateEditProductForm({
        newName,
        newImage,
        newPrice,
        newCategory,
      });

      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newImage, newPrice, newCategory }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Product");
      }

      router.refresh();
      router.push("/products");
      setErrors([]);
    } catch (error) {
        if (error instanceof ZodError){
            const errorMessages = error.errors.map((err) => err.message);
            console.log(errorMessages);
        setErrors(error.errors);
        }else{
            console.log(error);
        }
     

}
  };

  return (
    <>
    <div className="flex flex-col mt-20 justify-center items-center">
      <div>
        <h1 className="font-bold py-10 text-2xl">Update Product</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newName}
            className="input input-bordered input-accent w-full max-w-xs"
            type="text"
          />
          <div className="mt-1 text-xs text-red-500">
            {errors.find((error: any) => error.path.includes("newName"))?.message}
          </div>
  
          <input
            onChange={(e) => setNewImage(e.target.value)}
            value={newImage}
            className="input input-bordered input-accent w-full max-w-xs"
            type="text"
          />
          <div className="mt-1 text-xs text-red-500">
            {/* Display error message if there is an error for 'image' field */}
            {errors.find((error: any) => error.path.includes("newImage"))?.message}
          </div>
  
          <input
            onChange={(e) => setNewPrice(Number(e.target.value))}
            value={newPrice}
            className="input input-bordered input-accent w-full max-w-xs"
            type="text"
          />
          <div className="mt-1 text-xs text-red-500">
            {/* Display error message if there is an error for 'price' field */}
            {errors.find((error: any) => error.path.includes("newPrice"))?.message}
          </div>
  
          <input
            onChange={(e) => setNewCategory(e.target.value)}
            value={newCategory}
            className="input input-bordered input-accent w-full max-w-xs"
            type="text"
          />
          <div className="mt-1 text-xs text-red-500">
            {/* Display error message if there is an error for 'category' field */}
            {errors.find((error: any) => error.path.includes("newCategory"))?.message}
          </div>
  
          <button className="btn btn-primary w-full max-w-xs">
            Update Product
          </button>
        </form>
      </div>
    </div>
  </>
  
  
  );
}
