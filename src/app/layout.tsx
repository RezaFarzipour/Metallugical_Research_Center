import type { Metadata } from "next";
import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import clsx from "clsx";
import { fontIRANYekan } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontIRANYekan.variable
        )}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
