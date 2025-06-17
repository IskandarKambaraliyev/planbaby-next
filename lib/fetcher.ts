export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface FetcherOptions<T = unknown> {
  method?: HttpMethod;
  body?: T;
  headers?: HeadersInit;
  cache?: RequestCache; // e.g. "force-cache", "no-store"
  next?: NextFetchRequestConfig; // e.g. { revalidate: 60 }
}

export class FetchError extends Error {
  constructor(
    public message: string,
    public response: Response,
    public data: unknown,
    public status: number
  ) {
    super(message);
    this.name = "FetchError";
  }
}

export async function fetcher<TResponse, TBody = unknown>(
  path: string,
  locale: string,
  options: FetcherOptions<TBody> = {}
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers,
    cache = "force-cache",
    next = { revalidate: 300 },
  } = options;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

  const res = await fetch(`${baseUrl}/${locale}/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(cache && { cache }),
    ...(next && { next }),
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new FetchError("Fetch failed", res, data, res.status);
  }

  return data as TResponse;
}
