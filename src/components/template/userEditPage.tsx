"use client";

import { JSX } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/element/Button";
import RHFInput from "@/components/element/RHFInput";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { Radio, RadioGroup } from "@heroui/react";
import { UserProfileResponse } from "@/types";

export default function UserEditPage({user}:{user:UserProfileResponse|undefined}): JSX.Element {

//first_name:user?.response.data[0].first_name
  console.log('rrr',user);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalRegisterFormData>({
    
  });


  const onSubmit: SubmitHandler<PersonalRegisterFormData> = (data) => {
    console.log("فرم ارسال شد:", data);
    // اینجا می‌تونی API call بزنی یا اطلاعات رو به ریداکس بفرستی
  };

  return (
    <div className=" text-default-700 p-8 flex flex-col md:flex-row gap-10 bg-white">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="کاربران"
          item2="ادیت کاربر"
          panelHref="/admin/users"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl w-[50%] space-y-5 shadow-md mt-10"
      >
        <RHFInput<PersonalRegisterFormData>
          register={register}
          errors={errors}
          label="نام"
          type="text"
          dir="rtl"
          name="first_name"
          
        />
        <RHFInput<PersonalRegisterFormData>
          register={register}
          errors={errors}
          label="نام خانوادگی"
          type="text"
          dir="rtl"
          name="last_name"
        />
        <RHFInput<PersonalRegisterFormData>
          register={register}
          errors={errors}
          label="ایمیل"
          type="email"
          dir="rtl"
          name="email"
        />
        <RadioGroup label="انتخاب نقش کاربر">
          <div className="flex gap-x-4 items-center">
            <Radio value="buenos-aires">ادمین</Radio>
            <Radio value="sydney">کاربر</Radio>
          </div>
        </RadioGroup>

        <Button type="submit">ثبت</Button>
      </form>
    </div>
  );
}
