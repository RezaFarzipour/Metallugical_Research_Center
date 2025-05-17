import React from "react";

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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">خدمات ما</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>آزمایش‌های روتین (خون، ادرار، مدفوع)</li>
          <li>آزمایش‌های هورمونی و تیروئید</li>
          <li>تست‌های تخصصی قلب، کبد و کلیه</li>
          <li>غربالگری بارداری و نوزادان</li>
          <li>آزمایش‌های ژنتیک و مولکولی</li>
          <li>مشاوره تخصصی با پزشکان مجرب</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">چرا ما؟</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li>✅ پاسخ‌دهی سریع و دقیق</li>
          <li>✅ همکاری با بیمه‌های معتبر</li>
          <li>✅ سیستم نوبت‌دهی آنلاین</li>
          <li>✅ رعایت کامل اصول بهداشتی و ایمنی</li>
          <li>✅ محیط آرام و کادر خوش‌برخورد</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          ماموریت ما
        </h2>
        <p className="text-gray-700 leading-relaxed">
          ارائه خدمات آزمایشگاهی مبتنی بر{" "}
          <strong>صداقت، دقت و مسئولیت‌پذیری</strong> برای کمک به ارتقاء سلامت
          جامعه.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          ارتباط با ما
        </h2>
        <p className="text-gray-700 leading-relaxed">
          آدرس: [آدرس دقیق آزمایشگاه]
          <br />
          تلفن: [شماره تماس]
          <br />
          ساعات کاری: [مثلاً هر روز از ساعت ۷ تا ۱۹]
          <br />
          شبکه‌های اجتماعی: [اینستاگرام، واتساپ، تلگرام در صورت وجود]
        </p>
      </section>
    </div>
  );
}
