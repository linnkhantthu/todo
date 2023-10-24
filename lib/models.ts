export interface User {
  username: string;
  email: string;
  dob: Date;
}

export interface FlashMessage {
  message: string;
  category: string;
}

export enum AuthResults {
  LOGINFAILED = "Incorrect username or password",
  LOGGEDIN = "Logged in successfully",
  REGISTERATIONFAILED = "User already exist or incorrect info",
  REGISTERED = "Registered successfully",
  INVALID = "Unauthorized request",
  LOGGEDOUT = "Logged out",
  ALREADYLOGGEDIN = "User already logged in",
  CONNECTIONFAILED = "Connection failed, please try again",
  SUCCESS = "Operation successful",
  FAIL = "Operation Failed",
}

export enum Results {
  LOGIN_FIRST = "You need to login to perform this action",
  LOGOUT_FIRST = "You need to logged out in order to perform this action",
  SUCCESS = "Operation succeed",
  FAIL = "Operation failed",
  SERVER_ERROR = "Server error",
}

export interface Todo {
  id?: number;
  title?: string;
  createdAt?: Date;
  completed?: boolean;
  author?: any;
  authorId?: number;
}
