import { getIronSession, createResponse, IronSessionData } from "iron-session";
import { User } from "./models";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, {
    password: process.env.COOKIE_KEY!,
    cookieName: process.env.COOKIE_NAME!,
    cookieOptions: {
      // secure: process.env.NODE_ENV === "production" ? true : false,
      secure: false,
    },
  });
  return session;
};

export { createResponse };
