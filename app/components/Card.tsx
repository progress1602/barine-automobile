import React from "react";

const ServiceGrid = () => {
  const services = [
    {
      title: "Deals For Every Budget",
      description:
        "Corporis suscipit laboriosa, nisi ut aliquid ex commodi vel conset? Et harum quidem est.",
    },
    {
      title: "Cleanliness & Comfort",
      description:
        "Corporis suscipit laboriosa, nisi ut aliquid ex commodi vel conset? Et harum quidem est.",
    },
    {
      title: "Best Prices Garanteed",
      description:
        "Corporis suscipit laboriosa, nisi ut aliquid ex commodi vel conset? Et harum quidem est.",
    },
    {
      title: "24/7 Order Available",
      description:
        "Corporis suscipit laboriosa, nisi ut aliquid ex commodi vel conset? Et harum quidem est.",
    },
    {
      title: "Professional Drivers",
      description:
        "Corporis suscipit laboriosa, nisi ut aliquid ex commodi vel conset? Et harum quidem est.",
    },
    {
      title: "Fast Car Delivery",
      description:
        "Corporis suscipit laboriosa, nisi ut aliquid ex commodi vel conset? Et harum quidem est.",
    },
  ];

  // First row of services
  const topRow = services.slice(0, 3);
  // Second row of services
  const bottomRow = services.slice(3, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb">
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
              <button className="flex items-center text-orange-600 hover:underline font-semibold decoration-orange-600  mt-4 uppercase text-sm tracking-wider ">
                + VIEW MORE
              </button>
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
              <button className="flex items-center text-orange-600 hover:underline font-semibold decoration-orange-600  mt-4 uppercase text-sm tracking-wider">
                + VIEW MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
