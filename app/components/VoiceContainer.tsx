import { useState, useEffect, useMemo, useRef } from "react";
import { Message } from "ai/react";
import { useAudioStore } from "../context/AudioStore";
import { useNowPlaying } from "react-nowplaying";

interface AudioSpectrogramProps {
  message: Message;
}

const AudioSpectrogram = ({ message }: AudioSpectrogramProps) => {
  const { audioStore } = useAudioStore();
  const { player, uid } = useNowPlaying();
  const [isPlaying, setIsPlaying] = useState(false);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    setIsPlaying(uid === message.id);
  }, [uid, message.id]);

  useEffect(() => {
    const found = audioStore.find((item) => item.id === message.id);

    const setupAudio = async () => {
      if (found && isPlaying && player) {
        try {
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
              (window as any).webkitAudioContext)();
          }

          if (!analyzerRef.current && !sourceRef.current) {
            const analyzer = audioContextRef.current.createAnalyser();
            analyzer.fftSize = 64;
            analyzer.smoothingTimeConstant = 0.8;
            analyzerRef.current = analyzer;

            const source =
              audioContextRef.current.createMediaElementSource(player);
            sourceRef.current = source;
            source.connect(analyzer);
            analyzer.connect(audioContextRef.current.destination);
          }

          const updateSpectrum = () => {
            if (!analyzerRef.current || !isPlaying) return;

            const dataArray = new Uint8Array(
              analyzerRef.current.frequencyBinCount
            );
            analyzerRef.current.getByteFrequencyData(dataArray);

            const frequencyBands = [
              [0, 3], // Low frequencies
              [4, 7], // Low-mid frequencies
              [8, 11], // Mid frequencies
              [12, 15], // High frequencies
            ];

            barRefs.current.forEach((bar, index) => {
              if (bar) {
                const [start, end] = frequencyBands[index];
                const bandValues = dataArray.slice(start, end + 1);
                const average =
                  bandValues.reduce((a, b) => a + b, 0) / bandValues.length;
                const scaleValue = 0.5 + (average / 255) * 0.8;

                bar.style.transform = `scaleY(${scaleValue})`;
                bar.style.transition = "transform 0.1s ease-out";
              }
            });

            animationFrameRef.current = requestAnimationFrame(updateSpectrum);
          };

          updateSpectrum();
        } catch (error) {
          console.error("Audio setup error:", error);
        }
      } else {
        // Reset bars to default state
        barRefs.current.forEach((bar) => {
          if (bar) {
            bar.style.transform = "scaleY(0.7)";
          }
        });
      }
    };

    setupAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
        analyzerRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [audioStore, message.id, isPlaying, player]);

  const bars = [
    { baseHeight: "h-16", width: "w-6" },
    { baseHeight: "h-20", width: "w-6" },
    { baseHeight: "h-16", width: "w-6" },
    { baseHeight: "h-20", width: "w-6" },
  ];

  return (
    <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 gap-3 px-4">
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`
            relative ${bar.width} bg-white/10 rounded-full
            transform origin-bottom transition-all
            ${bar.baseHeight}
            ${isPlaying ? "opacity-100" : "opacity-60"}
          `}
        >
          <div
            ref={(el: HTMLDivElement | null) => {
              barRefs.current[index] = el;
            }}
            className={`
    absolute bottom-0 w-full rounded-full bg-white
    transform transition-all ease-in-out
  `}
            style={{
              height: "100%",
              transform: "scaleY(0.5)", // Start at 50%
            }}
          />
        </div>
      ))}
    </div>
  );
};

interface VoicebotContainerProps {
  messages: Message[];
  currentUtterance?: string;
  controls: React.ReactNode;
  messageMarkerRef: React.RefObject<HTMLDivElement>;
}

const VoicebotContainer = ({
  messages,
  currentUtterance,
  controls,
  messageMarkerRef,
}: VoicebotContainerProps) => {
  const latestMessage = messages[messages.length - 1];
  const { audioStore } = useAudioStore();

  const hasAudio =
    latestMessage && audioStore.some((item) => item.id === latestMessage.id);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-lg">
          {latestMessage?.role === "assistant" && hasAudio && (
            <div className="flex justify-center">
              <AudioSpectrogram message={latestMessage} />
            </div>
          )}
          {currentUtterance && (
            <div className="text-center px-4 mt-8">
              <p className="text-white/60 text-sm tracking-wide">
                {currentUtterance}
              </p>
            </div>
          )}
        </div>
        <div className="h-16 w-full" ref={messageMarkerRef} />
      </div>
      <div className="w-full border-t border-white/10">{controls}</div>
    </div>
  );
};

export default VoicebotContainer;
