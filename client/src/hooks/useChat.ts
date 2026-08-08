import { useState } from "react";

import type { Message } from "../types/message";
import { sendChatMessage } from "../services/chatApi";

export function useChat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    setIsTyping(true);

    try {
  const assistantMessage: Message = {
    role: "assistant",
    content: "",
  };

  setMessages((prev) => [...prev, assistantMessage]);

  await sendChatMessage(message, (chunk) => {
    setMessages((prev) => {
      const updated = [...prev];

      const lastIndex = updated.length - 1;

      if (updated[lastIndex]?.role === "assistant") {
        updated[lastIndex] = {
            ...updated[lastIndex],
            content: updated[lastIndex].content + chunk,
          };
        }

    return updated;
  });
});
} catch (error) {
  console.error(error);
} finally {
  setTimeout(() => setIsTyping(false), 300);
}
  };

  return {
    message,
    setMessage,
    messages,
    isTyping,
    sendMessage,
    setMessages,
  };
}