import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Electrothon 8.0 | NITH",
  description:
    "As the screen flickers to life, a new chapter of Electrothon begins. Within this labyrinth, progress belongs to those who sense the pattern, master the turns, and endure the chase. What appears as play soon reveals itself as a trial of logic and ingenuity, where every move shapes the outcome. Under the banner of SPEC, NIT Hamirpur, Electrothon has drawn thousands of creators into its ever-evolving maze. Those who have ventured through its levels before left their mark on its circuitry, forging a legacy etched in code. Now, the labyrinth resets once more, its cycle unbroken, ready to challenge the next generation to beat the system and redefine what's possible.",

  keywords: [
    "Electrothon",
    "Electrothon 8.0",
    "Hackathon",
    "Labyrinth of Eternum",
    "SPEC NITH",
    "SPEC",
    "NIT Hamirpur Hackathon",
    "Coding",
    "Innovation",
    "Student Run Hackathon",
  ],

  authors: [{ name: "Team SPEC" }],

  openGraph: {
    title: "Electrothon 8.0 | Labyrinth of Eternum",
    description:
      "As the screen flickers to life, a new chapter of Electrothon begins. Within this labyrinth, progress belongs to those who sense the pattern, master the turns, and endure the chase. What appears as play soon reveals itself as a trial of logic and ingenuity, where every move shapes the outcome. Under the banner of SPEC, NIT Hamirpur, Electrothon has drawn thousands of creators into its ever-evolving maze. Those who have ventured through its levels before left their mark on its circuitry, forging a legacy etched in code. Now, the labyrinth resets once more, its cycle unbroken, ready to challenge the next generation to beat the system and redefine what's possible.",
    url: "https://electrothon.nith.ac.in/",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Electrothon 8.0 | NITH",
    description:
      "As the screen flickers to life, a new chapter of Electrothon begins. Within this labyrinth, progress belongs to those who sense the pattern, master the turns, and endure the chase. What appears as play soon reveals itself as a trial of logic and ingenuity, where every move shapes the outcome. Under the banner of SPEC, NIT Hamirpur, Electrothon has drawn thousands of creators into its ever-evolving maze. Those who have ventured through its levels before left their mark on its circuitry, forging a legacy etched in code. Now, the labyrinth resets once more, its cycle unbroken, ready to challenge the next generation to beat the system and redefine what's possible.",
  },

  appleWebApp: {
    capable: true,
    title: "Electrothon 8.0",
  },

  metadataBase: new URL("https://electrothon.nith.ac.in/"),
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
       
        <Preloader>
          {children}
        </Preloader>
      </body>
    </html>
  );
}
