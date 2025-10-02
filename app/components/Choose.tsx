// components/WhyChooseUs.tsx
"use client";

import { DollarSign, ShieldCheck, Receipt, Car } from "lucide-react";

const features = [
  {
    icon: <DollarSign className="w-10 h-10 text-red-600" />,
    title: "Special Financing Offers",
    description:
      "Get flexible payment plans and exclusive financing options designed to fit your budget.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-red-600" />,
    title: "Trusted Car Dealership",
    description:
      "With years of experience and thousands of happy customers, you can count on us with confidence.",
  },
  {
    icon: <Receipt className="w-10 h-10 text-red-600" />,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises just clear and upfront pricing on every vehicle.",
  },
  {
    icon: <Car className="w-10 h-10 text-red-600" />,
    title: "Expert Car Service",
    description:
      "Our certified technicians provide reliable maintenance and repairs to keep your car running like new.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 mt-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
