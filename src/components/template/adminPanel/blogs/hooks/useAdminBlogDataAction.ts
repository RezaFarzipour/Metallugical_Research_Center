import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTableStore } from "@/store/useTableSlice";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";
import { blogColumns } from "@/constants/tableData";
import { showToast } from "@/store/useToastSlice";
import { useQuery } from "@apollo/client";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import { useDeleteBlog } from "../hooks/useDeleteBlog";

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
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | null | number
  >(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
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
  } = useQuery<BlogResponse>(GET_ALL_BLOGS, {
    fetchPolicy: "network-only", // یا "no-cache"
  });

  // گروه‌بندی داده‌ها هنگام تغییر data
  useEffect(() => {
    if (Array.isArray(data?.blogs)) {
      const grouped = groupServicesByKeys(data.blogs);

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
  const secondActionClickHandler = useCallback(
    (id: string | number, name?: string | undefined, phone_number?: string) => {
      if (!id) {
        console.error("Invalid ID passed to secondActionClickHandler");
        showToast("آیدی سرویس نامعتبر است", "error");
        return;
      }
      setSelectedName(name ?? null);
      setSelectedServiceId(id);
      setIsModalOpen(true);
    },
    []
  );

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
    view,
    formDataBlogs,
    visibleKeys,
    headerColumns,
    name,
    isPending,
    firstActionClickHandler,
    secondActionClickHandler,
    handleDeleteBlog,
    selectedName,
    router,
  };
};
