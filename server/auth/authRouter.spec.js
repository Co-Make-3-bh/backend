const request = require("supertest");

const server = require("../server");

const uuid = require("uuid");

let body = {
  username: `${Math.random()}`,
  password: "testing",
};

describe("auth - register", () => {
  it("creates a user", async () => {
    const expected = 201;

    const res = await request(server).post("/api/auth/register").send(body);

    expect(res.status).toBe(expected);
  });

  it("creates a user and returns the created user");
});
