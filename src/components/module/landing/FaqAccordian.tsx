import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import Image from "next/image";
import { faqData } from "@/constants/data";
import TitleStructure from "@/components/element/TitleStructure";
import { motion } from "framer-motion";
import { fadeInSlide } from "@/utils/motion";

const FaqAccordian = () => {
  return (
    <>
      <h3 className="flex justify-center text-xl">
        <TitleStructure size="1rem">سوالات متداول</TitleStructure>
      </h3>

      <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center my-20 gap-10 px-10">
        {/* Accordion with animation */}
        <motion.div
          className="w-full md:w-1/2 max-w-2xl"
          variants={fadeInSlide("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Accordion variant="splitted">
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label="Accordion 1"
                title={item.question}
              >
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Image with animation */}
        <motion.div
          className="w-full md:w-1/2 max-w-lg flex justify-center"
          variants={fadeInSlide("down", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            width={350}
            height={350}
            src="/images/faqs.png"
            alt="faq"
            className="rounded-lg"
          />
        </motion.div>
      </div>
    </>
  );
};

export default FaqAccordian;
