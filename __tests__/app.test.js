import supertest from "supertest";
import createServer from "../utils/server.js";

const app = createServer();

describe("app", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
