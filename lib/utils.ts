import crypto from "crypto";

export function generateToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function getExpireDate(): Date {
  let now = new Date();
  now.setMinutes(now.getMinutes() + 15);
  return now;
}

export function getDateNow(): Date {
  const now = new Date();
  return now;
}

export class HashPassword {
  private readonly ENC: Buffer;
  private readonly IV: string;
  private readonly ALGO: string;

  constructor() {
    this.IV = process.env.IV!;
    this.ALGO = process.env.ALGO!;
    const secret = process.env.SECRET_KEY!;
    const key = crypto
      .createHash("sha256")
      .update(String(secret))
      .digest("base64");
    this.ENC = Buffer.from(key, "base64");
  }

  encrypt(text: string) {
    let cipher = crypto.createCipheriv(this.ALGO, this.ENC, this.IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  decrypt = (text: string) => {
    let decipher = crypto.createDecipheriv(this.ALGO, this.ENC, this.IV);
    let decrypted = decipher.update(text, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  };
}
