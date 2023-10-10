import { getIronSession, createResponse } from "iron-session";
import { User } from "./models";

export interface Data {
  user?: User;
}

export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<Data>(req, res, {
    password: "vFG6GEZfmFqiWEvA1MFLyR3q7qdkx0k1",
    cookieName: "session",
    cookieOptions: {
      secure: false,
    },
  });

  return session;
};

export { createResponse };
