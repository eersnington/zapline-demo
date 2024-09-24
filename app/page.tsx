"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicebotUI from "./components/VoicebotUI";
import Header from "./components/landing/Header";
import Footer from "./components/landing/Footer";
import CTASection from "./components/landing/CTA";
import ProductionsSection from "./components/landing/Products";

const storeData = {
  storeName: "Bacca Bucci",
  products: [
    {
      id: 1,
      name: "Midnight Black Tee",
      price: 24.99,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Shadow Slim Jeans",
      price: 59.99,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Raven Leather Jacket",
      price: 149.99,
      image: "/placeholder.svg",
    },
    { id: 4, name: "Twilight Dress", price: 49.99, image: "/placeholder.svg" },
    { id: 5, name: "Onyx Sneakers", price: 79.99, image: "/placeholder.svg" },
    { id: 6, name: "Ebony Watch", price: 129.99, image: "/placeholder.svg" },
  ],
};

export default function Component() {
  const [isClient, setIsClient] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = () => {
    setCartItems((prevItems) => prevItems + 1);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header storeData={storeData} cartItems={cartItems} />
      <main className="flex-grow">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="w-1/2 pr-8">
              <h1 className="text-5xl font-bold mb-4">
                Elevate Your Style with Bacca Bucci
              </h1>
              <p className="text-xl mb-8">
                Discover our exclusive collection of trendsetting fashion
                pieces.
              </p>
              <Button className="bg-black text-[#b8ff29] hover:bg-[#2e2e2e] transition-colors">
                Shop Now
              </Button>
            </div>
            <div className="w-1/2">
              <Image
                src="/hero-image.jpg"
                alt="Bacca Bucci Hero"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        <ProductionsSection
          storeData={storeData}
          cartItems={cartItems}
          addToCart={addToCart}
        />

        <CTASection />
      </main>

      <Footer />
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg bg-black border-white border-2 text-[#b8ff29] hover:bg-[#1a1a1a] hover:scale-110 duration-300 transition-all"
        size="icon"
        onClick={toggleChatbot}
      >
        <Mic className="w-6 h-6" />
        <span className="sr-only">Open voice assistant</span>
      </Button>
      <VoicebotUI
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
}
