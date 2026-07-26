import { useEffect, useRef } from "react";

import type { Message } from "../../types/message";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

type ChatWindowProps = {
  messages: Message[];
  isTyping: boolean;
};

export default function ChatWindow({
  messages,
  isTyping,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll whenever a new message arrives
  // or the typing indicator appears/disappears.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 bg-[#1E1F22] rounded-xl border border-[#25262B] flex flex-col overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scroll-smooth flex justify-center mb-2">
        <div className="w-full max-w-2xl px-4 py-6 space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}