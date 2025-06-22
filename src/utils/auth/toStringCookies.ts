import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export function toStringCookies(cookies:RequestCookies) {
  let strCookie = "";
  cookies.getAll().forEach((item: { name: string; value: string }) => {
    strCookie += `${item?.name}=${item?.value}; `;
  });
  return strCookie;
}
