import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import Image from "next/image";
import { faqData } from "@/constants/data";
import TitleStructure from "@/components/element/TitleStructure";
import SectionWrapper from "@/hoc/SectionWrapper";
const FaqAccordian = () => {
  return (
    <>
      <h3 className="flex justify-center  text-xl">
        <TitleStructure size="1rem">سوالات متدوال</TitleStructure>
      </h3>
      <div className="w-full flex  flex-col-reverse md:flex-row justify-center items-center my-20 gap-10 px-10">
        {/* accordian */}
        <div className="w-full md:w-1/2 max-w-2xl">
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
        </div>

        {/* تصویر */}
        <div className="w-full md:w-1/2 max-w-lg flex justify-center">
          <Image
            width={350}
            height={350}
            src="/images/faqs.png"
            alt="faq"
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(FaqAccordian, "Faqs");
