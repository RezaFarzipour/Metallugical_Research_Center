// app/user/[id]/edit/page.tsx

"use client";

import CustomInput from "@/components/element/CustomInput";
import { adduserInputData } from "@/constants/data";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { RadioGroup, Radio } from "@heroui/react";

// تعریف نوع فرم
interface UserFormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_signup: boolean;
}

export default function UserEditPage(): JSX.Element {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "",
    is_signup: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "radio" && (value === "true" || value === "false")
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("فرم ارسال شد:", formData);
  };

  return (
    <div className="min-h-screen  text-default-700 p-8 flex flex-col md:flex-row gap-10">
      {/* کارت پروفایل */}
      <div className="flex flex-col items-center  p-6 rounded-xl w-full md:max-w-xs shadow-md">
        <Image
          src="/images/blog1-img1.png"
          alt="User"
          width={250}
          height={250}
          className="rounded-3xl mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold">Tyler Schmidt</h2>
      </div>

      {/* فرم ویرایش */}
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-xl w-full space-y-5 shadow-md"
      >
        {adduserInputData.map((input) =>
          !input.boleean ? (
            <div key={input.id}>
              <CustomInput
                type={input.type}
                name={input.name}
                value={formData[input.name as keyof UserFormData]}
                onChange={handleChange}
                label={input.label}
                placeholder={input.placeholder}
                maxLength={input.maxLength}
              />
            </div>
          ) : (
            <RadioGroup
          
              onChange={handleChange}
              color="secondary"
              key={input.id}
              label={input.label}
              name={input.name}
            >
              {input.options?.map((item, index) => (
                <Radio key={index} value={String(item.value)}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          )
        )}

        {/* دکمه ثبت */}
        <button
          type="submit"
          className="w-full py-2 text-default-100 bg-teal-500 hover:bg-teal-600 rounded-md font-semibold"
        >
          ثبت
        </button>
      </form>
    </div>
  );
}
