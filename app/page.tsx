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
import { WelcomeDialog } from "./components/landing/WelcomeDialog";
import { storeData } from "./lib/products";

export default function Component() {
  const [isClient, setIsClient] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = () => {
    setCartItems((prevItems) => prevItems + 1);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
    setShowLabel(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <WelcomeDialog />
      <Header storeData={storeData} cartItems={cartItems} />
      <main className="flex-grow">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="w-1/2 pr-8">
              <h1 className="text-5xl font-bold mb-4">
                Beauty Essentials for Radiant, Healthy Skin.
              </h1>
              <p className="text-xl mb-8">
                Discover skincare that loves your skin. Beauty Chemist – your
                go-to for clean, effective beauty.
              </p>
              <Button className="bg-black text-[#b8ff29] hover:bg-[#2e2e2e] transition-colors">
                Shop Now
              </Button>
            </div>
            <div className="w-1/2">
              <Image
                src="/hero-image2.png"
                alt="Beauty Chemist Hero Image"
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
      <div className="fixed bottom-4 right-4 flex flex-col items-center">
        {showLabel && (
          <span className="mb-2 bg-blue-500 text-white px-4 py-2 rounded text-base whitespace-nowrap animate-bounce">
            Chat with us here!
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
  );
}
