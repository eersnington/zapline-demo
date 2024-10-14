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

const storeData = {
  storeName: "Oracura",
  products: [
    {
      id: 1,
      name: "OC150 Smart Water Flosser",
      description:
        "Smart Water Flosser OC150 | Rechargeable | Multiple Operation Modes | 360 Degree Rotary Nozzle",
      price: 1749,
      image: "/oracura/OC150.png",
    },
    {
      id: 2,
      name: "OC200 Smart Water Flosser",
      description:
        "Smart PLUS Water Flosser OC200 | Rechargeable | Multiple Operation Modes | 360 Degree Rotary Nozzle ",
      price: 1949,
      image: "/oracura/OC200.png",
    },
    // {
    //   id: 1,
    //   name: "Aerosync Snap",
    //   description:
    //     "Magsag Wireless Powerbank for iPhones. 10000mAh Magsafe Powerbank | 15W Wireless, 22.5W Wired Output | Qi Charging, LED Indicators",
    //   price: 1599,
    //   image: "/ambrane/aerosync.png",
    // },
    // {
    //   id: 2,
    //   name: "100W C to C Cable",
    //   description: "C to C Data and Charging Cable",
    //   price: 399,
    //   image: "/ambrane/c2c.png",
    // },
    // {
    //   id: 3,
    //   name: "Powerlit 30",
    //   description:
    //     "Small/Mini 33w Fast Charging Pocket Power Bank | 33W BoostedSpeed™ | 10000mah Battery Capacity",
    //   price: 1999,
    //   image: "/ambrane/powerlit30.png",
    // },
    // {
    //   id: 4,
    //   name: "Powerlit Ultra",
    //   description:
    //     "25000mAh Power Bank | 33W BoostedSpeed™ | MacBook & Type-C Laptop Charging | Polymer Battery",
    //   price: 4999,
    //   image: "/ambrane/powerlitultra.png",
    // },
    // {
    //   id: 5,
    //   name: "RAAP G65",
    //   price: 2199,
    //   description:
    //     "Adapter | MacBook & Type C Laptop Charging | 65W GanMax Technology, Triple Ports | Quick Charge 3.0, Power Delivery Technology",
    //   image: "/ambrane/raapg65.png",
    // },
    // {
    //   id: 6,
    //   name: "Charge 30",
    //   description:
    //     "Dual Charger USB C and USB A | 30W BoostedSpeed™ | Quick Charge & Power Delivery | Charge Multiple Devices",
    //   price: 1099,
    //   image: "/ambrane/charge30.png",
    // },
  ],
};

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
                {/* Welcome to Ambrane India */}
                Welcome to Oracura India - Indi&apos; Leading Oral Care Brand
              </h1>
              <p className="text-xl mb-8">
                {/* Ambrane India - Shop Power bank, Cables, and Chargers. */}
                Shop Smart Water Flossers, Toothbrushes, and Oral Care Products.
              </p>
              <Button className="bg-black text-[#b8ff29] hover:bg-[#2e2e2e] transition-colors">
                Shop Now
              </Button>
            </div>
            <div className="w-1/2">
              <Image
                src="/oracura/OC150.png"
                alt="Ambrane Hero"
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
            Talk to me here!
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
