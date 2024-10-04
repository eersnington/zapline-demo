"use client";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-black text-white py-16 flex flex-col justify-center items-center min-h-screen rounded-[48px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4">
          Elevate Your CX with{" "}
          <span className="text-[#b8ff29]">Zapline AI</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 mt-8">
          Automate 60% of customer queries and provide 24/7 support with our
          Alexa-like voicebot for Shopify stores.
        </p>
        <Button
          className="rounded-full text-xl p-6 bg-[#b8ff29] text-black hover:bg-[#a3e625] transition-colors"
          onClick={() => window.open("https://zapline.vercel.app", "_blank")}
        >
          Learn More About Zapline AI
        </Button>
      </div>
    </section>
  );
}
