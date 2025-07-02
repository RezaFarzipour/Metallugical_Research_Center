import createServerApolloClient from "@/lib/apollo-server-client";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import BlogsPageClient from "./BlogsPageClient";

async function BlogsPage() {
  const client = createServerApolloClient();
  const { data: AllBlogs, loading } = await client.query({
    query: GET_ALL_BLOGS,
    fetchPolicy: "no-cache",
  });

  return <BlogsPageClient AllBlogs={AllBlogs.blogs} loading={loading} />;
}

export default BlogsPage;
