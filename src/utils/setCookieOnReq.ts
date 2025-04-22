export default function setCookiesOnReq(cookies: any) {
  // cookies get from => 1. const cookies = cookies() OR 2: req.cookies
  const options = {
    headers: {
      Cookie:
        `${cookies.get("accessToken")?.name}=${cookies.get("accessToken")?.value
        }; ${cookies.get("refreshToken")?.name}=${cookies.get("refreshToken")?.value
        }` || "-",
    },
  };

  return options;
}
