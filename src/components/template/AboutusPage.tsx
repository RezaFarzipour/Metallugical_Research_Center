import React from "react";
import {
  FaHeartbeat,
  FaNotesMedical,
  FaCalendarCheck,
  FaShieldAlt,
  FaSmile,
  FaVial,
  FaFlask,
  FaBaby,
  FaDna,
  FaUserMd,
} from "react-icons/fa";
import TitleStructure from "../element/TitleStructure";

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-96 mb-20">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          پیشگام در ارائه خدمات آزمایشگاهی دقیق و مطمئن
        </h2>
        <p className="text-gray-700 leading-relaxed">
          آزمایشگاه ما با بیش از <strong>X سال سابقه</strong> فعالیت تخصصی، با
          بهره‌گیری از تجهیزات پیشرفته و تیمی متخصص، خدماتی سریع، دقیق و قابل
          اعتماد ارائه می‌دهد. دقت در نتایج آزمایشگاهی برای ما یک اصل اساسی در
          تصمیم‌گیری‌های پزشکی است.
        </p>
      </section>
      <section className="mb-20 px-4">
        <div className="flex justify-center mb-12">
          <TitleStructure size="text-[1.7rem]">
            چرا ما را انتخاب کنید؟
          </TitleStructure>
        </div>

        <div className="relative border-r-4 border-blue-200 max-w-3xl mx-auto">
          {whyUsItems.map((item, index) => (
            <div key={index} className="mb-12 pr-10 relative group">
              {/* نقطه و آیکون در خط */}
              <div className="absolute -right-[0.6rem] top-0">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md">
                  {item.icon}
                </div>
              </div>

              {/* متن و عنوان */}
              <div className="transition-all duration-300 group-hover:scale-[1.01]">
                <h3 className="text-lg font-bold text-blue-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20 px-4">
        <div className="flex justify-center mb-12">
          <TitleStructure size="text-[1.7rem]">خدمات ما </TitleStructure>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-4 rounded-xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-blue-700">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    icon: <FaVial className="text-4xl text-blue-600" />,
    title: "آزمایش‌های روتین",
    desc: "انجام انواع آزمایش خون، ادرار، مدفوع و چکاپ‌های دوره‌ای",
  },
  {
    icon: <FaFlask className="text-4xl text-blue-600" />,
    title: "آزمایش‌های هورمونی و تیروئید",
    desc: "بررسی هورمون‌ها و عملکرد غده تیروئید با دقت بالا",
  },
  {
    icon: <FaHeartbeat className="text-4xl text-blue-600" />,
    title: "تست‌های تخصصی قلب، کبد و کلیه",
    desc: "تشخیص بیماری‌های قلبی، کبدی و کلیوی با متدهای پیشرفته",
  },
  {
    icon: <FaBaby className="text-4xl text-blue-600" />,
    title: "غربالگری بارداری و نوزادان",
    desc: "بررسی سلامت جنین و نوزادان با دقت بالا",
  },
  {
    icon: <FaDna className="text-4xl text-blue-600" />,
    title: "آزمایش‌های ژنتیک و مولکولی",
    desc: "تحلیل دقیق ژن‌ها برای شناسایی بیماری‌های وراثتی",
  },
  {
    icon: <FaUserMd className="text-4xl text-blue-600" />,
    title: "مشاوره با پزشکان مجرب",
    desc: "دریافت مشاوره تخصصی از پزشکان حرفه‌ای ما",
  },
];

const whyUsItems = [
  {
    icon: <FaHeartbeat className="text-3xl text-blue-600" />,
    title: "پاسخ‌دهی سریع و دقیق",
    desc: "ما با بهره‌گیری از تجهیزات پیشرفته، نتایج را در کوتاه‌ترین زمان ممکن ارائه می‌دهیم.",
  },
  {
    icon: <FaNotesMedical className="text-3xl text-blue-600" />,
    title: "همکاری با بیمه‌های معتبر",
    desc: "پوشش هزینه‌ها از طریق بیمه‌های طرف قرارداد ما امکان‌پذیر است.",
  },
  {
    icon: <FaCalendarCheck className="text-3xl text-blue-600" />,
    title: "نوبت‌دهی آنلاین",
    desc: "با چند کلیک ساده نوبت خود را رزرو کنید، بدون اتلاف وقت.",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-blue-600" />,
    title: "رعایت اصول بهداشتی",
    desc: "رعایت دقیق پروتکل‌های بهداشتی اولویت ماست.",
  },
  {
    icon: <FaSmile className="text-3xl text-blue-600" />,
    title: "محیط آرام و کادر خوش‌برخورد",
    desc: "تجربه‌ای خوشایند از حضور در فضای درمانی.",
  },
];
