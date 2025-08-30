import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دوره ها",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        <HeaderImage breadcrumbItem1="دوره" panelHref="/" />
        <div className="mt-72">{children}</div>
      </Layout>
    </>
  );
}
