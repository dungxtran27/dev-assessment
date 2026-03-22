
// ^ → Start of the string.
// [^\s@]+ → One or more characters that are not whitespace (\s) and not @.

// @ →  @ symbol.

// [^\s@]+ → same above

// \. → A dot.

// [^\s@]+ → One or more characters that are not whitespace and not @.

// $ → End of the string.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function extractMentionedEmails(notification: string): string[] {
  const matches = notification.match(/@([^\s@]+@[^\s@]+\.[^\s@]+)/g) ?? [];
  return matches.map((token) => token.slice(1).toLowerCase());
}
