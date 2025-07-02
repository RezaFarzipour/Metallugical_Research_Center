import EditBlogPage from "@/components/template/adminPanel/blogs/EditBlogPage";
import { getBlogById } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogById(blogId, options);

  if (!blogData) {
    notFound();
  }

  return (
    <div>
      <EditBlogPage blogData={blogData} />
    </div>
  );
}
