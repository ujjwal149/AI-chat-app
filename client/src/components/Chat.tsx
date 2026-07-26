
import Sidebar from "./layout/Sidebar";
import ChatWindow from "./chat/ChatWindow";
import MessageInput from "./chat/MessageInput";

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