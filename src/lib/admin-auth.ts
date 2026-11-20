import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "smt_admin";
const MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || "contact@sori-mobile-tire.com").trim().toLowerCase();
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

function safeEqualString(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = getAdminEmail();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPassword) return false;
  const emailOk = safeEqualString(email.trim().toLowerCase(), expectedEmail);
  const passwordOk = safeEqualString(password, expectedPassword);
  return emailOk && passwordOk;
}

/** @deprecated use verifyAdminCredentials */
export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  return safeEqualString(password, expected);
}

export async function createAdminSession() {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = `ok.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [ok, expStr, sig] = parts;
  const payload = `${ok}.${expStr}`;
  const expected = sign(payload);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  if (ok !== "ok") return false;
  if (Number(expStr) < Date.now()) return false;
  return true;
}
