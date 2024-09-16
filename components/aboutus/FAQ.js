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
      question: "What is AUTO LINKX?",
      answer:
        "AUTO LINKX is an online platform that connects customers with a wide range of certified car service providers. We offer options for mobile services, onsite services, and third-party pick-and-drop-off services to suit your needs and convenience.",
    },
    {
      question: "How does AUTO LINKX work?",
      answer:
        "Simply browse through our list of services, choose the type of service you need (mobile, onsite, or pick and drop-off), and book an appointment. Our platform will match you with a certified service provider who will handle the rest.",
    },
    {
      question: "How do I book a service?",
      answer:
        "To book a service, visit our website, select the type of service you need, fill in the required details, and choose a convenient time slot. You will receive a confirmation once your booking is complete.",
    },
    {
      question: "What types of services can I book through AUTO LINKX?",
      answer:
        "We offer a variety of car services including general maintenance, paint and dent repair, auto glass replacement, electrical work, mechanical repairs, and air conditioning services.",
    },
    {
      question: "How do I know which service provider to choose?",
      answer:
        "Our platform provides detailed profiles, customer reviews, and ratings for each service provider. This information helps you make an informed decision based on the experiences of other customers.",
    },
    {
      question: "Can I request a specific service provider?",
      answer:
        "Yes, you can request a specific service provider if you have a preference. However, availability may vary, and we will confirm if your chosen provider is available at your preferred time.",
    },
    {
      question: "What are mobile services?",
      answer:
        "Mobile services are when a service provider comes to your location to perform the necessary maintenance or repair on your vehicle. This is convenient if you prefer not to visit a service center.",
    },
    {
      question: "What are onsite services?",
      answer:
        "Onsite services require you to bring your car to the service provider's facility. This option is suitable for more complex repairs that need specialized equipment available at the service center.",
    },
    {
      question: "What is a third-party pick and drop-off service?",
      answer:
        "This service allows you to have your car picked up from your location, serviced at the provider's facility, and then dropped off back to you. It offers the convenience of not having to drive your car to the service center yourself.",
    },
    {
      question: "How do I pay for the services?",
      answer:
        "Payments can be made securely through our platform using various methods such as credit/debit cards, PayPal, or other digital payment options. You will receive a receipt upon successful payment.",
    },
    {
      question: "Are the prices fixed or can they vary?",
      answer:
        "Prices for standard services are typically fixed. However, for complex repairs, the service provider may need to inspect your vehicle to give an accurate estimate. Any price variations will be communicated to you before work begins.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is our priority. If you are not happy with the service, please contact our customer support team. We will work with the service provider to address your concerns and find a suitable resolution.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@AUTO LINKX.com or call us at [0415599996]. Our team is available [9 am to 6 pm Mon to Fri, Public holidays may vary] to assist you with any queries or issues.",
    },
    {
      question: "How do I leave a review for a service provider?",
      answer: "After your service is complete, you will receive an email with a link to leave a review. Your feedback helps other customers and allows us to maintain high service standards.",
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
