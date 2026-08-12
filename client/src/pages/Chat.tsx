import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";

import { useChat } from "../hooks/useChat";

export default function Chat() {
  const {
    message,
    setMessage,
    messages,
    isTyping,
    sendMessage,
    setMessages,
  } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="h-dvh overflow-hidden bg-[#2a2a2a] p-1.5 text-white sm:p-2">
      <div className="flex h-full min-h-0 gap-1.5 sm:gap-2">

        {/* Sidebar */}
        <Sidebar
          onNewChat={() => setMessages([])}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpen={() => setIsSidebarOpen(true)}
        />

        {/* Chat area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
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
    </main>
  );
}