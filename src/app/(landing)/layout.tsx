import Layout from "@/components/containers/layout/Layout";

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
