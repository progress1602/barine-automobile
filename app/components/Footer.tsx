// components/Footer.tsx
"use client";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0A1012] text-gray-400 pt-20 pb-10 mt-16 relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <Image
              src="/b1.png"
              alt="Barine Automobile Logo"
              width={150}
              height={50}
              className="mb-6"
            />
            <p className="mb-6 max-w-sm text-sm leading-relaxed">
              <span className="text-white font-semibold">Barine Automobile</span> – 
              Your trusted destination for premium cars. We specialize in selling both 
              brand-new and certified pre-owned vehicles, giving you the perfect balance 
              of performance, comfort, and reliability.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors uppercase text-sm tracking-wider"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors uppercase text-sm tracking-wider"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/catalogue"
                  className="hover:text-white transition-colors uppercase text-sm tracking-wider"
                >
                  Catalogue
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors uppercase text-sm tracking-wider"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-600" />
                <span>+234 803 312 2489, +234 802 602 2999</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-600" />
                <span>support@barineauto.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>#150 Aba Road, Port Harcourt, Rivers State</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-white">Barine Automobile</span>, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
