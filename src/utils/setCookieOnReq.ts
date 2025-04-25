export default function setCookiesOnReq(cookies: any) {
  // cookies get from => 1. const cookies = cookies() OR 2: req.cookies
  const options = {
    headers: {
      Cookie:
        `${cookies.get("access_token")?.name}=${cookies.get("access_token")?.value
        }; ${cookies.get("refresh_token")?.name}=${cookies.get("refresh_token")?.value
        }` || "-",
    },
  };

  return options;
}
