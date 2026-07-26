import { useState } from "react";

import type { Message } from "../types/message";
import { sendChatMessage } from "../services/chatApi";

import Sidebar from "./layout/Sidebar";
import ChatWindow from "./chat/ChatWindow";
import MessageInput from "./chat/MessageInput";

export default function Chat() {
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

  return (
    <div className="h-screen bg-[#2a2a2a] p-2 text-white">
      <div className="flex h-full gap-2">
        <Sidebar onNewChat={() => setMessages([])} />

        <div className="flex flex-col flex-1 gap-2">
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
          />

          <MessageInput
            message={message}
            setMessage={setMessage}
            onSend={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}