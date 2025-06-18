const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

/**
 * Takes an image URL (starting with BASE_URL or "/") and returns proxy API path.
 * If the image is local (e.g., "/images/img.webp"), it returns a proxy with `local=true`.
 */
export function proxyImage(imageUrl: string): string {
  if (!BASE_URL || !ORIGIN_URL) {
    throw new Error("Environment variables are not defined");
  }

  const isRelative = imageUrl.startsWith("/");

  // Handle local public images
  if (isRelative) {
    return `/api/proxy/image?url=${encodeURIComponent(imageUrl)}&local=true`;
  }

  const parsedUrl = new URL(imageUrl);
  const base = new URL(BASE_URL);

  if (parsedUrl.origin !== base.origin) {
    throw new Error("Invalid image host. Only BASE_URL is allowed.");
  }

  return `/api/proxy/image?url=${encodeURIComponent(
    parsedUrl.pathname + parsedUrl.search
  )}`;
}
