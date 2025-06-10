"use client";
import { TiHomeOutline } from "react-icons/ti";
import {
  contactInfoType,
  FAQItem,
  FormInputConfig,
  latestArticleType,
  NavLinkItem,
  SidebarLink,
} from "@/types";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { OrderTypes } from "@/components/containers/FilteredContainer";
import { TbReportSearch, TbWallet } from "react-icons/tb";
import { PiDeviceTabletSpeakerLight } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { PiDeviceTablet } from "react-icons/pi";
import { RiBloggerLine } from "react-icons/ri";
import { RiHome3Line } from "react-icons/ri";

import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IconType } from "react-icons";
import { GrAppsRounded } from "react-icons/gr";
import {
  FaHeartbeat,
  FaCalendarCheck,
  FaShieldAlt,
  FaSmile,
  FaVial,
  FaFlask,
  FaBaby,
  FaDna,
  FaUserMd,
} from "react-icons/fa";

// ... existing code ...
export const userSidebarlinks: SidebarLink[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: TiHomeOutline,
    hover: "text-primary-500",
    to: "/user/dashboard",
  },

  {
    id: 3,
    title: "رزرو های من ",
    icon: TbWallet,
    hover: "text-primary-500",
    to: "/user/myreservs",
  },
  {
    id: 4,
    title: "گزارش ها ",
    icon: TbReportSearch,
    hover: "text-primary-500",
    to: "/user/reports",
  },
];
export const adminSidebarlinks: NavLinkItem[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: GrAppsRounded,
    to: "/admin/dashboard",
  },
  {
    id: 1,
    title: "رزرو ها",
    icon: PiDeviceTablet,
    to: "/admin/reservse",
  },
  {
    id: 2,
    title: "کاربران",
    icon: LuUsers,
    to: "/admin/users",
  },

  {
    id: 3,
    title: "سرویس ها",
    icon: PiDeviceTablet,
    to: "/admin/services",
  },
  {
    id: 4,
    title: "بلاگ ",
    icon: RiBloggerLine,
    to: "/admin",
    children: [
      { id: 41, title: "دسته بندی ها", to: "/admin/blogs/category" },
      { id: 42, title: " وبلاگ ها", to: "/admin/blogs" },
    ],
  },
  {
    id: 5,
    title: "گزارشات",
    icon: TbReportSearch,
    to: "/admin/reports",
  },
];

// ... existing code ...
export const LatestArticles: latestArticleType[] = [
  {
    id: 1,
    image: "/images/blog1-img1.png",
    date: "1402/12/20",
    author: "محمد حیدری",
    articleTitle: "پیشرو در تجزیه و تحلیل شیمیایی",
    description:
      "حوزه تجزیه و تحلیل شیمیایی در سال های اخیر شاهد نوآوری های قابل توجهی بوده است که به دلیل پیشرفت در فناوری و روش شناسی انجام شده است",
  },
  {
    id: 2,
    image: "/images/blog1-img2.png",
    date: "1402/12/20",
    author: "مریم زمانی",
    articleTitle: "مقررات صنعت گرایش های نوظهور",
    description:
      "با تنظیم بیشتر صنایع، تقاضا برای تجزیه و تحلیل کامل و دقیق در حال افزایش است. مقررات زیست محیطی جدید، به عنوان مثال، پروتکل آزمایش.",
  },
  {
    id: 3,
    image: "/images/blog1-img2.png",
    date: "1402/12/20",
    author: "مریم زمانی",
    articleTitle: "مقررات صنعت گرایش های نوظهور",
    description:
      "با تنظیم بیشتر صنایع، تقاضا برای تجزیه و تحلیل کامل و دقیق در حال افزایش است. مقررات زیست محیطی جدید، به عنوان مثال، پروتکل آزمایش.",
  },
  {
    id: 4,
    image: "/images/blog1-img2.png",
    date: "1402/12/20",
    author: "مریم زمانی",
    articleTitle: "مقررات صنعت گرایش های نوظهور",
    description:
      "با تنظیم بیشتر صنایع، تقاضا برای تجزیه و تحلیل کامل و دقیق در حال افزایش است. مقررات زیست محیطی جدید، به عنوان مثال، پروتکل آزمایش.",
  },
  {
    id: 5,
    image: "/images/blog1-img2.png",
    date: "1402/12/20",
    author: "مریم زمانی",
    articleTitle: "مقررات صنعت گرایش های نوظهور",
    description:
      "با تنظیم بیشتر صنایع، تقاضا برای تجزیه و تحلیل کامل و دقیق در حال افزایش است. مقررات زیست محیطی جدید، به عنوان مثال، پروتکل آزمایش.",
  },
  {
    id: 6,
    image: "/images/blog1-img2.png",
    date: "1402/12/20",
    author: "مریم زمانی",
    articleTitle: "مقررات صنعت گرایش های نوظهور",
    description:
      "با تنظیم بیشتر صنایع، تقاضا برای تجزیه و تحلیل کامل و دقیق در حال افزایش است. مقررات زیست محیطی جدید، به عنوان مثال، پروتکل آزمایش.",
  },
];

export const Authsteps = [
  { id: 1, label: " ارسال شماره همراه" },
  { id: 2, label: " تایید کد" },
  { id: 3, label: " ثبت اطلاعات" },
];

export const reserveStep = {
  admin: [
    { id: 1, label: "تایید رزرو سرویس" },
    { id: 2, label: "ارسال فیش پرداخت " },
    { id: 3, label: "تایید پرداخت" },
    { id: 4, label: "تایید نهایی" },
    { id: 5, label: "اتمام رزرو" },
  ],
  customer: [
    { id: 1, label: "انتخاب سرویس" },
    { id: 2, label: "انتظار تایید ادمین" },
    { id: 3, label: "پرداخت" },
    { id: 4, label: "انتظار تایید پرداخت" },
    { id: 5, label: "تایید نهایی" },
  ],
};
export const contactusinformation: contactInfoType[] = [
  {
    id: 1,
    title: "آدرس",
    desc: "زنجان.دانشگاه اعتمادیه",
    icon: IoLocationOutline,
  },
  {
    id: 2,
    title: "شماره تماس",
    desc: "123-456-789 ",
    icon: MdOutlinePhone,
  },
  {
    id: 1,
    title: "آدرس ایمیل",
    desc: "dr.salimi@gmail.com ",
    icon: CiMail,
  },
];

export const TableInfo: OrderTypes[] = [
  {
    description: "خرید لپ‌تاپ",
    amount: "45,000,000 تومان",
    date: "1402/12/20",
    status: "پرداخت شد",
    statusColor: "text-green-500",
  },
  {
    description: "گوشی موبایل",
    amount: "25,000,000 تومان",
    date: "1402/12/18",
    status: "در انتظار",
    statusColor: "text-yellow-500",
  },
  {
    description: "هدفون بی‌سیم",
    amount: "3,500,000 تومان",
    date: "1402/12/15",
    status: "لغو شد",
    statusColor: "text-red-500",
  },
];

export const images = [
  {
    src: "/images/about1-image1.png",
    alt: "About image 1",
    width: 260,
    height: 300,
    className:
      "object-cover absolute -top-8 right-4 sm:right-8 md:right-16 lg:right-28 ",
  },
  {
    src: "/images/about1-image22.png",
    alt: "About image 2",
    width: 460,
    height: 360,
    className:
      "object-cover absolute top-[4rem] sm:top-[5rem] md:top-[6rem] right-[8rem] sm:right-[10rem] md:right-[12rem] lg:right-[20rem] rounded-md",
  },
  {
    src: "/images/about1-image3.png",
    alt: "About image 3",
    width: 350,
    height: 350,
    className:
      "object-cover absolute top-[18rem] sm:top-[20rem] md:top-[22rem] lg:top-[24rem] right-4 sm:right-8 md:right-16 lg:right-28",
  },
];

export const userCards = {
  cancelReservation: {
    color: "bg-primary-900",
    shadow:
      "shadow-[rgba(24,45,60,0.2)_-13px_0px,_rgba(24,45,60,0.1)_-23px_0px]",
    icon: CiClock1,
    label: "رزرو های لغو شده",
  },
  activeReservation: {
    color: "bg-secondary-500",
    shadow:
      "shadow-[rgba(55,124,251,0.2)_-13px_0px,_rgba(55,124,251,0.1)_-23px_0px]",
    icon: PiDeviceTabletSpeakerLight,
    label: "رزرو های در حال انجام",
  },
  reserves: {
    color: "bg-green-500",
    shadow:
      "shadow-[rgba(34,197,94,0.2)_-13px_0px,_rgba(34,197,94,0.1)_-23px_0px]",
    icon: IoDocumentTextOutline,
    label: "همه رزرو ها",
  },
};
export const adminCards = {
  users: {
    color: "bg-primary-900",
    shadow:
      "shadow-[rgba(24,45,60,0.2)_-13px_0px,_rgba(24,45,60,0.1)_-23px_0px]",
    icon: LuUsers,
    label: "کاربران",
  },
  orders: {
    color: "bg-secondary-500",
    shadow:
      "shadow-[rgba(55,124,251,0.2)_-13px_0px,_rgba(55,124,251,0.1)_-23px_0px]",
    icon: PiDeviceTabletSpeakerLight,
    label: "رزرو ها",
  },
  products: {
    color: "bg-purple-500",
    shadow:
      "shadow-[rgba(168,85,247,0.2)_-13px_0px,_rgba(168,85,247,0.1)_-23px_0px]",
    icon: PiDeviceTablet,
    label: "سرویس ها",
  },
  blogs: {
    color: "bg-green-500",
    shadow:
      "shadow-[rgba(34,197,94,0.2)_-13px_0px,_rgba(34,197,94,0.1)_-23px_0px]",
    icon: RiBloggerLine,
    label: "بلاگ ها",
  },
};

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "چگونه می‌توانم حساب کاربری ایجاد کنم؟",
    answer:
      "برای ایجاد حساب کاربری، به صفحه ثبت‌نام بروید و اطلاعات خود را وارد کنید.",
  },
  {
    id: 2,
    question: "چگونه می‌توانم یک دستگاه را رزرو کنم؟",
    answer:
      "برای رزرو دستگاه، ابتدا لازم است در سایت ثبت‌نام کرده یا وارد حساب کاربری خود شوید از ورود، دو روش برای انجام رزرو در اختیار دارید:از طریق پنل کاربری و مراجعه به بخش «رزروهای من»از طریق صفحه «خدمات» و انتخاب گزینه «رزرو جدید»با استفاده از هر یک از این روش‌ها، می‌توانید به‌راحتی دستگاه مورد نظر خود را انتخاب و رزرو نمایید.",
  },
  {
    id: 3,
    question: "زمان تقریبی تایید رزرو چقدر است؟",
    answer: "بین چند دقیقه تا نهایت دوروز متغیر است",
  },
  {
    id: 4,
    question: "چگونه می‌توانم با پشتیبانی تماس بگیرم؟",
    answer:
      "می‌توانید از طریق ایمیل، تلفن یا مراجعه ی حضوری با پشتیبانی در ارتباط باشید.",
  },
  {
    id: 5,
    question: "در صورت لغو رزرو هزینه بازمیگردد؟",
    answer:
      "بله،در صورت لغو رزرو توسط ادمین،هزینه در اسرع وقت به حساب بانکی شما بازگردانده میشود",
  },
];

export const adduserInputData: FormInputConfig[] = [
  {
    id: 1,
    label: "نام ",
    name: "first_name",
    type: "text",
    maxLength: 100,
    placeholder: "نام   را وارد کنید",
  },
  {
    id: 2,
    label: "نام خانوادگی",
    name: "last_name",
    type: "text",
    maxLength: 100,
    placeholder: "نام خانوادگی  را وارد کنید",
  },
  {
    id: 3,
    label: "ایمیل ",
    name: "email",
    type: "text",
    maxLength: 200,
    placeholder: " ایمیل  را وارد کنید",
  },
  {
    id: 4,
    label: " شماره همراه",
    name: "phone_number",
    type: "text",
    maxLength: 12,
    placeholder: " شماره  را وارد کنید",
  },
  {
    id: 5,
    label: " نقش کاربر",
    name: "role",
    type: "text",
    placeholder: "نقش کاربر  را وارد کنید",
  },
];

export interface dropDownItemType {
  id: number;
  label: string;
  path: string;
  icon: IconType;
}

export const dropDownItems = (userRole: string): dropDownItemType[] => {
  return [
    {
      id: 1,
      label: "حساب کاربری",
      path: userRole === "customer" ? "/user/dashboard" : "/admin/dashboard",
      icon: RiHome3Line,
    },
    {
      id: 2,
      label: userRole === "customer" ? "سفارش های من" : "رزروها",
      path: userRole === "customer" ? "/user/myreservs" : "/admin/reservse",
      icon: FiShoppingCart,
    },
    {
      id: 3,
      label: "گزارش گیری",
      path: userRole === "customer" ? "/user/reports" : "/admin/reports",
      icon: HiOutlineDocumentReport,
    },
  ];
};

// constants/aboutUsData.ts

export type AboutUsItemType = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

export const services: AboutUsItemType[] = [
  {
    icon: FaFlask,
    title: "تحلیل فازی (XRD)",
    desc: "شناسایی فازهای بلوری مواد با دستگاه X-Ray Diffraction (XRD) Inel Equinox.",
  },
  {
    icon: FaVial,
    title: "تعیین اندازه ذرات (LPSA)",
    desc: "آنالیز اندازه ذرات به کمک دستگاه Particle Size Analyzer با لیزر.",
  },
  {
    icon: FaHeartbeat,
    title: "سختی‌سنجی مواد",
    desc: "انجام تست سختی Vickers و Brinell با دستگاه‌های دقیق آزمایشگاهی.",
  },
  {
    icon: FaDna,
    title: "میکروسکوپ نوری و الکترونی",
    desc: "مشاهده ریزساختار مواد با استفاده از میکروسکوپ‌های نوری و الکترونی.",
  },
  {
    icon: FaBaby,
    title: "آزمون‌های حرارتی (TGA/DSC)",
    desc: "بررسی واکنش‌های حرارتی مواد با دستگاه TGA-DSC.",
  },
  {
    icon: FaUserMd,
    title: "مشاوره تخصصی مواد",
    desc: "ارائه مشاوره توسط اساتید و متخصصان در زمینه متالوژی و علوم مواد.",
  },
];

export const whyUsItems: AboutUsItemType[] = [
  {
    icon: FaFlask,
    title: "تجهیزات مدرن و دقیق",
    desc: "ما با بهره‌گیری از دستگاه‌هایی مانند XRD، SEM، DSC و ...، اندازه‌گیری‌های دقیق مواد را امکان‌پذیر می‌کنیم.",
  },
  {
    icon: FaVial,
    title: "خدمات تخصصی برای تحقیق و صنعت",
    desc: "هماهنگ با نیازهای پژوهشگران و واحدهای صنعتی، خدمات آزمایشگاهی سفارشی ارائه می‌دهیم.",
  },
  {
    icon: FaCalendarCheck,
    title: "نوبت‌دهی آسان و برنامه‌ریزی شده",
    desc: "ثبت سفارش و برنامه‌ریزی زمان استفاده از دستگاه‌ها به صورت ساده و بدون تاخیر.",
  },
  {
    icon: FaShieldAlt,
    title: "استانداردهای بالای آزمایشگاهی",
    desc: "کلیه تست‌ها طبق استانداردهای داخلی و بین‌المللی انجام می‌شوند.",
  },
  {
    icon: FaSmile,
    title: "کادر مجرب و حرفه‌ای",
    desc: "همراهی با کارشناسان مجرب در زمینه مواد و متالوژی، تضمین کیفیت خدمات ما است.",
  },
];
