import { redirect } from "next/navigation";

const Users = () => {
  redirect("/users/auth");
  return <></>;
};

export default Users;
