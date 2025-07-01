import BlogDetailsPage from "@/components/template/blogs/blogDetailsPage";
import { getBlogByIdAny } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import React from "react";



export async function generateMetadata({
  params,
}: {params:Promise<{blogId:string,slug:string}>}): Promise<Metadata> {
  const { blogId } = await params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogByIdAny(blogId, options);

  return {
    title: blogData?.title || "جزئیات بلاگ",
    description: blogData?.description || "توضیحات مربوط به این بلاگ",
  };
}

export default async function Details({ params }: {params:Promise<{blogId:string,slug:string}>}) {
  const { blogId } =  await params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogByIdAny(blogId, options);

  return <BlogDetailsPage dataByID={blogData} />;
}
