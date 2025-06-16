export default function getYoutubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Handle standard format: youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      return parsedUrl.searchParams.get("v");
    }

    // Handle short format: youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // remove leading '/'
    }

    // Handle embed format: youtube.com/embed/VIDEO_ID
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname.startsWith("/embed/")
    ) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    return null;
  } catch {
    return null;
  }
}
