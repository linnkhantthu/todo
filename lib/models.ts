export interface User {
  username: string;
  email: string;
  dob: Date;
}

export enum AuthResults {
  LOGINFAILED = "Incorrect username or password",
  LOGGEDIN = "Logged in successfully",
  REGISTERATIONFAILED = "User already exist or incorrect info",
  REGISTERED = "Registered successfully",
  INVALID = "Invalid Request",
}
