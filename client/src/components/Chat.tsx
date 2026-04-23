import { useState, useRef, useEffect } from "react";
import axios from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        { message }
      );

      const aiMessage: Message = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsTyping(false), 300);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-[#2a2a2a] p-2 text-white">
      <div className="flex h-full gap-2">

        {/* Sidebar Panel */}
        <div className="w-1/5 bg-[#1E1F22] rounded-xl border border-[#25262B] p-3 flex flex-col items-center">
          <img
            src="/chatAI-logo.png"
            alt="ChatAI Logo"
            className="w-20 h-20 object-contain"
          />

          <button
            onClick={() => setMessages([])}
            className="bg-white text-black hover:bg-gray-300 p-2 w-full mt-6 rounded-2xl"
          >
            New Chat +
          </button>

          <div className="text-sm text-gray-400 mt-4">
            Chat history coming soon...
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 gap-2">

          {/* Chat Panel */}
          <div className="flex-1 bg-[#1E1F22] rounded-xl border border-[#25262B] flex flex-col overflow-hidden">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scroll-smooth flex mb-2 justify-center">
              <div className="w-full max-w-2xl px-4 py-6 space-y-4">

                {messages.map((msg, index) => (
                  <div key={index}>
                    {msg.role === "assistant" ? (
                      <div className="w-full px-4 py-3 rounded-lg bg-[#242424] text-gray-100 whitespace-pre-wrap wrap-break-words">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="max-w-xs px-4 py-2 rounded-lg bg-[#d9d9d9] text-black">
                          {msg.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="w-full px-4 py-3 rounded-lg bg-[#242424] text-gray-400 italic">
                    <span className="animate-pulse">AI is typing...</span>
                  </div>
                )}

                <div ref={bottomRef}></div>
              </div>
            </div>
          </div>

          {/* Input Panel */}
         <div className="bg-[#1E1F22] rounded-xl border border-[#25262B] p-3 flex items-end gap-2">

         
          <div className="flex-1 rounded-2xl border border-gray-600 bg-[#242424] overflow-hidden">
            
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 160) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-transparent px-4 py-2 
                         focus:outline-none resize-none 
                         overflow-y-auto"
            />
        
          </div>
        
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-300 "
          >
            Send
          </button>
        
        </div>
        </div>
      </div>
    </div>
  );
}