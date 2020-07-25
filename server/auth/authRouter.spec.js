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

  it("creates a user and returns the created user", async () => {
    let expected = {
      username: `${Math.random()}`,
      password: "testing",
    };

    const res = await request(server).post("/api/auth/register").send(expected);

    expect(typeof res.body.data).toBe("object");
  });
});
