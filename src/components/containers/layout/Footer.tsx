"use client";
import React from "react";
import {
  MdOutlineMail,
  MdMyLocation,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import {
  FaTelegram,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { Tooltip } from "@heroui/react";
type aboutLinkType = {
  name: string;
  link: string;
};

const aboutlinks: aboutLinkType[] = [
  { name: "خانه", link: "/" },
  { name: "درباره‌ی ما", link: "/aboutus" },
  { name: "وبلاگ و اخبار", link: "/blogs" },
  { name: "ارتباط با ما", link: "/contactus" },
];
const socialMedias = [
  { name: "اینستاگرام", icon: FaInstagram, color: "#E1306C", link: "#" },
  { name: "تلگرام", icon: FaTelegram, color: "#0088cc", link: "#" },
  { name: "واتساپ", icon: FaWhatsapp, color: "#25D366", link: "#" },
  { name: "ایتا", icon: FaTelegramPlane, color: "orange", link: "#" },
];

const Footer = () => {
  return (
    <div className="bg-default-50 w-full p-6 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* دسترسی سریع */}
        <div className="hidden md:flex flex-col gap-4">
          <p className="font-bold text-default-900 text-lg lg:text-xl">
            دسترسی سریع
          </p>
          {aboutlinks.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              className="text-default-600 hover:text-blue-500 transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* راه‌های ارتباطی */}
        <div className="flex flex-col gap-4">
          <p className="font-bold text-default-900  text-sm md:text-xl">
            راه‌های ارتباطی
          </p>
          <div className="flex items-center gap-3 text-default-600 hover:text-blue-500 transition-colors duration-300 text-xs md:text-[14px]">
            <MdOutlineMail size={23} className="text-secondary-500" />
            آدرس ایمیل
          </div>
          <div className="flex items-center gap-3 text-default-600 hover:text-blue-500 transition-colors duration-300 text-xs md:text-[14px]">
            <MdMyLocation size={20} className="text-secondary-500" />
            آدرس آزمایشگاه
          </div>
          <div className="flex items-center gap-3 text-default-600 hover:text-blue-500 transition-colors duration-300 text-xs md:text-[14px]">
            <MdOutlineLocalPhone size={20} className="text-secondary-500" />
            شماره تماس
          </div>
        </div>

        {/* توضیحات و شبکه‌های اجتماعی */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 font-bold text-secondary-500 text-sm md:text-xl">
            <AiFillExperiment size={30} className="text-secondary-600 " />
            مرکز تحقیقات متالورژی دانشگاه آزاد زنجان
          </div>
          <p className="text-default-600 text-xs md:text-[14px] leading-6">
            آزمایشگاه ما با بهره‌گیری از تجهیزات پیشرفته و تیم متخصص، خدمات
            تشخیصی دقیق و سریع ارائه می‌دهد. رضایت و سلامت مراجعین، اولویت اصلی
            ماست.
          </p>

          <div className="flex justify-center lg:justify-start gap-4">
            <div className="py-6">
              <div className="flex justify-center gap-4 lg:gap-8 w-full">
                {socialMedias.map((media) => (
                  <Tooltip key={media.name} content={media.name}>
                    <a
                      href={media.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block w-10 h-10 overflow-hidden group"
                    >
                      {/* آیکون خاکستری (اولیه) */}
                      <media.icon
                        size={32}
                        className="text-gray-300 absolute top-0 left-0 group-hover:-top-full transition-all duration-500"
                      />
                      {/* آیکون رنگی (هاور) */}
                      <media.icon
                        size={32}
                        style={{ color: media.color }}
                        className="absolute top-full left-0 opacity-0 group-hover:top-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </a>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-6" />

      <div className="flex justify-end items-center gap-4 text-default-600 text-xs md:text-sm">
        <p>
          حقوق مادی و معنوی وب سایت متعلق به مرکز تحقیقات متالورژی دانشگاه آزاد
          زنجان می باشد. طراحی سامانه نوبت دهی متالورژی توسط آدلی کارا
        </p>
      </div>
    </div>
  );
};

export default Footer;
