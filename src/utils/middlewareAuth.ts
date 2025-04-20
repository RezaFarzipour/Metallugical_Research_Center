import { NextRequest } from "next/server";

export async function middlewareAuth(req:NextRequest) {

    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;
  
    if (!accessToken || !refreshToken) return null;
  

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/customer/`, {
        method: "GET",
        headers: {
          Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
        },
        credentials: "include",
      });
    
      if (!res.ok) return null;
    
      const json = await res.json();
      const { user } = json?.data || {};
      return user;
    }