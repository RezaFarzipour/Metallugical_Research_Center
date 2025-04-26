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
        <HeaderImage headrName="خدمات" breadcrumbItem2="خدمات  ما" />
        <div className="xl:max-w-screen-xl ">{children}</div>
      </Layout>
    </>
  );
}
