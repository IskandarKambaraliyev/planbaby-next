export default function htmlToPlainText(html: string, maxLength = 160): string {
  if (!html) return "";

  // 1. Strip tags
  const stripped = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, " "); // remove tags, keep spacing

  // 2. Decode HTML entities (basic ones)
  const decoded = stripped
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // 3. Clean up whitespace
  const cleaned = decoded
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();

  // 4. Truncate to `maxLength` without cutting words
  if (cleaned.length <= maxLength) return cleaned;

  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace) + "…";
}
