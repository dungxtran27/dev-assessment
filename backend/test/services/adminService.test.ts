import adminService from "../../src/services/adminService";

describe("Admin Service", () => {
  it("should throw error for invalid teacher email in registerStudents", async () => {
    await expect(
      adminService.registerStudents("bad", ["student@example.com"]),
    ).rejects.toThrow();
  });
});
