import "dotenv/config";

import { summarizeConversation } from "./src/services/summaryService.js";

const messages = [
  {
    role: "user",
    content: "My name is Ujjwal.",
  },
  {
    role: "assistant",
    content: "Nice to meet you, Ujjwal.",
  },
  {
    role: "user",
    content: "I am learning C++ and currently studying pointers.",
  },
  {
    role: "assistant",
    content:
      "Pointers are variables that store the memory address of another variable.",
  },
  {
    role: "user",
    content:
      "I prefer simple explanations with practical examples.",
  },
];

const summary = await summarizeConversation(messages);

console.log("Generated summary:");
console.log(summary);