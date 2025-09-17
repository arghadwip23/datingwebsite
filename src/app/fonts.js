import { Macondo_Swash_Caps, Inter } from "next/font/google";

export const macondoSwashCaps = Macondo_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-macondo-swash-caps",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
