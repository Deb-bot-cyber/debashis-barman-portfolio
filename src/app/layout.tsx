import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Debashis Barman | SaaS Product Designer & AI Automation Consultant",
  description:
    "Senior SaaS Product Designer & AI Automation Specialist helping tech founders build high-converting UI/UX design systems and automated n8n workflows.",
  keywords: [
    "Product Designer",
    "UI UX Designer",
    "SaaS Designer",
    "SaaS Product Design",
    "Website Designer",
    "Landing Page Designer",
    "Dashboard Designer",
    "Mobile App Designer",
    "Figma Expert",
    "Design Systems",
    "Framer Developer",
    "AI Automation",
    "n8n Automation",
    "Workflow Automation",
    "Business Automation",
    "UX Consultant",
    "Product Design Services",
  ],
  authors: [{ name: "Debashis Barman" }],
  metadataBase: new URL("https://debashisbarman.com"),
  alternates: {
    canonical: "https://debashisbarman.com",
  },
  openGraph: {
    title: "Debashis Barman | SaaS Product Designer & AI Automation Specialist",
    description:
      "Transforming complex SaaS ideas into intuitive UI/UX design systems and automated n8n workflows that scale revenue.",
    url: "https://debashisbarman.com",
    siteName: "Debashis Barman Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debashis Barman | Senior SaaS Product Designer",
    description:
      "High-converting SaaS UI/UX design, custom Framer websites, and AI n8n workflow automations for growth-stage startups.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${cormorant.variable} antialiased bg-[#f8fcf3] text-[#111111]`}
      >
        {children}
      </body>
    </html>
  );
}
