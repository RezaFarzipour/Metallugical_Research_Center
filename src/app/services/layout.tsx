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
        = <HeaderImage breadcrumbItem1="خدمات" panelHref="/" />
        <div className="mt-72">{children}</div>
      </Layout>
    </>
  );
}
