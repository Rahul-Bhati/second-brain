import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google"
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Second Brain",
  description: "use to store msg, notes and other importan thing thaat you can find here instatly",
};

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={outfit.className}
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
