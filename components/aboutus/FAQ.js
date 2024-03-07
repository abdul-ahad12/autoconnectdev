import React from "react";
import TitleDesc from "../section/TitleDesc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/common/Accordian";

const FAQ = () => {
  const content = [
    {
      question: "Is there a free trail available?",
      answer:
        "Yes! we provide a free trail for the first month . where you can get the services such as car wash paint sent repair for free for the first month .after that month we have the 30$ per month fee as registration and rest as service charged .",
    },
    {
      question: "Is there a free trail available?",
      answer:
        "Yes! we provide a free trail for the first month . where you can get the services such as car wash paint sent repair for free for the first month .after that month we have the 30$ per month fee as registration and rest as service charged .",
    },
    {
      question: "Is there a free trail available?",
      answer:
        "Yes! we provide a free trail for the first month . where you can get the services such as car wash paint sent repair for free for the first month .after that month we have the 30$ per month fee as registration and rest as service charged .",
    },
    {
      question: "Is there a free trail available?",
      answer:
        "Yes! we provide a free trail for the first month . where you can get the services such as car wash paint sent repair for free for the first month .after that month we have the 30$ per month fee as registration and rest as service charged .",
    },
    {
      question: "Is there a free trail available?",
      answer:
        "Yes! we provide a free trail for the first month . where you can get the services such as car wash paint sent repair for free for the first month .after that month we have the 30$ per month fee as registration and rest as service charged .",
    },
  ];
  return (
    <div id="faqs" className="w-full bg-[#F2F1F0] flex justify-center relative">
      <div className="w-[90%] py-[5rem] flex flex-col items-center">
        <TitleDesc
          title={"Frequently Asked"}
          titleColor={"Questions"}
          desc={"Everythng you need to know about us"}
        />

        <Accordion
          type="single"
          collapsible
          className="base:w-[90%] flex flex-col text-start base:gap-5 lg:gap-10 lg:w-[80%]    rounded-lg my-16"
        >
          {content.map((data, idx) => (
            <AccordionItem
              className="bg-customwhite base:px-3 lg:px-10 rounded-lg"
              key={idx}
              value={`item-${idx + 1}`}
            >
              <AccordionTrigger className="base:text-[1rem] lg:text-[1.2rem] font-medium">
                {data.question}
              </AccordionTrigger>
              <AccordionContent className="text-graycolor2 lg:text-[0.9rem] tracking-wide">
                {data.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
