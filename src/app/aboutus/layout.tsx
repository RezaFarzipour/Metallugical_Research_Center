import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما",
};
export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        <HeaderImage breadcrumbItem1=" درباره ما" panelHref="/" />
        <div className="xl:max-w-screen-xl ">{children}</div>
      </Layout>
    </>
  );
}
