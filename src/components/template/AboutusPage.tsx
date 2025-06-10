"use client";
import React from "react";
import TitleStructure from "../element/TitleStructure";
import { services, whyUsItems } from "@/constants/data";
import { fadeInSlide } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-96 mb-20">
      <motion.div
        variants={fadeInSlide("up", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="mb-12">
          <h2 className=" md:text-2xl font-bold text-blue-800 mb-4">
            تخصص، دقت و فناوری در خدمت شما
          </h2>
          <p className="text-gray-700 leading-relaxed">
            آزمایشگاه متالوژی دانشگاه آزاد اسلامی واحد زنجان، یک مرکز تحقیقاتی
            مدرن و مجهز است که با بهره‌گیری از دستگاه‌های پیشرفته و کادر مجرب،
            خدمات تحلیلی و آزمایشی را به دانشجویان، محققین و صنعتگران ارائه
            می‌دهد.
            <br />
            با هدف توسعه دانش فناوری مواد و پشتیبانی از پروژه‌های تحقیقاتی، ما
            به عنوان یک مرکز منطقه‌ای، تلاش می‌کنیم استانداردهای بین‌المللی را
            در تمامی خدمات خود رعایت کنیم و زمینه دسترسی عمومی به امکانات تخصصی
            را فراهم نماییم.
          </p>
        </section>
      </motion.div>
      <section className="my-20 px-4">
        <div className="flex justify-center mb-12">
          <TitleStructure size="text-[1.3rem]">
            چرا ما را انتخاب کنید؟
          </TitleStructure>
        </div>

        <motion.div
          variants={fadeInSlide("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row-reverse items-start gap-10 max-w-6xl mx-auto">
            {/*  تصویر در کنار متن */}
            <div className="flex-shrink-0 w-full lg:w-1/2">
              <Image
                src="/images/about1-image1.png" 
                alt="چرا ما را انتخاب کنید"
                width={400}
                height={500}
                className="rounded-xl shadow-md object-cover"
              />
            </div>

            {/* لیست دلایل */}
            <div className="relative border-r-4 border-blue-200 w-full lg:w-1/2 ">
              {whyUsItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="mb-12 pr-10 relative group">
                    <div className="absolute -right-[0.6rem] top-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md">
                        <Icon className="text-3xl text-blue-600" />
                      </div>
                    </div>
                    <div className="transition-all duration-300 group-hover:scale-[1.01]">
                      <h3 className="text-lg font-bold text-blue-700 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="my-20 px-4">
        <div className="flex justify-center mb-12">
          <TitleStructure size="text-[1.3rem]">خدمات ما </TitleStructure>
        </div>
        <motion.div
          variants={fadeInSlide("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white shadow-md border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <Icon className="text-4xl text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
