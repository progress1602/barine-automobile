"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What do I need to rent a car?",
    answer:
      "You need a valid driver's license, a credit/debit card, and proof of insurance (if required).",
  },
  {
    question: "What is the minimum age to rent a car?",
    answer:
      "The minimum age is typically 21, but it may vary depending on location and vehicle type. Drivers under 25 may incur a young driver fee.",
  },
  {
    question: "Can I rent a car without a credit card?",
    answer:
      "Some locations allow rentals with a debit card, but additional requirements may apply.",
  },
  {
    question: "What types of cars do you offer?",
    answer:
      "We have a variety of vehicles, including economy, SUVs, luxury, and vans.",
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "A late return may result in extra charges. Please contact us if you need to extend your rental.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Specify type for state

  const toggleFAQ = (index: number) => {
    // Explicitly type index as number
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-black p-6 max-w-2xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">FAQ</h2>
      <div className="space-y-2">
        {faqs.map(
          (
            faq,
            index: number // Explicitly type index
          ) => (
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
          )
        )}
      </div>
    </div>
  );
}
