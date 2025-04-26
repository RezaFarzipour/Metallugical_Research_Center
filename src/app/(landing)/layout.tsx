import Layout from "@/components/containers/layout/Layout";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        <div className="xl:max-w-screen-xl ">{children}</div>
      </Layout>
    </>
  );
}
