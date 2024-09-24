import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spinner } from "@nextui-org/react";
import { useAudioStore } from "../context/AudioStore";
import { useMemo } from "react";
import { Message } from "ai/react";

export const TextContentAI = ({
  text,
  message: { id },
}: {
  text: string;
  message: Message;
}) => {
  const { audioStore } = useAudioStore();

  const found = useMemo(() => {
    return audioStore.find((item) => item.id === id);
  }, [audioStore, id]);

  if (!found) {
    return <Spinner size={`sm`} />;
  }

  if (found) {
    return (
      <Markdown
        components={{
          code({ node, className, children, style, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={atomDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {text}
      </Markdown>
    );
  }

  return <></>;
};

// [current time]
// [current day]
// [current year]
