const request = require("supertest");

const server = require("../server");

//remove verifyToken before testing

describe("concerns", () => {
  it("can query all concerns and return an array", async () => {
    const expected = "object";

    const actual = await request(server).get("/api/concerns");

    expect(typeof actual.body.data).toBe(expected);
  });

  it("returns a status of 200", async () => {
    const expected = 200;
    const actual = await request(server).get("/api/concerns");
    expect(actual.status).toBe(expected);
  });

  it("can create a concern", async () => {
    const post = {
      title: "Example",
      description: "Example Desc",
      createdBy: 0,
    };

    const expected = "object";

    const actual = await request(server).post("/api/concerns").send(post);

    expect(typeof actual.body.data).toBe(expected);
  });

  it("returns a status of 201 on creation", async () => {
    const post = {
      title: "Example",
      description: "Example Desc",
      createdBy: 0,
    };

    const expected = 201;

    const actual = await request(server).post("/api/concerns").send(post);

    expect(actual.status).toBe(expected);
  });
});
