import OpenAI from "openai";
import { addMessage, getMemory } from "./memoryStore.js";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const getAIResponse = async (message) => {
  // 1. Add user message to memory
  addMessage("user", message);

  // 2. Get full conversation history
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    ...getMemory(),
  ];

  // 3. Send to AI
  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });

  const reply =
    response?.choices?.[0]?.message?.content || "No response";

  // 4. Store AI reply
  addMessage("assistant", reply);

  return reply;
};