import crypto from "crypto";

export function generateToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function getExpireDate(): Date {
  let now = new Date();
  now.setMinutes(now.getMinutes() + 15);
  return now;
}
