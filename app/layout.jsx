import { Cairo } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "600", "700", "800", "900", "1000"],
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
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
