import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Conversation from "./Conversation";
import { MicrophoneContextProvider } from "../context/Microphone";

interface VoicebotUIProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoicebotUI: React.FC<VoicebotUIProps> = ({ isOpen, onClose }) => {
  return (
      <div
        className={`rounded-lg fixed bottom-1 right-1 w-full sm:w-96 md:w-[500px] lg:w-[500px] h-[600px] bg-black text-white transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Voice Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-1 h-[calc(100%-64px)] overflow-y-auto">
          <Conversation isOpen={isOpen} />
        </div>
      </div>
  );
};

export default VoicebotUI;
