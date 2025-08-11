import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/_home/Header";
import { Footer } from "@/components/_home/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Utility AI Apps",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
