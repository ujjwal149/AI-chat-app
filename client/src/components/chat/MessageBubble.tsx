import type { Message } from "../../types/message";

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  if (message.role === "assistant") {
    return (
      <div className="w-full px-4 py-3 rounded-lg bg-[#242424] text-gray-100 whitespace-pre-wrap break-words">
        {message.content}
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-xs px-4 py-2 rounded-lg bg-[#d9d9d9] text-black">
        {message.content}
      </div>
    </div>
  );
}