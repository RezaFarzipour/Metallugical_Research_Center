import Layout from "@/components/containers/layout/Layout";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        <div>{children}</div>
      </Layout>
    </>
  );
}
