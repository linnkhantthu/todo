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
  REQUIRED_LOGIN = "You need to login to perform this action",
  REQUIRED_LOGOUT = "You need to logged out in order to perform this action",
  SUCCESS = "Operation succeed",
  FAIL = "Operation failed",
  SERVER_ERROR = "Server error",
  CONNECTION_ERROR = "Connection error occcured",
  AUTH_ERROR = "Username or password is incorrect",
}

export interface Todo {
  id?: number;
  title?: string;
  createdAt?: Date;
  completed?: boolean;
  author?: any;
  authorId?: number;
}
