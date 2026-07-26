import axios from "axios";

export async function sendChatMessage(message: string) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/chat`,
    {
      message,
    }
  );

  return response.data.reply;
}