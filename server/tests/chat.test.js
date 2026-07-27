import {describe, test, expect, vi} from "vitest";
import request from "supertest";
import app from "../app.js";

import * as aiService from "../services/aiServices.js";


vi.mock("../services/aiServices.js");

describe("POST /api/chat", () => {
  test("should return AI reply", async () => {
    vi.mocked(aiService.getAIResponse).mockResolvedValue(
      "Hello from mock AI!"
    );

    const response = await request(app)
      .post("/api/chat")
      .send({
        message: "Hello",
      });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      reply: "Hello from mock AI!",
    });
  });
});

test("should return 500 when AI service fails", async () => {
  vi.mocked(aiService.getAIResponse).mockRejectedValue(
    new Error("Groq failed")
  );

  const response = await request(app)
    .post("/api/chat")
    .send({
      message: "Hello",
    });

  expect(response.status).toBe(500);

  expect(response.body).toEqual({
    error: "AI Error",
  });
});