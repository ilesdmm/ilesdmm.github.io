import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ilesdmm.github.io"),
  title: "Renolicious — Full-Stack Roblox Developer",
  description:
    "Roblox gameplay systems, modular frameworks, AI, data, vehicles, and full-stack Luau development by Renolicious.",
  openGraph: {
    title: "Renolicious — Full-Stack Roblox Developer",
    description: "Built for performance. Ready to scale.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Renolicious — Full-Stack Roblox Developer",
    description: "Built for performance. Ready to scale.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
