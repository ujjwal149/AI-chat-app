
import { useRef, } from "react";

type MessageInputProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    onSend: () => void;
}

export default function MessageInput({
    message,
    setMessage,
    onSend
    }:MessageInputProps){

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };


  
  



    return(
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
            onClick={onSend}
            disabled={!message.trim()}
            className="bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-300 "
          >
            Send
          </button>
        
        </div>
    )
}