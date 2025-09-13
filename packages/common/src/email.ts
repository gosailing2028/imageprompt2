import { Resend } from "resend";

import { env } from "./env.mjs";

// Only initialize Resend if API key is configured
// Use a dummy key for build time if not configured
export const resend = new Resend(env.RESEND_API_KEY || "re_placeholder_key");
