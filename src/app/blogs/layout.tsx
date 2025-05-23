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
                
                breadcrumbItem1="  بلاگ"
                panelHref="/"
        />
        <div className=" ">{children}</div>
      </Layout>
    </>
  );
}
