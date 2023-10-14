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
  LOGGEDOUT = "Logged out",
}

export interface Todo {
  id: number;
  title: string;
  createdAt: Date;
  completed: boolean;
  author: any;
  authorId: number;
}
