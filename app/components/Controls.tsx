import { Message } from "ai/react";
import { Tooltip } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

import { Download } from "./Download";
import { MicrophoneIcon } from "./icons/MicrophoneIcon";
import { SendIcon } from "./icons/SendIcon";
import { Settings } from "./Settings";
import { useMicrophone } from "../context/Microphone";
import { useNowPlaying } from "react-nowplaying";
import { useSubmit } from "../lib/hooks/useSubmit";

// Better to use library, a lot of complexity is involved
// in building the resizable input
import TextareaAutosize from "react-textarea-autosize";
import { KeyboardIcon } from "lucide-react";

export const Controls = ({
  input,
  handleSubmit,
  handleInputChange,
  messages,
}: {
  input: string;
  handleSubmit: any;
  handleInputChange: any;
  messages: Message[];
}) => {
  const { startMicrophone, stopMicrophone, microphoneOpen } = useMicrophone();
  const { formRef, onKeyDown } = useSubmit();

  const microphoneToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (microphoneOpen) {
        stopMicrophone();
      } else {
        startMicrophone();
      }
    },
    [microphoneOpen, startMicrophone, stopMicrophone]
  );

  const { stop: stopAudio } = useNowPlaying();

  const submitter = useCallback(
    (e: any) => {
      handleSubmit(e);
      stopAudio();
      e.target.value = "";
      handleInputChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stopAudio, handleSubmit]
  );

  const [showTextarea, setShowTextarea] = useState(false);

  return (
    <form onSubmit={submitter} ref={formRef}>
      <div className="relative p-4 flex flex-col space-y-4">
        {/* Button container */}
        <div className="flex items-center justify-between w-full">
          {/* Centered microphone button */}
          <div className="flex items-center justify-center w-full">
            <Tooltip showArrow content="Toggle microphone on/off.">
              <button
                onClick={(e: any) => microphoneToggle(e)}
                className={`rounded-full w-16 md:w-20 sm:w-24 py-2 md:py-4 px-2 h-full sm:px-8 font-bold bg-[#101014] text-light-900 text-sm sm:text-base flex items-center justify-center group`}
              >
                {microphoneOpen && (
                  <div className="w-auto items-center justify-center hidden sm:flex absolute shrink-0">
                    <MicrophoneIcon
                      micOpen={microphoneOpen}
                      className="h-5 md:h-6 animate-ping"
                    />
                  </div>
                )}
                <div className="w-auto flex items-center justify-center shrink-0">
                  <MicrophoneIcon
                    micOpen={microphoneOpen}
                    className="h-5 md:h-6"
                  />
                </div>
              </button>
            </Tooltip>
          </div>

          {/* Keyboard icon to toggle textarea */}
          <div className="flex items-center justify-end">
            <Tooltip showArrow content="Type a message.">
              <button
                onClick={() => setShowTextarea(!showTextarea)}
                className="bg-[#101014] p-2 rounded-full"
              >
                <KeyboardIcon className="w-6 h-6 text-light-900" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Conditionally render textarea and submit button on the same row */}
        {showTextarea && (
          <div className="w-full bg-[#101014] rounded-lg p-2 flex items-center space-x-2">
            {/* Textarea */}
            <TextareaAutosize
              onKeyDown={onKeyDown}
              rows={1}
              spellCheck={false}
              autoCorrect="off"
              className="py-2 px-4 w-full resize-none bg-[#101014] text-light-900 border-0 text-sm sm:text-base outline-none focus:ring-0"
              placeholder="Type here to send a message..."
              value={input}
              onChange={handleInputChange}
            />
            {/* Submit Button */}
            <Tooltip showArrow content="Send a message.">
              <button
                type="submit"
                className="w-16 md:w-24 py-2 md:py-4 px-2 rounded-full font-bold bg-[#101014] text-light-900 text-sm sm:text-base flex items-center justify-center"
              >
                <SendIcon className="w-5 md:w-6" />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </form>
  );
};
