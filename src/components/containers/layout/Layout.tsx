
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { cookies } from "next/headers";
import { UserProfileResponse } from "@/types";


type Props = {
  children: React.ReactNode;
};

const Layout = async({ children }: Props) => {

const cookieStore = await cookies()
const accessToken = cookieStore.get("access_token")?.value


let user: UserProfileResponse[] | null = null;

if (accessToken) {
  const res = await fetch('http://localhost:8000/api/v1/user/customer/', {
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
    credentials: 'include',
  });

if(res.ok){
  user = (await res.json()) as UserProfileResponse[];
}

}

  return (
    <div>
      <NavBar user={user}/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
