export const sessionOptions = {
  password: "nKbvf0tiBYuzMmGYsGVxf0ZQKJJjXq9R",
  cookieName: "todo",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
