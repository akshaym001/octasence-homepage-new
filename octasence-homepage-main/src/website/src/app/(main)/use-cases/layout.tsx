import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OctaSense — Use Cases",
  description: "AI-Powered Predictive Intelligence for Critical Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
