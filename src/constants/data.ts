'use client'
import { TiHomeOutline } from "react-icons/ti";
import { IoMdExit } from "react-icons/io";
import { contactInfoType, DashboardMinicardProps, FAQItem, FormInputConfig, latestArticleType, SidebarLink, UserDashboardMinicardProps } from "@/types";
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
import { kMaxLength } from "buffer";

// ... existing code ...
export const userSidebarlinks: SidebarLink[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: TiHomeOutline,
    hover: "text-primary-500",
    to: "/user/home"
  },

  {
    id: 1,
    title: "سفارش های من",
    icon: TbWallet,
    hover: "text-primary-500",
    to: "/user/myorders"
  },
  {
    id: 2,
    title: "گزارش ها ",
    icon: TbReportSearch,
    hover: "text-primary-500",
    to: "/user/reports"
  },
  {
    id: 3,
    title: "خروج",
    icon: IoMdExit,
    hover: "text-danger-500",
    to: "/"
  },
];
export const adminSidebarlinks: SidebarLink[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: TiHomeOutline,
    hover: "text-primary-500",
    to: "/admin/home"
  },

  {
    id: 1,
    title: "کاربر ها",
    icon: LuUsers,
    hover: "text-primary-500",
    to: "/admin/users"
  },
  {
    id: 2,
    title: "محصولات",
    icon: PiDeviceTablet,
    hover: "text-primary-500",
    to: "/admin/products"
  },
  {
    id: 3,
    title: "بلاگ ها",
    icon: RiBloggerLine,
    hover: "text-primary-500",
    to: "/admin/blogs"
  },
  {
    id: 4,
    title: "گزارشات",
    icon: TbReportSearch,
    hover: "text-primary-500",
    to: "/admin/reports"
  },
  {
    id: 5,
    title: "خروج",
    icon: IoMdExit,
    hover: "text-danger-500",
    to: "/"
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
];

export const steps = [
  { id: 1, label: "احراز هویت" },
  { id: 2, label: "تکمیل اطلاعات" },
  { id: 3, label: "ثبت سفارش" },
];

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
      "object-cover absolute top-0 right-4 sm:right-8 md:right-16 lg:right-28 ",
  },
  {
    src: "/images/about1-image2.png",
    alt: "About image 2",
    width: 360,
    height: 360,
    className:
      "object-cover absolute top-[4rem] sm:top-[5rem] md:top-[6rem] right-[8rem] sm:right-[10rem] md:right-[12rem] lg:right-[20rem]",
  },
  {
    src: "/images/about1-image3.png",
    alt: "About image 3",
    width: 340,
    height: 340,
    className:
      "object-cover absolute top-[18rem] sm:top-[20rem] md:top-[22rem] lg:top-[28rem] right-4 sm:right-8 md:right-16 lg:right-28",
  },
];

export const userCards: DashboardMinicardProps[] = [
  {
    color: "bg-primary-900",
    shadow:
      "shadow-[rgba(24,45,60,0.2)_-13px_0px,_rgba(24,45,60,0.1)_-23px_0px]",
    icon: CiClock1,
    label: "تاریخ پیوستن",
    count: 10,
  },
  {
    color: "bg-secondary-500",
    shadow:
      "shadow-[rgba(55,124,251,0.2)_-13px_0px,_rgba(55,124,251,0.1)_-23px_0px]",
    icon: PiDeviceTabletSpeakerLight,
    label: "سفارش ها",
    count: 10,
  },

  {
    color: "bg-green-500",
    shadow:
      "shadow-[rgba(34,197,94,0.2)_-13px_0px,_rgba(34,197,94,0.1)_-23px_0px]",
    icon: IoDocumentTextOutline,
    label: "همه سفارش ها",
    count: 10,
  },
];

export const adminCards: DashboardMinicardProps[] = [
  {
    color: "bg-primary-900",
    shadow:
      "shadow-[rgba(24,45,60,0.2)_-13px_0px,_rgba(24,45,60,0.1)_-23px_0px]",
    icon: LuUsers,
    label: "کاربران",
    count: 10,
  },
  {
    color: "bg-secondary-500",
    shadow:
      "shadow-[rgba(55,124,251,0.2)_-13px_0px,_rgba(55,124,251,0.1)_-23px_0px]",
    icon: PiDeviceTabletSpeakerLight,
    label: "سفارش ها",
    count: 10,
  },
  {
    color: "bg-purple-500",
    shadow:
      "shadow-[rgba(168,85,247,0.2)_-13px_0px,_rgba(168,85,247,0.1)_-23px_0px]",
    icon: PiDeviceTablet,
    label: "محصولات",
    count: 10,
  },

  {
    color: "bg-green-500",
    shadow:
      "shadow-[rgba(34,197,94,0.2)_-13px_0px,_rgba(34,197,94,0.1)_-23px_0px]",
    icon: RiBloggerLine,
    label: "بلاگ ها",
    count: 10,
  },
];





export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "چگونه می‌توانم حساب کاربری ایجاد کنم؟",
    answer: "برای ایجاد حساب کاربری، به صفحه ثبت‌نام بروید و اطلاعات خود را وارد کنید.",
  },
  {
    id: 2,
    question: "چگونه می‌توانم رمز عبورم را تغییر دهم؟",
    answer: "برای تغییر رمز عبور، وارد تنظیمات حساب کاربری شوید و گزینه تغییر رمز عبور را انتخاب کنید.",
  },
  {
    id: 3,
    question: "آیا امکان بازگردانی سفارش وجود دارد؟",
    answer: "بله، در صورت داشتن شرایط بازگشت کالا، می‌توانید درخواست خود را از طریق پشتیبانی ثبت کنید.",
  },
  {
    id: 4,
    question: "چگونه می‌توانم با پشتیبانی تماس بگیرم؟",
    answer: "می‌توانید از طریق ایمیل، تلفن یا چت آنلاین با پشتیبانی در ارتباط باشید.",
  },
  {
    id: 5,
    question: "مدت زمان ارسال سفارش چقدر است؟",
    answer: "مدت زمان ارسال سفارش بین ۳ تا ۷ روز کاری متغیر است، بسته به موقعیت جغرافیایی شما.",
  },
];



export const adduserInputData:FormInputConfig[] =[
  {
    id:1,
    label:"نام کاربری",
    name:"username",
    type:"text",
    maxLength:100,
    placeholder:"نام کاربری  را وارد کنید",
  },
  {
    id:2,
    label:"نام ",
    name:"first_name",
    type:"text",
    maxLength:100,
    placeholder:"نام   را وارد کنید",
  },
  {
    id:3,
    label:"نام خانوادگی",
    name:"last_name",
    type:"text",
    maxLength:100,
    placeholder:"نام خانوادگی  را وارد کنید",
  },
  {
    id:4,
    label:"ایمیل ",
    name:"email",
    type:"text",
    maxLength:200,
    placeholder:" ایمیل  را وارد کنید",
  },
  {
    id:5,
    label:" شماره همراه",
    name:"phone_number",
    type:"text",
    maxLength:12,
    placeholder:" شماره  را وارد کنید",
  },
  {
    id:6,
    label:" نقش کاربر",
    name:"role",
    type:"text",
    placeholder:"نقش کاربر  را وارد کنید",
  },
  {
    id: 7,
    label: "وضعیت ثبت‌نام",
    name: "is_signup",
    type: "radio",
    boleean: true,
    options: [
      { label: "ثبت نام کرده است", value: true },
      { label: "ثبت نام نکرده است", value: false },
    ],
  },

]
