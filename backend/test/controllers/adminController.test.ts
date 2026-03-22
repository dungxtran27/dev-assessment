import request from "supertest";
import app from "../../src/index";

describe("Admin Controller", () => {
  it("should return 400 for invalid register payload", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ teacher: "not-an-email", students: [] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Validation errors/);
  });
});
