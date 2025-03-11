import NavBar from "@/components/layout/Components/navBar/page";
import Layout from "@/components/layout/Layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
