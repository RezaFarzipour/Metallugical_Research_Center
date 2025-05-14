import TitleStructure from "@/components/element/TitleStructure";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/utils/motion";

const AboutText: React.FC = () => {
  return (
    <div className="w-1/2 pr-20 pt-20">
      <TitleStructure size="1rem">ماموریت و چشم‌انداز ما</TitleStructure>
      <motion.div variants={fadeIn(0, 3, 1)}>
        <p className="w-2/3 font-bold text-[30px] pt-4">
          قدرت‌بخشی به کشفیات علمی آزمایشگاهی برای آینده.
        </p>
      </motion.div>

      <motion.div variants={slideIn("left", "tween", 0.2, 1)}>
        <p className="pt-6 leading-7">
          در ماموریت ما این است که با ارائه نتایج دقیق، قابل اعتماد و به موقع،
          جامعه علمی را قدرتمند کنیم. ما به دنبال تقویت توانایی‌های تحقیقاتی،
          حرکت به سمت نوآوری و کمک به بهبود جامعه از طریق تعهد بی‌چون و چرای خود
          به دقت و کیفیت هستیم.
        </p>
      </motion.div>
      <motion.div variants={slideIn("left", "tween", 0.4, 1)}>
        <p className="pt-6 leading-7">
          ما آینده‌ای را تصور می‌کنیم که در آن پیشرفت‌های علمی جهانی بهتری را
          شکل دهند. هدف ما این است که در خط مقدم این تحول قرار بگیریم و ابزارها،
          دانش و تخصص لازم برای کشفیات بزرگ و نوآورانه را فراهم کنیم.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutText;
