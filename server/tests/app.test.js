import {describe,test,expect} from "vitest";
import request from "supertest";
import app from "../app.js";

describe("GET /",() => {
    test("should return server status message", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Server is running...");
    });
});