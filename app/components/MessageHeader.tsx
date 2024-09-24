import { Message } from "ai/react";
import moment from "moment";

const MessageHeader = ({
  message,
  className = "",
}: {
  message: Message;
  className?: string;
}) => {
  if (message.role === "assistant") {
    return (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-sm font-semibold text-white">Zapline</span>
        <span className="text-xs font-normal text-gray-400">
          {moment().calendar()}
        </span>
      </div>
    );
  }
};

export { MessageHeader };
