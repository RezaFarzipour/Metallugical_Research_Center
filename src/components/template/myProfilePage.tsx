"use client";

import { JSX } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/element/Button";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import PersonalDetailsForm from "../module/controller/PersonalDetailsForm";

export default function myProfilePage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalRegisterFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
    },
  });

  const onSubmit: SubmitHandler<PersonalRegisterFormData> = (data) => {
    console.log("فرم ارسال شد:", data);
    // اینجا می‌تونی API call بزنی یا اطلاعات رو به ریداکس بفرستی
  };

  return (
    <div className=" text-default-700 p-8 flex flex-col md:flex-row gap-10 ">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="پروفایل"
          item2="داشبورد"
          panelHref="/admin/home"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl w-[50%] space-y-5 bg-white shadow-md mt-10"
      >
        <PersonalDetailsForm register={register} errors={errors} />

        <Button type="submit">ثبت</Button>
      </form>
    </div>
  );
}
