import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renolicious | Roblox Systems Developer",
  description:
    "Roblox gameplay systems, scalable frameworks, vehicles, AI, inventories, progression, and custom scripting by Renolicious.",
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
