
import OpenAI from "openai"; 
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import {
  addMessage,
  getMemory,
  getSummary,
} from "./memoryStore.ts";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

type OnChunk = (chunk: string) => void;

export const getAIResponse = async (
  message: string,
  onChunk: OnChunk
): Promise<string> => {
  addMessage("user", message);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },

    ...(getSummary()
      ? [
          {
            role: "system",
            content: `Conversation summary:\n${getSummary()}`,
          } as ChatCompletionMessageParam,
        ]
      : []),

    ...getMemory(),
  ];

  const stream = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    stream: true,
    max_tokens: 1000,
    stream_options: {
      include_usage: true,
    },
  });

  let fullReply = "";

  for await (const chunk of stream) {
    const content =
      chunk.choices?.[0]?.delta?.content || "";

    if (content) {
      fullReply += content;
      onChunk(content);
    }

    /*
    if (chunk.usage) {
      console.log("Streaming usage:");
      console.log(chunk.usage);
    }
    */
  }

  addMessage("assistant", fullReply);

  return fullReply;
};
