import {
  isValidEmail,
  extractMentionedEmails,
} from "../../src/utils/validation";

describe("Validation Utils", () => {
  it("should validate emails correctly", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("bad")).toBe(false);
  });

  it("should extract mentioned emails", () => {
    const text = "Hello @foo@bar.com and @baz@qux.com";
    expect(extractMentionedEmails(text)).toEqual([
      "foo@bar.com",
      "baz@qux.com",
    ]);
  });
});
