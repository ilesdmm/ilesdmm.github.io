import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ilesdmm.github.io"),
  title: "Renolicious | Roblox Systems Developer",
  description:
    "Roblox gameplay systems, scalable frameworks, vehicles, AI, inventories, progression, and custom scripting by Renolicious.",
  openGraph: {
    type: "website",
    url: "https://ilesdmm.github.io/",
    siteName: "Renolicious",
    title: "Renolicious | Roblox Systems Developer",
    description:
      "Roblox gameplay systems, scalable frameworks, vehicles, AI, inventories, progression, and custom scripting by Renolicious.",
  },
  twitter: {
    card: "summary",
    title: "Renolicious | Roblox Systems Developer",
    description:
      "Roblox gameplay systems, scalable frameworks, vehicles, AI, inventories, progression, and custom scripting by Renolicious.",
  },
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
