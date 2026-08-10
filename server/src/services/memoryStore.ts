import { encodingForModel } from "js-tiktoken";

export type MessageRole = "user" | "assistant";

export type MemoryMessage = {
  role: MessageRole;
  content: string;
};

const memory: MemoryMessage[] = [];

let summary: string = "";

const MAX_CONTEXT_TOKENS = 3000;

const encoder = encodingForModel("gpt-4o");

export const addMessage = (
  role: MessageRole,
  content: string
): void => {
  memory.push({
    role,
    content,
  });
};

export const getMemory = (): MemoryMessage[] => {
  const selectedMessages: MemoryMessage[] = [];
  let totalTokens = 0;

  for (let i = memory.length - 1; i >= 0; i--) {
    const message = memory[i];

    const messageTokens = encoder.encode(message.content).length;

    if (totalTokens + messageTokens > MAX_CONTEXT_TOKENS) {
      break;
    }

    selectedMessages.unshift(message);
    totalTokens += messageTokens;
  }

  return selectedMessages;
};

export const getSummary = (): string => {
  return summary;
};

export const setSummary = (newSummary: string): void => {
  summary = newSummary;
};

export const removeOldMessages = (count: number): void => {
  memory.splice(0, count);
};

export const clearMemory = (): void => {
  memory.length = 0;
  summary = "";
};