const { describe, it } = require("mocha");
const request = require("supertest");
const { server } = require("./api.js");
const assert = require("assert");

describe("Api suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await request(server).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/404", () => {
    it("should request an inexistente route and return HTTP status 404", async () => {
      const response = await request(server).get("/").expect(404);

      assert.deepStrictEqual(response.text, "404");
    });
  });

  describe("/login", () => {
    it("should login and return HTTP status 200", async () => {
      const response = await request(server)
        .post("/login")
        .send({
          username: "Carlos",
          password: 12345,
        })
        .expect(200);

      console.log(response.text)
      assert.deepStrictEqual(response.text, "Login as success");
    });
  });
});
