import type { Request, Response } from "express";
import { getAIResponse } from "../services/aiServices.ts";

type ChatRequestBody = {
  message: string;
};

export const handleChat = async (
  req: Request<{}, {}, ChatRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    await getAIResponse(message, (chunk: string) => {
      res.write(chunk);
    });

    res.end();
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({ error: "AI Error" });
    } else {
      res.end();
    }
  }
};