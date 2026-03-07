const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function extractMentionedEmails(notification: string): string[] {
  const matches = notification.match(/@([^\s@]+@[^\s@]+\.[^\s@]+)/g) ?? [];
  return matches.map((token) => token.slice(1).toLowerCase());
}
