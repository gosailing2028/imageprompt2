import { env } from "~/env.mjs";

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL || "https://image-prompt-auth-proxy.vercel.app";
  return `${baseUrl}${path}`;
}
