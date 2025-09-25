import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieNotification from './components/CookieNotification';
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B.AUTOS",
  description:
    "Barine Automobile offers car sales, auto repair, spare parts, and professional vehicle services in Port Harcourt, Rivers State, Nigeria.",
  openGraph: {
  title: "Barine Automobile | Port Harcourt",
  description:
    "Trusted automobile company in Port Harcourt, Rivers State. We sell cars, offer repairs, and supply spare parts.",
  url: "https://yourwebsite.com/",
  type: "website", // ✅ type-safe
  images: [
    {
      url: "/public/b1.png",
      width: 1200,
      height: 630,
      alt: "Barine Automobile Logo",
    },
  ],
},

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
        <CookieNotification />
      </body>
    </html>
  );
}
