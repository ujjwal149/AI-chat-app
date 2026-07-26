import { useState, useRef, useEffect } from "react";


import type { Message } from "../types/message";
import { sendChatMessage } from "../services/chatApi";
import Sidebar from "./layout/Sidebar";

import MessageBubble from "./chat/MessageBubble";
import TypingIndicator from "./chat/TypingIndicator";
import MessageInput from "./chat/MessageInput";


export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);


    try {
      const reply = await sendChatMessage(message);

      const aiMessage: Message = {
        role: "assistant",
        content: reply,
      }
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

        {/* Sidebar Panel */}

        <Sidebar onNewChat={() => setMessages([])} />
        
        {/* Right Section */}
        <div className="flex flex-col flex-1 gap-2">

          {/* Chat Panel */}
          <div className="flex-1 bg-[#1E1F22] rounded-xl border border-[#25262B] flex flex-col overflow-hidden">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scroll-smooth flex mb-2 justify-center">
              <div className="w-full max-w-2xl px-4 py-6 space-y-4">

                {messages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    message={msg}
                  />
                ))}

                {/* Typing indicator */}
               { isTyping && <TypingIndicator/>
}
                <div ref={bottomRef}></div>
              </div>
            </div>
          </div>

          {/* Input Panel */}
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