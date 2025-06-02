import BlogDetailsPage from "@/components/template/adminPanel/blogs/blogDetailsPage";
import { getBlogById } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import React from "react";

type PageProps = {
  params: { blogId: string };
};

export default async function Details({ params }: PageProps) {
  const { blogId } = params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogById(blogId, options);

  return <BlogDetailsPage dataByID={blogData} />;
}
