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
        <HeaderImage
          headrName="بلاگ ها "
          breadcrumbItem2="بلاگ ها"
          panelHref="/aboutus"
        />
        <div className=" ">{children}</div>
      </Layout>
    </>
  );
}
