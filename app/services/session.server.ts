import { createCookieSessionStorage } from "@remix-run/node";
import { env } from '@/env'

export const SessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [env.SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});
