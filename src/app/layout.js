import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "timers.ing - cron expression generator and calculator online",
  description: "Fast and easy to use cron expression evaluator.From beginner to proficient in cron expression calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
