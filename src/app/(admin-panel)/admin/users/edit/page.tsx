import UserEditPage from "@/components/template/adminPanel/users/userEditPage";
import { getUserByPhoneNumberAdmin } from "@/services/api/user";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import React from "react";

type userId = {
  params: { userId: string };
};
const page = async ({ params }: userId) => {
  const phone_number = params.userId;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const data = await getUserByPhoneNumberAdmin(phone_number, options);

  return <UserEditPage userData={data} />;
};

export default page;
