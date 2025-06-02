"use client";

import { usePathname } from "next/navigation";
import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // مسیرهایی مثل: /blogs/[slug]/[blogId]
  const isBlogDetailPage = /^\/blogs\/[^\/]+\/[^\/]+$/.test(pathname);

  if (isBlogDetailPage) {
    // لیوت اصلی اعمال نشه
    return <>{children}</>;
  }

  return (
    <Layout>
      {/* banner section */}
      <HeaderImage breadcrumbItem1="  بلاگ" panelHref="/" />
      <div className="mt-72">{children}</div>
    </Layout>
  );
}
