"use client";

import { JSX } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/element/Button";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { Radio, RadioGroup } from "@heroui/react";
import PersonalDetailsForm from "@/components/module/controller/PersonalDetailsForm";
import { AllUsersType } from "@/types";
import useUserService from "./hooks/useEditUser";
import { showToast } from "@/store/useToastSlice";
import { useRouter } from "next/navigation";

export type UserEditPageProps = {
  userData: AllUsersType;
};

export default function UserEditPage({
  userData,
}: UserEditPageProps): JSX.Element {
  //first_name:user?.response.data[0].first_name

  const { first_name, last_name, email, role } = userData;
  const { userEdit } = useUserService();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PersonalRegisterFormData>({
    defaultValues: {
      first_name: first_name || "",
      last_name: last_name || "",
      email: email,
      role: role || "",
    },
  });
  const currentRole = watch("role");

  const onSubmit: SubmitHandler<PersonalRegisterFormData> = async (
    data: PersonalRegisterFormData
  ) => {
    await userEdit(
      {
        phone_number: userData.phone_number,
        data: {
          ...data,
          is_signup: true,
          username: userData.username,
          phone_number: userData.phone_number,
        },
      },
      {
        onSuccess: () => {
          showToast("اطلاعات کاربر با موفقیت ویرایش شد", "success");
          router.push("/admin/users");
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
          item1="کاربران"
          item2="ادیت کاربر"
          panelHref="/admin/users"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl w-[50%] space-y-5 bg-white shadow-md mt-10"
      >
        <PersonalDetailsForm register={register} errors={errors} />

        <RadioGroup
          label="انتخاب نقش کاربر"
          value={currentRole}
          onValueChange={(value) => setValue("role", value)}
        >
          <div className="flex gap-x-4 items-center">
            <Radio value="admin">ادمین</Radio>
            <Radio value="customer">کاربر</Radio>
          </div>
        </RadioGroup>

        <Button type="submit">ثبت</Button>
      </form>
    </div>
  );
}
