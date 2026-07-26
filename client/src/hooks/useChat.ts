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
      const reply = await sendChatMessage(message);

      const aiMessage: Message = {
        role: "assistant",
        content: reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
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