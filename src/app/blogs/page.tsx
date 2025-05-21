import BlogPage from "@/components/template/weblog/WeblogPage";


export const metadata = {
  //   title: "Bolgs",
  title: {
    absolute: "blogs", // ignore %s in parent layout.
  },
};

function BlogsPage() {
  return (
    <BlogPage/>
  );
}
export default BlogsPage;
