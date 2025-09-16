// components/Footer.tsx
"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0A1012] text-white py-16 mt-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-red-600 text-xl mb-4">
              <Image
                src="/b1.png"
                alt="Barine Automobile Logo"
                width={150}
                height={20}
                className="h-20 w-20"
              />
            </h2>

            <p className="text-gray-400 mb-2 max-w-md">
              Barine Automobile – Your trusted destination for premium cars.
              We specialize in selling both brand-new and certified pre-owned
              vehicles, giving you the perfect balance of performance, comfort,
              and reliability. Drive with confidence, drive with Barine.
            </p>
            <p className="text-gray-400 uppercase text-sm tracking-wider">
              CALL CENTER: +234 803 312 2489 or +234 802 602 2999
            </p>
            <p className="text-gray-400 uppercase text-sm tracking-wider mt-2">Address: #150 Aba Road, portharcourt, rivers state</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-red-600 text-xl mb-6">Quick links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white uppercase text-sm tracking-wider"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white uppercase text-sm tracking-wider"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/catalogue"
                  className="text-gray-400 hover:text-white uppercase text-sm tracking-wider"
                >
                  Catalogue
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white uppercase text-sm tracking-wider"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © 2025 Barine Automobile, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
