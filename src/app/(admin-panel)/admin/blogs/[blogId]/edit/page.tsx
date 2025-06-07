import EditBlogPage from "@/components/template/adminPanel/blogs/EditBlogPage";
import { getBlogById } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: { blogId: string };
};

export default async function Page({ params }: PageProps) {

  const { blogId } = params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogById(blogId, options);


  if (!blogData) {
    notFound();
  }

  return (
    <div>
      <EditBlogPage
        blogData={blogData}

      />
    </div>
  );
}
