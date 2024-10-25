import { Button } from "@/components/ui/button";
import { X, Mic } from "lucide-react";
import Conversation from "./Conversation";
import { MicrophoneContextProvider } from "../context/Microphone";

interface VoicebotUIProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoicebotUI: React.FC<VoicebotUIProps> = ({ isOpen, onClose }) => {
  return (
    <MicrophoneContextProvider>
      <div
        className={`fixed bottom-4 right-4 w-full sm:w-96 md:w-[450px] lg:w-[500px] h-[600px] bg-black text-white transition-all duration-300 ease-in-out rounded-2xl shadow-2xl overflow-hidden ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gradient-to-r ">
            <div className="flex-1 flex justify-center items-center space-x-2">
              <Mic className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Voice Assistant</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <Conversation isOpen={isOpen} />
          </div>
        </div>
      </div>
    </MicrophoneContextProvider>
  );
};

export default VoicebotUI;
