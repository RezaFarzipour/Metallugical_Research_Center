import { Button, NavbarContent, NavbarItem } from "@heroui/react";
import { IoEnterOutline } from "react-icons/io5";
import { User } from "@/types";
import { DropDown } from "./NavDropDown";
import { dropDownItems } from "@/constants/data";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "@/services/api/auth";
import { showToast } from "@/store/useToastSlice";
import { useUserStore } from "@/store/useUserdata";

export const NavBarLeft = () => {

  const { user,setUser } = useUserStore();
  const queryClient = useQueryClient();
  const { mutateAsync: asyncLogOut } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      showToast("با موفقیت خارج شدید", "success");
      queryClient.removeQueries({ queryKey: ["get-user"] });
      setUser(null);
     

    },
    onError: () => {
      showToast("خروج با خطا مواجه شد", "error");
    },
  });



  const logoutHandler = async () => {
    await asyncLogOut();
  };

  return (
    <NavbarContent justify="end">
      {user && user != null ? (
        <NavbarItem className=" flex">
          <DropDown logoutHandler={logoutHandler} user={user} dropDownItems={dropDownItems} />
        </NavbarItem>
      ) : (
        <NavbarItem>
          <Link href="/auth">
            <Button
              href="/auth"
              className="text-white  bg-secondary-600 py-2 text-sm  rounded-md hover:bg-secondary-700 transition duration-300"
              endContent={<IoEnterOutline fontWeight={"bold"} size={"20px"} />}
            >
              ورود
            </Button>
          </Link>
        </NavbarItem>
      )}
    </NavbarContent>
  );
};
