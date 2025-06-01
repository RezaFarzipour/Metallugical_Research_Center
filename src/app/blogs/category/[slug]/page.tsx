
import { getBlogCategoryByIdCustomer } from "@/services/api/blogs";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { id?: string };
};

export default async function CategoryPage({ params,searchParams  }: Props) {
  const { slug } = params;
  const { id } = searchParams;


  const blogs = await getBlogCategoryByIdCustomer(id);
  console.log("blogs",blogs)

//   if (!blogs || blogs.length === 0) {
//     return notFound();
//   }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">دسته: {slug}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {blogs.map((blog: any) => (
          <div key={blog.id} className="p-4 shadow rounded bg-white">
            <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
            <p>{blog.summary}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
