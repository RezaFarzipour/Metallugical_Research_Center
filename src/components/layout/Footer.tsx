import React from "react";
import {
  MdOutlineMail,
  MdMyLocation,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Divider } from "@heroui/divider";

const aboutlinks: string[] = [
  "خانه",
  "درباره‌ی ما",
  "وبلاگ و اخبار",
  "ارتباط با ما",
];

const socialmedias: React.ElementType[] = [
  FaTelegram,
  IoLogoWhatsapp,
  FaInstagram,
];

const Footer = () => {
  return (
    <div className="bg-default-50 w-full ">
      <div className="flex text-right flex-col-reverse items-center lg:flex-row lg:justify-between md:items-center p-6 lg:p-10 gap-6 lg:gap-12 h-auto">
        {/* دسترسی سریع */}
        <div className="flex flex-col gap-4 items-center text-center  mr-7 lg:mr-0">
          <p className="font-bold text-default-900 text-lg lg:text-xl">
            دسترسی سریع
          </p>
          {aboutlinks.map((link) => (
            <p
              key={link}
              className="flex gap-3 items-center text-default-600 text-md transition-all duration-300 hover:text-blue-500 hover:translate-x-2"
            >
              {link}
            </p>
          ))}
        </div>

        {/* راه‌های ارتباطی */}
        <div className="flex flex-col gap-4 items-center text-center mr-7 lg:mr-8  mb-6  ">
          <p className="font-bold text-default-900 text-lg lg:text-xl">
            راه‌های ارتباطی
          </p>
          <p className="flex gap-3 items-center text-default-600 text-md transition-colors duration-300 hover:text-blue-500">
            <MdOutlineMail className="text-[#111]" size={23} />
            آدرس ایمیل
          </p>
          <p className="flex gap-3 items-center text-default-600 text-md transition-colors duration-300 hover:text-blue-500">
            <MdMyLocation className="text-[#111]" size={23} />
            آدرس آزمایشگاه
          </p>
          <p className="flex gap-3 items-center text-default-600 text-md transition-colors duration-300 hover:text-blue-500">
            <MdOutlineLocalPhone className="text-[#111]" size={23} />
            شماره تماس
          </p>
        </div>

        {/* توضیحات */}
        <div className="lg:ml-8 flex flex-col gap-4 items-center text-center  lg:max-w-md mb-6  lg:mb-0">
          <p className="flex gap-3 items-center font-bold text-[#4A43DD] text-lg lg:text-xl">
            <AiFillExperiment className="text-[#4A43DD]" size={30} />
            نام آزمایشگاه
          </p>
          <p className="text-default-600 text-sm lg:text-md leading-6">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Integer nec
            nostra nunc sociosqu faucibus urna tempus primis. Sed odio sociosqu
            diam euismod arcu; aenean ridiculus at.
          </p>

          {/* شبکه‌های اجتماعی */}
          <div className="flex justify-center gap-4">
            {socialmedias.map((Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-100 transition-all duration-300 hover:bg-[#4A43DD] group cursor-pointer"
              >
                <Icon
                  className="text-[#4A43DD] transition-all duration-300 group-hover:text-white"
                  size={20}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider className="my-4" />

      {/* کپی‌رایت */}
      <div className="w-full flex justify-around gap-4 items-center text-center py-3">
        <p className="flex gap-3 items-center text-default-600 text-md ">
          کپی‌رایت
        </p>
        <p className="flex gap-3 items-center text-default-600 text-md ">
          ساخته شده توسط
        </p>
      </div>
    </div>
  );
};

export default Footer;
