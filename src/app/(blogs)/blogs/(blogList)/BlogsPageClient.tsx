"use client";
import React, { Suspense } from "react";
import BlogPage from "@/components/template/blogs/blogsPage";
import { BtnLoader } from "@/components/element/Loader";

export default function BlogsPageClient({
  AllBlogs,
  loading,
}: {
  AllBlogs: any;
  loading: boolean;
}) {
  return (
    <Suspense fallback={<BtnLoader />}>
      <BlogPage AllBlogs={AllBlogs} loading={loading} />
    </Suspense>
  );
}
