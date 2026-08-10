import OpenAI from "openai";

import type { MemoryMessage } from "./memoryStore.ts";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const summarizeConversation = async (
  messages: MemoryMessage[]
): Promise<string> => {
  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",

    messages: [
      {
        role: "system",
        content: `Summarize the conversation concisely.
        Preserve important facts, user preferences,
        decisions, goals, and technical context.
        Do not add information that was not discussed.`,
      },
      {
        role: "user",
        content: messages
          .map(
            (message) =>
              `${message.role}: ${message.content}`
          )
          .join("\n"),
      },
    ],

    max_tokens: 500,
  });

  return response?.choices?.[0]?.message?.content || "";
};