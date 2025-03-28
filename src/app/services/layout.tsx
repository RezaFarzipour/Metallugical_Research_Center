import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        {/* banner section */}
        <HeaderImage headrName="خدمات ها" breadcrumbItem2="خدمات های ما" />
        {children}
      </Layout>
    </>
  );
}
