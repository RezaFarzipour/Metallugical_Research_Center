import Layout from "@/components/containers/layout/Layout";
import ContactusHeader from "@/components/module/contactusHeader";

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        {/* banner section */}
        <ContactusHeader />
        {children}
      </Layout>
    </>
  );
}
