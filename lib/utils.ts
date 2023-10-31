import crypto from "crypto";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { getSession } from "./session";
import { getUserByUsername } from "./query/user/query";
import { User } from "./models";

export function generateToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function getExpireDate(mins?: number): Date {
  let now = new Date();
  now.setMinutes(now.getMinutes() + (mins ? mins : 15));
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

async function sendMail(
  email: string,
  subject: string,
  template: JSX.Element
): Promise<string> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    // to: "delivered@resend.dev",
    subject: subject,
    react: template,
  });
  return data.id;
}

export async function sendMailWithNodemailer(
  email: string,
  subject: string,
  template: JSX.Element
): Promise<string> {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      // pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  const info = await transporter.sendMail({
    from: "todo@dimensions.com",
    to: email,
    subject: subject,
    html: ReactDOMServer.renderToString(template),
  });
  return info.messageId;
}

export async function isAuth(request: Request, response: Response) {
  const session = await getSession(request, response);
  const { user } = session;
  if (user) {
    const dbUser = await getUserByUsername(user?.username);
    if (dbUser && user.sessionId === dbUser.sessionId) {
      session.user = dbUser as User;
      await session.save();
      return { isLoggedIn: true, currentUser: user };
    }
  }
  await session.destroy();
  return { isLoggedIn: false };
}
