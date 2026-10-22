import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../redux/ReduxProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#215935",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://match2health.com"),
  title: {
    default: "Medicare Hospitals - Healthcare Organization Plans & Staffing",
    template: "%s | Medicare Hospitals",
  },
  description:
    "Choose the right organization plan for Medicare Hospitals. Access AI-powered candidate search, team management, unlimited job posts, and a 14-day free trial.",
  keywords: [
    "Medicare Hospitals",
    "healthcare staffing",
    "medical recruitment",
    "hospital organization plans",
    "doctor hiring",
    "candidate ranking",
    "healthcare management",
  ],
  authors: [{ name: "Medicare Hospitals" }],
  creator: "Medicare Hospitals",
  publisher: "Medicare Hospitals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Medicare Hospitals - Healthcare Organization Plans & Staffing",
    description:
      "All plans include full feature access, team member accounts, AI candidate search, and a 14-day free trial.",
    url: "https://match2health.com",
    siteName: "Medicare Hospitals",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/LogoSignet.png",
        width: 800,
        height: 600,
        alt: "Medicare Hospitals Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicare Hospitals - Healthcare Organization Plans",
    description:
      "Choose the right plan for your medical organization with full feature access and a 14-day free trial.",
    images: ["/LogoSignet.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/LogoSignet.png",
    shortcut: "/LogoSignet.png",
    apple: "/LogoSignet.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Medicare Hospitals Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "49.00",
      highPrice: "299.00",
      offerCount: "4",
      offers: [
        {
          "@type": "Offer",
          name: "1–49 Employees Plan",
          price: "49.00",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
        {
          "@type": "Offer",
          name: "50–299 Employees Plan",
          price: "99.00",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
        {
          "@type": "Offer",
          name: "300–999 Employees Plan",
          price: "199.00",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
        {
          "@type": "Offer",
          name: "999+ Employees Plan",
          price: "299.00",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      ],
    },
    description:
      "Healthcare recruitment and organization management platform with AI candidate search, resume download, and team collaboration.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans min-h-screen bg-white text-black antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
