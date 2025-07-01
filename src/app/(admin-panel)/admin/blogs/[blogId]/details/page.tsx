import { cookies } from "next/headers";
import BlogDetailsPage from "@/components/template/adminPanel/blogs/blogDetailsPage";
import { getBlogById } from "@/services/api/blogs";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";


// type Props = {
//   params: {
//     blogId: string;
//   };
// };

export default async function Page({ params }: {params:Promise<{blogId:string}>}) {
  const { blogId } = await params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const blogData = await getBlogById(blogId, options);

  return <BlogDetailsPage dataByID={blogData} />;
}
