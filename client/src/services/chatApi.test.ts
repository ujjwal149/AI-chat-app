import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { sendChatMessage } from "./chatApi";

vi.mock("axios");

describe("sendChatMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns the AI reply", async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        reply: "Hello!",
      },
    });

    const reply = await sendChatMessage("Hi");

    expect(reply).toBe("Hello!");
  });

  test("calls axios.post with the correct URL and message", async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        reply: "Hello!",
      },
    });

    await sendChatMessage("Hi");

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/chat`,
      {
        message: "Hi",
      }
    );
  });

  test("throws an error when axios fails", async () => {
    const error = new Error("Network Error");

    vi.mocked(axios.post).mockRejectedValue(error);

    await expect(sendChatMessage("Hi")).rejects.toThrow("Network Error");
  });
});