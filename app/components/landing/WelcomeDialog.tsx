import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Headphones,
  MessageSquare,
  Sparkle,
  ShoppingCart,
} from "lucide-react";

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-black max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-[#b8ff29] mb-4 flex items-center gap-2">
            Welcome to Zapline AI Demo Store
          </DialogTitle>
          <DialogDescription className="text-white text-lg space-y-6">
            <p className="flex items-center gap-2">
              <span>
                This demo showcases Zapline&apos;s Alexa-like voicebot for
                Shopify stores.
              </span>
            </p>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="font-semibold mb-2">
                In this demo, you can interact with the voicebot to:
              </p>
              <ul className="space-y-2">
                {[
                  "Ask about products",
                  "Get recommendations",
                  "Inquire about your order",
                  "Request a replacement, cancellation, or return",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Sparkle className="w-5 h-5 text-[#b8ff29]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-[#b8ff29] flex-shrink-0" />
              <span>
                {/* Write a messge under here saying that there's an example order to which you can inquire the status of cancel and so on.*/}
                There&apos;s an example order to which you can inquire the
                status of, cancel, or return. Try asking{" "}
                <span className="font-light italic">
                  &quot;What&apos;s the status of my order?&quot;
                </span>
              </span>
            </p>
          </DialogDescription>
        </DialogHeader>
        <Button
          className="bg-[#b8ff29] text-black hover:bg-[#ace140] transition-colors mt-6 w-full text-lg font-semibold"
          onClick={() => setIsOpen(false)}
        >
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
