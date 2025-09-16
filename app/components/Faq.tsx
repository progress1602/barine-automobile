"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who is Barine Automobile?",
    answer:
      "Barine Automobile is a trusted car dealership specializing in quality vehicles at competitive prices. We pride ourselves on reliability, transparency, and excellent customer service.",
  },
  {
    question: "Do you sell both new and used cars?",
    answer:
      "Yes, we offer a wide range of both brand-new and certified pre-owned vehicles, carefully inspected to ensure quality and performance.",
  },
  {
    question: "Can I finance a car with Barine Automobile?",
    answer:
      "Absolutely. We provide flexible financing and installment options to make owning your dream car easier and more affordable.",
  },
  {
    question: "Do you allow test drives?",
    answer:
      "Yes, customers are welcome to schedule test drives before making a purchase to ensure the car suits their needs and preferences.",
  },
  {
    question: "Do your cars come with a warranty?",
    answer:
      "All our vehicles come with a warranty or guarantee. Specific warranty terms may vary depending on the car’s make, model, and whether it’s new or pre-owned.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-black p-6 max-w-2xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Barine Automobile – FAQ
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index: number) => (
          <div
            key={index}
            className="border-b border-gray-700 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center font-medium py-4">
              <span className="text-lg">{faq.question}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === index && (
              <p className="text-black pb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
