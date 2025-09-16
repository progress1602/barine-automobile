import React from "react";

const ServiceGrid = () => {
  const services = [
    {
      title: "Cars for Every Budget",
      description:
        "Whether you're looking for a reliable starter car, a spacious family SUV, or a premium luxury ride, Barine Automobiles has the right option to fit your budget and lifestyle.",
    },
    {
      title: "Quality & Comfort",
      description:
        "Every car we sell is thoroughly inspected to ensure excellent performance, safety, and comfort. Drive home with confidence knowing your car is in top condition.",
    },
    {
      title: "Best Prices Guaranteed",
      description:
        "We offer highly competitive prices on all our vehicles. With Barine Automobiles, you’re assured of getting the best value for your money.",
    },
    {
      title: "Available Anytime",
      description:
        "Our sales team is ready to assist you whenever you need. From inquiries to test drives, we make the car buying process simple and always available.",
    },
    {
      title: "Trusted Experts",
      description:
        "Our experienced and professional staff will guide you through every step — from choosing the right car to securing the best financing options.",
    },
    {
      title: "Fast & Hassle-Free Delivery",
      description:
        "Once you’ve made your choice, we ensure a quick and seamless car delivery process so you can start enjoying your new vehicle without delay.",
    },
  ];

  // First row of services
  const topRow = services.slice(0, 3);
  // Second row of services
  const bottomRow = services.slice(3, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt">
        {topRow.map((service, index) => (
          <div
            key={index}
            className={`
              p-6
              ${index !== 2 ? "md:border-r" : ""} 
              border-b
              border-gray-200
            `}
          >
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-medium text-gray-900">
                {service.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {bottomRow.map((service, index) => (
          <div
            key={index}
            className={`
              p-6
              ${index !== 2 ? "md:border-r" : ""} 
              border-gray-200
              ${index < bottomRow.length - 1 ? "border-b md:border-b-0" : ""}
            `}
          >
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-medium text-gray-900">
                {service.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
