"use client";

import { JSX, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/element/Button";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import PersonalDetailsForm from "../module/controller/PersonalDetailsForm";
import { useGetUser } from "@/hooks/useAuth";
import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/store/useToastSlice";
import { editUserByPhoneNumber } from "@/services/api/user";
import { BtnLoader } from "../element/Loader";

export default function MyProfilePage(): JSX.Element {
  const { data: user }: { data: User | undefined } = useGetUser();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: editUserByPhoneNumber,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalRegisterFormData>();

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<PersonalRegisterFormData> = async (data) => {
    await mutateAsync(
      {
        phone_number: user?.phone_number,
        role: user?.role,
        data: {
          ...data,
          role: user?.role,
          username: user?.username,
          phone_number: user?.phone_number,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-user"],
          });
          showToast("اطلاعات کاربر با موفقیت ویرایش شد", "success");

          reset();
        },
        onError: () => {
          showToast("ویرایش کاربر با خطا مواجه شد", "error");
        },
      }
    );
  };

  return (
    <div className=" text-default-700 p-8 flex flex-col md:flex-row gap-10 ">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="داشبورد"
          item2="پروفایل"
          panelHref={user!.role ==="admin" ? "/admin/dashboard":"/user/dashboard"}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl w-[50%] space-y-5 bg-white shadow-md mt-10"
      >
        <PersonalDetailsForm register={register} errors={errors} />

        <Button variant="primary" type="submit" fullWidth>
          {isPending ? <BtnLoader /> : "ویرایش"}
        </Button>
      </form>
    </div>
  );
}
