"use client";

import { usePathname } from "next/navigation";
import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";
// export async function generateMetadata({ params }: Props) {
//   const { categorySlug } = await params;
//   return {
//     title: `بلاگ‌های ${categorySlug}`,
//     description: `بلاگ‌های مربوط به دسته‌بندی ${categorySlug}`,
//   };
// }
export default function BlogLayout({
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
      <HeaderImage breadcrumbItem1="بلاگ" panelHref="/" />
      <main className="md:col-span-9 lg:col-span-10 ">{children}</main>
    </Layout>
  );
}
