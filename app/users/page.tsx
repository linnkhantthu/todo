import { redirect } from "next/navigation";

const Users = () => {
  redirect("/users/auth");
};

export default Users;
