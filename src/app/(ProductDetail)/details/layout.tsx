import Layout from "@/components/containers/layout/Layout";

export default function DetailsLayout({ children }: { children: React.ReactNode }) {
   return (
    <Layout>
        {children}
    </Layout>
   )
  }