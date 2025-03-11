import React from "react";

const ServiceGrid = () => {
  const services = [
    {
      title: "Deals For Every Budget",
      description:
        "Find the perfect car rental at the right price! Whether you're looking for an affordable compact car, a family-friendly SUV, or a luxury ride, we offer deals to fit every budget. ",
    },
    {
      title: "Cleanliness & Comfort",
      description:
        "Enjoy a spotless and well-maintained ride with our car rentals. Every vehicle is thoroughly cleaned and sanitized for your safety and comfort. ",
    },
    {
      title: "Best Prices Garanteed",
      description:
        "Get the best deals on car rentals with our price match guarantee! We offer competitive rates to ensure you get the most value for your money.",
    },
    {
      title: "24/7 Order Available",
      description:
        "Rent a car anytime, anywhere! Our service is available 24/7, ensuring you can book a vehicle whenever you need it.",
    },
    {
      title: "Professional Drivers",
      description:
        "Ride with confidence knowing our experienced and courteous drivers are here to provide a safe and comfortable journey. ",
    },
    {
      title: "Fast Car Delivery",
      description:
        "Get on the road quickly with our fast and efficient car delivery service. Whether you need a rental at your doorstep, hotel, or airport, we ensure timely delivery so you can start your journey without delay.",
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
              {/* <button className="flex items-center text-red-600 hover:underline font-semibold decoration-red-600  mt-4 uppercase text-sm tracking-wider ">
                + VIEW MORE
              </button> */}
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
              {/* <button className="flex items-center text-red-600 hover:underline font-semibold decoration-red-600  mt-4 uppercase text-sm tracking-wider">
                + VIEW MORE
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
