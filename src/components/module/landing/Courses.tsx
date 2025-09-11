"use client";

import React from "react";
import { Card } from "@heroui/react";
import { FaBookOpen, FaFlask, FaCheckCircle } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import BgAnimateShape from "@/components/element/animations/BgAnimateShape";
import Button from "@/components/element/Button";
import { motion } from "framer-motion";
import { fadeInSlide, staggerContainer } from "@/utils/motion";

const Courses: React.FC = () => {
  return (
    <motion.section
      className="relative overflow-hidden py-20 lg:py-32 bg-gray-50"
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      animate="show"
    >
      {/* پس‌زمینه تزئینی */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(147,197,253,0.1)_0%,transparent_50%)]"></div>

      {/* المان‌های شناور */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <BgAnimateShape animation="animate-blink" />
      </div>
      <div className="absolute bottom-0 left-1 hidden lg:block">
        <BgAnimateShape animation="animate-blink" />
      </div>

      <motion.div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* متن معرفی */}
        <motion.div
          className="space-y-8 text-right"
          variants={fadeInSlide("right", "tween", 0.2, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-4">
            <h1 className="text-xl lg:text-4xl font-bold text-gray-900 leading-tight">
              دوره‌های{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                آموزشی
              </span>{" "}
              پیشرفته
            </h1>
            <p className="text-md lg:text-lg text-gray-600 leading-relaxed max-w-2xl">
              دانش و مهارت خود را با دوره‌های تخصصی مبتنی بر پژوهش ارتقا دهید.
              این دوره‌ها برای متخصصان و پژوهشگران در حوزه‌های علمی پیشرفته
              طراحی شده‌اند.
            </p>
          </div>

          {/* مراحل یادگیری */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 py-6">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center animate-pulse">
                <FaBookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">یادگیری</h3>
                <p className="text-sm text-gray-600">دروس علمی</p>
              </div>
            </div>

            <div className="flex items-center space-x-reverse space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center animate-pulse delay-150">
                <MdScience className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">تمرین</h3>
                <p className="text-sm text-gray-600">کارگاه‌های عملی</p>
              </div>
            </div>
          </div>

          {/* دکمه اقدام */}
          <div className="mt-8">
            <Button variant="primary" type="submit" path="/courses">
              مشاهده همه خدمات ...
            </Button>
          </div>
        </motion.div>

        {/* بخش تصویری */}
        <motion.div
          className="relative"
          variants={fadeInSlide("left", "tween", 0.4, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="relative bg-gradient-to-br from-blue-700 to-blue-500 rounded-3xl p-8 lg:p-12 shadow-2xl text-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <FaFlask className="w-6 h-6 mb-2" />
                <p className="text-sm">روش‌های تحقیق</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <MdScience className="w-6 h-6 mb-2" />
                <p className="text-sm">تکنیک‌های آزمایشگاهی</p>
              </div>
            </div>
          </Card>

          {/* نشانک شناور */}
          <motion.div
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce"
            variants={fadeInSlide("up", "tween", 0.6, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  خدمات معتبر
                </div>
                <div className="text-xs text-gray-600">تضمین کیفیت</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Courses;
