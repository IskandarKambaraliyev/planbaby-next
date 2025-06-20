export function addBaseUrlToImages(html: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables");
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const images = doc.querySelectorAll("img");

  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src) return;

    const isRelativeMedia = src.startsWith("/media/");
    const isAdminDomain = /^admin\.example\.com\/media\//.test(src);

    if (isRelativeMedia) {
      img.src = `${baseUrl}${src}`;
    } else if (isAdminDomain) {
      img.src = `${baseUrl}/${src}`;
    }
  });

  return doc.body.innerHTML;
}
