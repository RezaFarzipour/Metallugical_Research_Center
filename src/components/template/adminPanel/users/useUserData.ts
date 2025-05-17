import { useEffect, useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserAdmin } from "@/services/api/user";
import { translateRole } from "@/utils/translateRole";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";
import { Usercolumns } from "@/constants/tableData";
import { useRouter } from "next/navigation";
import { showToast } from "@/store/useToastSlice";
import useDeleteUser from "./useDeleteUser";

const useUserData = (visibleColumns: Set<string>, includeskey: string[]) => {
  const [formData, setFormData] = useState({});
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDeleting, userDelete } = useDeleteUser();

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
          phone_number: user.phone_number,
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

  const firstActionClickHandler = useCallback(
    (id: string | number, phone_number: string) => {
      router.push(`/admin/users/${phone_number}/edit`);
    },
    [router]
  );

  // باز کردن مودال حذف
  const secondActionClickHandler = useCallback(
    (id: string | number, phone_number: string) => {
      if (!id) {
        console.error("Invalid ID passed to secondActionClickHandler");
        showToast("آیدی سرویس نامعتبر است", "error");
        return;
      }

      setSelectedServiceId(phone_number);
      setIsModalOpen(true);
    },
    []
  );

  // تایید حذف سرویس
  const handleDeleteService = useCallback(() => {
    if (!selectedServiceId) {
      console.error("ID for deletion is undefined or null");
      showToast("آیدی سرویس نامعتبر است", "error");
      return;
    }

    userDelete(
      { phone_number: selectedServiceId },
      {
        onSuccess: () => {
          showToast("کاربر با موفقیت حذف شد", "success");
        },
        onError: () => {
          showToast("حذف کاربر با خطا مواجه شد", "error");
        },
      }
    );

    setIsModalOpen(false);
    setSelectedServiceId(null);
  }, [selectedServiceId]);

  return {
    formDataSignedUp,
    isPending,
    visibleKeys,
    headerColumns,
    handleDeleteService,
    firstActionClickHandler,
    secondActionClickHandler,
    selectedServiceId,
    setIsModalOpen,
    isModalOpen,
  };
};

export default useUserData;
