import BlogDetailsPage from "@/components/template/adminPanel/blogs/blogDetailsPage";
import { getBlogByIdAny } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import React from "react";

type PageProps = {
  params: {
    blogId: string;
    slug: string;
  };
};

export default async function Details({ params }: PageProps) {
  const { blogId } = params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const blogData = await getBlogByIdAny(blogId, options);


  return <BlogDetailsPage dataByID={blogData} />;
}
