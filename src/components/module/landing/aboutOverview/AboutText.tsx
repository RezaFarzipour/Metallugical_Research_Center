import TitleStructure from "@/components/element/TitleStructure";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/utils/motion";
import BgAnimateShape from "@/components/element/animations/BgAnimateShape";

const AboutText: React.FC = () => {
  return (
    <div className="relative px-8 w-full xl:w-1/2 xl:pr-20 xl:pt-20">
      <TitleStructure size="1rem">ماموریت و چشم‌انداز ما</TitleStructure>
      <motion.div variants={fadeIn(0, 3, 1)}>
        <p className="xl:w-2/3 font-bold text-[22px] xl:text-[30px] pt-4">
          پشتیبانی از تحقیقات مواد با دقت، دانش و فناوری
        </p>
      </motion.div>
      <div className="xl:hidden absolute top-32 left-[-6.1rem]">
        <BgAnimateShape animation="animate-bounce" width="200" />
      </div>
      <motion.div variants={slideIn("left", "tween", 0.2, 1)}>
        <p className="pt-6 leading-7">
          آزمایشگاه متالوژی دانشگاه آزاد اسلامی واحد زنجان، با هدف توسعه دانش
          مواد و پشتیبانی از پروژه‌های پژوهشی دانشجویی و صنعتی، خدمات دقیق و
          متنوعی در زمینه تحلیل مواد فلزی و غیرفلزی ارائه می‌دهد. با بهره‌گیری
          از دستگاه‌های مدرن و کادر مجرب، تلاش می‌کنیم تا در تمامی آزمون‌ها
          استانداردهای بالای علمی و عملی را رعایت کنیم.
        </p>
      </motion.div>
      <motion.div variants={slideIn("left", "tween", 0.4, 1)}>
        <p className="pt-6 leading-7">
          چشم‌انداز ما، ایجاد یک مرکز مرجع منطقه‌ای در حوزه آزمایش و تحلیل مواد
          است. هدفمان این است که با تسهیل دسترسی به تجهیزات پیشرفته، زمینه لازم
          برای نوآوری و پیشرفت در علوم مواد را فراهم کنیم و به عنوان پلی بین
          دانشگاه و صنعت، نقش کلیدی در توسعه فناوری‌های داخلی ایفا کنیم.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutText;
