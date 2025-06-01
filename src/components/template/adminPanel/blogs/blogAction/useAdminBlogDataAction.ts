// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { useTableStore } from "@/store/useTableSlice";
// import {  toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
// import { blogColumns } from "@/constants/tableData";
// import { showToast } from "@/store/useToastSlice";
// import { getAllBlogsAdmin } from "@/services/api/blogs";
// import { useQuery } from "@apollo/client";
// import { GET_ALL_BLOGS } from "@/graphql/queries";

// const includesKey = ["title", "category_list", "tags"] as const;

// type RawService = {
//     id: string;
//     title: string;
//     category_list: string[];
//     tags: string[];
//     cover_image?: string;
//     slug:string
// };

// type FilteredService = {
//     _id:string,
//    id:string,
//    title:string,
//    category:string[],
//    actions:string,
//    image?: string;
//    tags:string[]
// };

// type GroupedServices = {
//     serviceUp: FilteredService[];
// };

// // تابع گروه‌بندی داده‌ها بیرون از هوک تعریف شده و با useCallback استفاده می‌شود
// const groupServicesByKeys = (data: RawService[], ): GroupedServices => {
//     return data.reduce<GroupedServices>(
//         (acc, blogs, index) => {
//             // به جای فیلتر کلیدها، مستقیماً ساخت آبجکت فیلترشده
//             acc.serviceUp.push({
//                 _id: toPersianNumbersWithComma(index + 1),
//                 id: toPersianNumbersWithComma(blogs.id),
//                 title: blogs.title,
//                 image: blogs.cover_image,
//                 actions: blogs.id.toString(),
//                 category: blogs.category_list,
//                 tags:blogs.tags
//             });
//             return acc;
//         },
//         { serviceUp: [] }
//     );
// };

// export const useAdminBlogDataAction = () => {
//     const { view, visibleColumns } = useTableStore();
//     const [formData, setFormData] = useState<GroupedServices>({ serviceUp: [] });
//     const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
//     const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     //const { deletService } = useDeleteService();

//     const router = useRouter();

//     const { data, loading, error } = useQuery<RawService[]>(GET_ALL_BLOGS)
// console.log('datatataaaaa',data);
// console.log('errrroooorrr',error);

//     // گروه‌بندی داده‌ها هنگام تغییر data
//     useEffect(() => {
//         if (Array.isArray(data)) {
//             const grouped = groupServicesByKeys(data);
//             setFormData(grouped);

//             if (grouped.serviceUp.length > 0) {
//                 setVisibleKeys(Object.keys(grouped.serviceUp[0]));
//             }
//         }
//     }, [data]);

//     // آرایه‌ی سرویس‌ها برای دسترسی راحت‌تر
//     const formDataServices = Array.isArray(formData.serviceUp) ? formData.serviceUp : [];

//   // محاسبه ستون‌های هدر
//   const headerColumns = useMemo(() => {
//     return visibleColumns.size === blogColumns.length
//       ? blogColumns
//       : blogColumns.filter((column) => visibleColumns.has(column.uid));
//   }, [visibleColumns]);

//     // اکشن کلیک اول: رفتن به صفحه ویرایش
//     const firstActionClickHandler = useCallback(
//         (id: string | number) => {
//             router.push(`/admin/services/${id}/details`);
//         },
//         [router]
//     );

//     // باز کردن مودال حذف
//     const secondActionClickHandler = useCallback((id: string | null) => {
//         if (!id) {
//             console.error("Invalid ID passed to secondActionClickHandler");
//             showToast("آیدی سرویس نامعتبر است", "error");
//             return;
//         }

//         setSelectedServiceId(id);
//         setIsModalOpen(true);
//     }, []);

//     // تایید حذف سرویس
//     const handleDeleteService = useCallback(() => {
//         // if (!selectedServiceId) {
//         //     console.error("ID for deletion is undefined or null");
//         //     showToast("آیدی سرویس نامعتبر است", "error");
//         //     return;
//         // }

//         // deletService({ id: toEnglishNumbers(selectedServiceId) }, {
//         //     onSuccess: () => {
//         //         showToast("سرویس با موفقیت حذف شد", "success");
//         //     },
//         //     onError: () => {
//         //         showToast("حذف سرویس با خطا مواجه شد", "error");
//         //     },
//         // });

//         // setIsModalOpen(false);
//         // setSelectedServiceId(null);
//     }, [selectedServiceId]);

//     return {
//         isModalOpen,
//         setIsModalOpen,
//         selectedServiceId,
//         view,
//         visibleColumns,
//         formData,
//         formDataServices,
//         visibleKeys,
//         headerColumns,
//         loading,
//          error,
//         firstActionClickHandler,
//         secondActionClickHandler,
//         handleDeleteService,
//         router
//     };
// };
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTableStore } from "@/store/useTableSlice";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";
import { blogColumns } from "@/constants/tableData";
import { showToast } from "@/store/useToastSlice";
import { useQuery } from "@apollo/client";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import { useDeleteBlog } from "./useDeleteBlog";

export interface Blog {
  coverImage: string;
  id: string;
  slug: string;
  tags: string[];
  title: string;
}

export interface BlogResponse {
  blogs: Blog[];
}

type FilteredService = {
  _id: string;
  id: string;
  name: string;
  image?: string;
  actions: string;
  slug: string;
  tags: string[];
};

type GroupedServices = {
  blogUp: FilteredService[];
};

export const useAdminBlogDataAction = () => {
  const { view, visibleColumns } = useTableStore();
  const [formData, setFormData] = useState<GroupedServices>({ blogUp: [] });
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteBLog } = useDeleteBlog();

  const router = useRouter();
  // تابع گروه‌بندی داده‌ها بیرون از هوک تعریف شده و با useCallback استفاده می‌شود
  const groupServicesByKeys = (data: Blog[]): GroupedServices => {
    return data.reduce<GroupedServices>(
      (acc, blog, index) => {
        // به جای فیلتر کلیدها، مستقیماً ساخت آبجکت فیلترشده
        acc.blogUp.push({
          _id: toPersianNumbers(index + 1),
          id: blog.id,
          name: blog.title,
          image: blog.coverImage,
          actions: blog.id.toString(),
          slug: blog.slug,
          tags: blog.tags,
        });
        return acc;
      },
      { blogUp: [] }
    );
  };

  const {
    data,
    loading: isPending,
    refetch,
  } = useQuery<BlogResponse>(GET_ALL_BLOGS);

  // گروه‌بندی داده‌ها هنگام تغییر data
  useEffect(() => {
    if (Array.isArray(data?.blogs)) {
      const grouped = groupServicesByKeys(data.blogs);
      console.log("grouped", grouped);
      setFormData(grouped);

      if (grouped.blogUp.length > 0) {
        setVisibleKeys(Object.keys(grouped.blogUp[0]));
      }
    }
  }, [data]);
  // آرایه‌ی سرویس‌ها برای دسترسی راحت‌تر
  const formDataBlogs = Array.isArray(formData.blogUp) ? formData.blogUp : [];

  // انتخاب ستون‌های قابل مشاهده با useMemo بهینه شده
  const headerColumns = useMemo(() => {
    return visibleColumns.size === blogColumns.length
      ? blogColumns
      : blogColumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  // اکشن کلیک اول: رفتن به صفحه ویرایش
  const firstActionClickHandler = useCallback(
    (id: string | number) => {
      router.push(`/admin/blogs/${id}/details`);
    },
    [router]
  );

  //delete blog
  const secondActionClickHandler = useCallback((id: string | number) => {
    if (!id) {
      console.error("Invalid ID passed to secondActionClickHandler");
      showToast("آیدی سرویس نامعتبر است", "error");
      return;
    }

    setSelectedServiceId(id);
    setIsModalOpen(true);
  }, []);

  // تایید حذف سرویس
  const handleDeleteBlog = useCallback(() => {
    if (!selectedServiceId) {
      console.error("ID for deletion is undefined or null");
      showToast("آیدی سرویس نامعتبر است", "error");
      return;
    }

    deleteBLog(
      { id: selectedServiceId },
      {
        onSuccess: async () => {
          showToast("سرویس با موفقیت حذف شد", "success");
          await refetch();
        },
        onError: () => {
          showToast("حذف سرویس با خطا مواجه شد", "error");
        },
      }
    );

    setIsModalOpen(false);
    setSelectedServiceId(null);
  }, [selectedServiceId]);

  return {
    isModalOpen,
    setIsModalOpen,
    selectedServiceId,
    view,
    formDataBlogs,
    visibleKeys,
    headerColumns,
    isPending,
    firstActionClickHandler,
    secondActionClickHandler,
    handleDeleteBlog,
    router,
  };
};
