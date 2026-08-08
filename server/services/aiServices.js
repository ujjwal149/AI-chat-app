import OpenAI from "openai";
import { addMessage, getMemory } from "./memoryStore.js";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const getAIResponse = async (message, onChunk) => {
  addMessage("user", message);

  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    ...getMemory(),
  ];

  const stream = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    stream: true,
  });

  let fullReply = "";

  for await (const chunk of stream) {
    const content = chunk.choices?.[0]?.delta?.content || "";

    if (content) {
      fullReply += content;

      onChunk(content);
    }
  }

  addMessage("assistant", fullReply);

  return fullReply;
};