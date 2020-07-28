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
      zip: "49441",
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
      zip: "49442",
    };

    const expected = 201;

    const actual = await request(server).post("/api/concerns").send(post);

    expect(actual.status).toBe(expected);
  });

  it("returns a status of 200 on user posts by id", async () => {
    const expected = 200;

    const actual = await request(server).get(`/api/concerns/createdBy/0`);

    expect(actual.status).toBe(expected);
  });

  it("returns a status of 200 on get by zip", async () => {
    const expected = 200;

    const actual = await request(server).get(`/api/concerns/byZip/49441`);
    expect(actual.status).toBe(expected);
  });

  it("returns a list of records by zip", async () => {
    const expected = "object";

    const actual = await request(server).get(`/api/concerns/byZip/49441`);

    expect(typeof actual.body.data[0]).toBe(expected);
  });

  it("edits a concern", async () => {
    const expected = 201;

    const actual = await request(server)
      .put("/api/concerns/0")
      .send({ title: "UPDATED HAHA" });

    expect(actual.status).toBe(expected);
  });
});
