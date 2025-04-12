import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import Image from "next/image";
import { faqData } from "@/constants/data";
const FaqAccordian = () => {

  return (
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
          src="/images/5167172.jpg"
          alt="faq"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default FaqAccordian;
