import { getIronSession, createResponse, IronSessionData } from "iron-session";
import { User } from "./models";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, {
    password: "vFG6GEZfmFqiWEvA1MFLyR3q7qdkx0k1",
    cookieName: "session",
    cookieOptions: {
      secure: false,
    },
  });
  return session;
};

export { createResponse };
