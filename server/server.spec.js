const request = require("supertest");
const server = require("./server");

describe("default route", () => {
  it("returns a message of ONLINE", async () => {
    const expected = "ONLINE";

    const actual = await request(server).get("/api");

    expect(actual.body.api).toBe(expected);
  });

  it("should return a status of 200", async () => {
    const expected = 200;

    const actual = await request(server).get("/api");

    expect(actual.status).toBe(expected);
  });
});
