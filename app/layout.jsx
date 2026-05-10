import { Cairo } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";
import { Suspense } from "react";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata = {
  title: "WE AI Assistant",
  description: "Sales platform login",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-[#f8f9fd] text-[#191c1f]`}
      >
        <QueryProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <main>{children}</main>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
