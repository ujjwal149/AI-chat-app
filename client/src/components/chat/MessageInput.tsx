import { useEffect, useRef } from "react";

type MessageInputProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
};

export default function MessageInput({
  message,
  setMessage,
  onSend,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Reset textarea height when message is cleared
  useEffect(() => {
    if (!message && textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  }, [message]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (message.trim()) {
        onSend();
      }
    }
  };

  const handleInput = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const textarea = e.currentTarget;

   
    textarea.style.height = "40px";

  
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      160
    )}px`;
  };

  return (
    <div
      className="
        flex
        items-end
        gap-2
        rounded-xl
        border
        border-[#25262B]
        bg-[#181818]
        p-3
      "
    >
      {/* Textarea container */}
      <div
        className="
          flex-1
          overflow-hidden
          rounded-2xl
          border
          border-gray-600
          bg-[#242424]
        "
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="
            block
            h-10
            max-h-40
            w-full
            resize-none
            overflow-y-auto
            bg-transparent
            px-4
            py-2
            text-sm
            leading-6
            text-white
            placeholder:text-gray-500
            focus:outline-none
          "
        />
      </div>

      {/* Send button */}
      <button
        type="button"
        onClick={onSend}
        disabled={!message.trim()}
        className="
          h-10
          shrink-0
          rounded-2xl
          bg-white
          px-4
          text-sm
          font-medium
          text-black
          transition
          hover:bg-gray-300
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Send
      </button>
    </div>
  );
}