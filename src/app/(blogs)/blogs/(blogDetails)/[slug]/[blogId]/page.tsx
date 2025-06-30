import BlogDetailsPage from "@/components/template/blogs/blogDetailsPage";
import { getBlogByIdAny } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import React from "react";

type PageProps = {
  params: {
    blogId: string;
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { blogId } = params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogByIdAny(blogId, options);

  return {
    title: blogData?.title || "جزئیات بلاگ",
    description: blogData?.description || "توضیحات مربوط به این بلاگ",
  };
}

export default async function Details({ params }: PageProps) {
  const { blogId } = params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogByIdAny(blogId, options);

  return <BlogDetailsPage dataByID={blogData} />;
}
