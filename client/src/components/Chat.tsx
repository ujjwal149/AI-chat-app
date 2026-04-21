import { useState } from "react";
import axios from "axios";


type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post(
        "https://ai-chat-app-hsdn.onrender.com/api/chat",
        { message }
      );

      const aiMessage: Message = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages(prev => [...prev, aiMessage]);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-[#242424]  text-white">
 
      {/* Sidebar */}
      <div className="w-1/5 bg-[#171717] border-r border-gray-700 flex flex-col items-center  p-3">
        <img 
          src="/chatAI-logo.png" 
          alt="ChatAI Logo" 
          className="w-21 h-21 object-contain"
        />
        

        <button
          className="bg-[#ffffff] text-gray-900 hover:bg-[#d9d9d9] p-2 w-full mt-7 rounded-3xl mb-3 cursor-pointer"
          onClick={() => setMessages([])}
        >
          New Chat +
        </button>

        <div className="text-sm text-gray-400 ">
          Chat history coming soon...
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-full ">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto flex justify-center">
          <div className="w-full max-w-2xl px-4 py-6 space-y-4">
        
            {messages.map((msg, index) => (
              <div key={index}>
                
                {msg.role === "assistant" ? (
                  // AI message 
                  <div className="w-full px-4 py-3 rounded-lg bg-[#171717] text-gray-100 leading-relaxed whitespace-pre-wrap wrap-break-wordbreak-words">
                    {msg.content}
                  </div>
                ) : (
                  // User message 
                  <div className="flex justify-end">
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-[#d9d9d9] text-black">
                      {msg.content}
                    </div>
                  </div>
                )}
        
              </div>
            ))}
        
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700  flex justify-end-safe gap-2">
          <input
            type="text"
            className="flex-1/3 justify-center bg-gray-800   border border-gray-600 rounded-3xl px-4 py-2 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />

          <button
            onClick={sendMessage}
            className="bg-white text-black px-4 py-2 rounded-4xl hover:bg-[#d9d9d9] cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

   