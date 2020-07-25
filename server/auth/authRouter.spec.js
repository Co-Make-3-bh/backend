const request = require("supertest");

const server = require("../server");

const nodemailer = require("nodemailer");

let body = {
  email: `EMAIL@EMAIL.COM${Math.random()}`,
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
      email: `EMAIL@EMAIL.COM${Math.random()}`,
      username: `${Math.random()}`,
      password: "testing",
    };

    const res = await request(server).post("/api/auth/register").send(expected);

    expect(typeof res.body.data).toBe("object");
  });
});

describe("auth - login", () => {
  it("should return a token", async () => {
    const userLogin = {
      email: "legendarycomedy1@gmail.com",
      password: "example",
    };

    const expected = "string";

    const actual = await request(server)
      .post("/api/auth/login")
      .send(userLogin);

    expect(typeof actual.body.token).toBe(expected);
  });

  it("should return 400 if password is incorrect with error message", async () => {
    const userLogin = {
      email: "legendarycomedy1@gmail.com",
      password: "examplewrong",
    };

    const expectedStatus = 400;
    const expectedMessage = "Email Or Password is Incorrect";

    const actual = await request(server)
      .post("/api/auth/login")
      .send(userLogin);

    expect(actual.body.error).toBe(expectedMessage);
    expect(actual.status).toBe(expectedStatus);
  });
});
