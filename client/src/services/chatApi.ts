import axios from "axios";

export async function sendChatMessage(message: string) {
  const response = await axios.post(
    "/api/chat",
    {
      message,
    }
  );

  return response.data.reply;
}