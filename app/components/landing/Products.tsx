"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function ProductionsSection({
  storeData,
  cartItems,
  addToCart,
}: {
  storeData: {
    storeName: string;
    products: { id: number; name: string; price: number; image: string }[];
  };
  cartItems: number;
  addToCart: () => void;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {storeData.products.map((product) => (
          <Card key={product.id} className="bg-black text-white">
            <CardContent className="p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg object-cover w-full h-48"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-[#b8ff29] mb-2">${product.price.toFixed(2)}</p>
              <Button
                onClick={addToCart}
                className="w-full bg-[#b8ff29] text-black hover:bg-[#a3e625] transition-colors"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
