import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserAdmin } from "@/services/api/user";
import { translateRole } from "@/utils/translateRole";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";
import { Usercolumns } from "@/constants/tableData";
import { useRouter } from "next/navigation";

const useUserData = (visibleColumns: Set<string>, includeskey: string[]) => {
  const [formData, setFormData] = useState<any>({});
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const { data, isPending } = useQuery({
    queryKey: ["getAll-users"],
    queryFn: getAllUserAdmin,
  });
  const router = useRouter();

  useEffect(() => {
    if (Array.isArray(data)) {
      const result = groupUsersBySignup(data, includeskey);
      setFormData(result);

      if (result.signedUp.length > 0) {
        const keys = Object.keys(result.signedUp[0]).filter(
          (key) => key !== "is_signup"
        );
        setVisibleKeys(keys);
      }
    }
  }, [data]);

  function groupUsersBySignup(data: any[], keys: string[]) {
    return data.reduce(
      (acc, user, index) => {
        const name = `${user.first_name} ${user.last_name}`.trim();

        const filtered = Object.fromEntries(
          Object.entries(user).filter(([key]) => keys.includes(key))
        );

        const simplified = {
          ...filtered,
          id: toPersianNumbers(index + 1),
          role: translateRole(user.role),
          name,
          phone_number: toPersianNumbers(user.phone_number),
          is_signup: !!user.is_signup,
          actions: "action",
        };

        if (user.is_signup) {
          acc.signedUp.push(simplified);
        } else {
          acc.notSignedUp.push(simplified);
        }

        return acc;
      },
      { signedUp: [], notSignedUp: [] }
    );
  }

  const headerColumns = useMemo(() => {
    return visibleColumns.size === Usercolumns.length
      ? Usercolumns
      : Usercolumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const formDataSignedUp = Array.isArray(formData.signedUp)
    ? formData.signedUp
    : [];


  const firstActionClickHandler = () => {
    router.push("/admin/users/edit");
  };
  const secondActionClickHandler = () => { };


  return {
    formDataSignedUp, isPending, visibleKeys, headerColumns, firstActionClickHandler,
    secondActionClickHandler,
  };
};

export default useUserData;
