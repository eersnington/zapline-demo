"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VoicebotUI from "./VoicebotUI";

export default function ProductPage({
  product,
}: {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  } | null;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const router = useRouter();

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
    setShowLabel(false);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 text-black hover:text-[#b8ff29]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h1 className="text-black text-3xl font-bold mb-2">
                    {product.name}
                  </h1>
                  <p className="text-4xl font-extrabold text-[#b8ff29] mb-4 bg-black rounded-xl px-4 py-2 inline-block">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 mb-8">{product.description}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium">Quantity</span>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="border-[#b8ff29] text-[#b8ff29] hover:bg-[#b8ff29] hover:text-black"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-black text-xl font-bold">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity >= 10}
                        aria-label="Increase quantity"
                        className="border-[#b8ff29] text-[#b8ff29] hover:bg-[#b8ff29] hover:text-black"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-[#b8ff29] hover:bg-[#a3e625] text-black font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="fixed bottom-16 right-4 flex items-center">
          {showLabel && (
            <span className="mr-4 bg-black text-white px-4 py-2 rounded text-base whitespace-nowrap animate-pulse">
              Want to know a cool fact about{" "}
              <span className="text-[#b8ff29]">{product.name}</span>?
            </span>
          )}
          <Button
            className="rounded-full w-16 h-16 shadow-lg bg-black border-white border-2 text-[#b8ff29] hover:bg-[#1a1a1a] hover:scale-110 duration-300 transition-all"
            size="icon"
            onClick={toggleChatbot}
            aria-label="Open voice assistant"
          >
            <Mic className="w-10 h-10" />
          </Button>
        </div>
        <VoicebotUI
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      </div>
    </div>
  );
}
