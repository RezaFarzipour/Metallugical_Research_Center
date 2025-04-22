import { toStringCookies } from "./toStringCookies";

export default async function middlewareAuth(req) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}user/customer/`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: toStringCookies(req.cookies),
      },
    }
  ).then((res) => res.json());


  return data[0];
}
