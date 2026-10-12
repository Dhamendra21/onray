import { Inter, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata = {
  title: "Onray Solar Solution | Premium Solar Installations",
  description: "Power Your Future. Not Your Electricity Bills. Professionally designed solar solutions for homes and businesses in India.",
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter bg-onray-white text-onray-charcoal overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
