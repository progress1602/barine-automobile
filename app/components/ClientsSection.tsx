"use client";
import Image from "next/image";
import React, { useRef } from "react";
import SectionDiv from "./SectionDiv";

const ClientsSection = () => {
  const clients = [
    { name: "Toyota", logo: "/client1.png" },
    { name: "Honda", logo: "/honda-logo.png" },
    { name: "Lexus", logo: "/lexus-logo.png" },
    { name: "Acura", logo: "/acura-logo.png" },
    {
      name: "Mercedes benz",
      logo: "/mercedes-benz-logo.png",
    },
    { name: "BMW", logo: "/bmw-logo.png" },

  ];

  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent) => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollLeft += e.deltaY * 0.5;
    }
  };

  return (
    <section className="md:py- overflow-hidden mt-20">
      <SectionDiv>
        <div className="text-start">
          <h5 className="font-bold mb-8 text-2xl text-gray-900">
            Explore Our Premium Brands
          </h5>

          {/* Marquee Container with Max Width */}
          <div className="relative max-w-7xl md:mt-10 mx-auto overflow-hidden">
            <div
              ref={marqueeRef}
              className="flex gap-6 overflow-x-auto no-scrollbar py-4 animate-marquee"
              onWheel={handleScroll}
              onMouseEnter={() => {
                if (marqueeRef.current) {
                  marqueeRef.current.style.animationPlayState = "paused";
                }
              }}
              onMouseLeave={() => {
                if (marqueeRef.current) {
                  marqueeRef.current.style.animationPlayState = "running";
                }
              }}
            >
              {/* Duplicate clients for seamless marquee effect */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  title={client.name}
                  className="flex-shrink-0 w-48 h-32 bg-white shadow rounded-lg flex flex-col items-center justify-center p-2"
                >
                  <Image
                    src={client.logo}
                    width={100}
                    height={100}
                    alt={`${client.name} logo`}
                    className="object-contain h-12"
                  />
                  <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionDiv>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
          display: inline-flex;
          width: max-content;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
