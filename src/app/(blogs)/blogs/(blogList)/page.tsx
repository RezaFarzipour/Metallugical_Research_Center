import createServerApolloClient from "@/lib/apollo-server-client";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import BlogPage from "@/components/template/blogs/blogsPage";

export const metadata = {
  //   title: "Bolgs",
  title: {
    absolute: "blogs", // ignore %s in parent layout.
  },
};

async function BlogsPage() {
  const client = createServerApolloClient();

  //getting data server-side with react-query
  const { data: AllBlogs, loading } = await client.query({
    query: GET_ALL_BLOGS,
    fetchPolicy: "no-cache", //دیتارو cache نمیکنه و همیشه اخرین دیتارو میده
  });

  return <BlogPage AllBlogs={AllBlogs.blogs} loading={loading} />;
}
export default BlogsPage;
