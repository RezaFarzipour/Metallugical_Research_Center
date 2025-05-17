import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
         <HeaderImage
          headrName="درباره ی ما"
          breadcrumbItem2="ارتباط با ما"
          panelHref="/contactus"
        /> 
        <div className="xl:max-w-screen-xl ">{children}</div>
      </Layout>
    </>
  );
}
