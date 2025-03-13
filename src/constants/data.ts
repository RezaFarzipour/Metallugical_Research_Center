import { TiHomeOutline } from "react-icons/ti";
import { CiWallet } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { latestArticleType, sidebarData } from "@/types";

export const sidebarlinks: sidebarData[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: TiHomeOutline,
    hover: "text-primary-500",
  },

  {
    id: 1,
    title: "سفارش های من",
    icon: CiWallet,
    hover: "text-primary-500",
  },

  {
    id: 2,
    title: "خروج",
    icon: IoMdExit,
    hover: "text-danger-500",
  },
];

export const LatestArticles: latestArticleType[] = [
  {
    id: 1,
    image: "/images/blog1-img1.png",
    publishedDate: new Date(),
    author: "محمد حیدری",
    articleTitle: "پیشرو در تجزیه و تحلیل شیمیایی",
    description:
      "حوزه تجزیه و تحلیل شیمیایی در سال های اخیر شاهد نوآوری های قابل توجهی بوده است که به دلیل پیشرفت در فناوری و روش شناسی انجام شده است",
  },
  {
    id: 2,
    image: "/images/blog1-img2.png",
    publishedDate: new Date(),
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