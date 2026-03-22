// import { describe, it } from "node:test";
import { validateRegister } from "../../src/middlewares/validation";
import { Request, Response, NextFunction } from "express";

describe("Validation Middleware", () => {
  it("should throw error for invalid register payload", () => {
    const req = { body: { teacher: "bad", students: [] } } as Request;
    const res = {} as Response;
    const next = jest.fn();
    expect(() => validateRegister(req, res, next)).toThrow();
  });
});
