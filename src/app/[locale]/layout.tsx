import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Acme Store ",
    template: "%s | Acme Store",
  },
  description:
    "Descubra roupas modernas e estilosas na Acme Clothing. Moda para todas as ocasiões com qualidade e personalidade.",
  keywords: [
    "roupas",
    "e-commerce de roupas",
    "moda",
    "vestuário",
    "camisetas",
    "roupas casuais",
    "loja online",
  ],
  authors: [{ name: "Acme Store", url: "https://acmeclothing.vercel.app" }],
  creator: "Acme Store",
  generator: "Next.js",
  openGraph: {
    title: "Acme Store",
    description:
      "Compre roupas de qualidade e com estilo na Acme Store. Looks que acompanham sua rotina com conforto e autenticidade.",
    url: "https://acmeclothing.vercel.app",
    siteName: "Acme Store",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} font-montserrat antialiased scroll-smooth`}
      >
        <NextIntlClientProvider>
          <AuthProvider>
            <OrdersProvider>
              <CartProvider>
                <CurrencyProvider>
                  <Navbar />
                  <main>{children}</main>
                  <Toaster />
                  <Footer />
                </CurrencyProvider>
              </CartProvider>
            </OrdersProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
