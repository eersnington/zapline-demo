import { storeData } from "@/app/lib/products";
import { CardContent } from "@/components/ui/card";
import { Card, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";

async function getProduct(id: string) {
  const products = storeData.products;
  return products.find((p) => p.id === parseInt(id)) || null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-black text-white flex flex-col h-full w-72 transition-transform hover:scale-105">
          {" "}
          {/* Set fixed width here */}
          <CardContent className="p-4 flex-grow flex justify-center items-center">
            {" "}
            {/* Use flex to center the image */}
            <div className="aspect-square relative overflow-hidden rounded-lg h-48">
              {" "}
              {/* Adjust height for smaller image */}
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="contain" // Change to 'contain' to fit the image within the container
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-xl text-[#b8ff29] mb-2">
              ₹{product.price.toFixed(2)}
            </p>
            <Button className="w-full bg-[#b8ff29] text-black hover:bg-[#a3e625] transition-colors">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
