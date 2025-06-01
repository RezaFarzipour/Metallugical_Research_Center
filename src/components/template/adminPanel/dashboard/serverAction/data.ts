"use server";
import { getAllBlogsAdmin } from "@/services/api/blogs";
import { getAllReserve } from "@/services/api/reserve";
import { getAllServiceAdmin } from "@/services/api/service";
import { getAllUserAdmin } from "@/services/api/user";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";

export async function fetchCardData() {
  const cookieStore = await cookies();
  const options = setCookiesOnReq(cookieStore);
  try {
    const data = await Promise.all([
      getAllUserAdmin(options),
      getAllServiceAdmin(options),
      getAllReserve(options),
      getAllBlogsAdmin(options),
    ]);

    const numberOfUsers = data[0]?.length ?? 0;
    const numberOfServices = data[1]?.length ?? 0;
    const numberOfReservations = data[2]?.data?.length ?? 0;
    const numberOfBlogs = data[3]?.length ?? 0;

    return {
      numberOfUsers, numberOfServices, numberOfReservations, numberOfBlogs

    };
  } catch (error) {
    console.error("خطا", error);
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}



