import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceAdmin } from "@/services/api/service";
import { useTableStore } from "@/store/useTableSlice";
import { toEnglishNumbers, toPersianNumbers, toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Coursecolumns } from "@/constants/tableData";
import { showToast } from "@/store/useToastSlice";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { ServerServiceType } from "@/types/serviceType";
import { useDeleteCourse } from "./useDeleteCource";

type RawService = {
    id: string;
    service_name: string;
    description: string;
    price: number;
    cover_image?: string;
    "service-reserve_date"?: { id: number; reserved_from: string; reserved_to: string; service: number }[];
    is_package?: boolean
};

type GroupedServices = {
    serviceUp: ServerServiceType[];
};



export const useAdminCoursesDataAction = () => {
    const { view, visibleColumns } = useTableStore();
    const [formData, setFormData] = useState<GroupedServices>({ serviceUp: [] });
    const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null | number>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deletService } = useDeleteCourse();


    const router = useRouter();

    // تابع گروه‌بندی داده‌ها بیرون از هوک تعریف شده و با useCallback استفاده می‌شود
    const groupServicesByKeys = (data: RawService[]): GroupedServices => {
        return data.reduce<GroupedServices>(
            (acc, service, index) => {
                const dateRanges = formatDateRangesToPersian(service["service-reserve_date"] ?? []);


                // به جای فیلتر کلیدها، مستقیماً ساخت آبجکت فیلترشده
                acc.serviceUp.push({
                    _id: toPersianNumbers(index + 1),
                    id: toPersianNumbers(service.id),
                    price: toPersianNumbersWithComma(service.price),
                    name: service.service_name,
                    image: service.cover_image,
                    actions: service.id.toString(),
                    description: service.description,
                    dateRange: dateRanges
                });
                return acc;
            },
            { serviceUp: [] }
        );
    };

    const { data, isPending, isError } = useQuery<RawService[]>({
        queryKey: ["getAll-services"],
        queryFn: getAllServiceAdmin,
        staleTime: 5 * 60 * 1000, // 5 دقیقه کش
    });


    // گروه‌بندی داده‌ها هنگام تغییر data
    useEffect(() => {
        if (Array.isArray(data)) {
            // فقط سرویس‌هایی که پکیج هستند رو نگه می‌داره
            const onlyPackages = data.filter(course => course.is_package === true);

            const grouped = groupServicesByKeys(onlyPackages);
            setFormData(grouped);

            if (grouped.serviceUp.length > 0) {
                setVisibleKeys(Object.keys(grouped.serviceUp[0]));
            }
        }
    }, [data]);

    // آرایه‌ی دوره آموزشی‌ها برای دسترسی راحت‌تر
    const formDataCourses = Array.isArray(formData.serviceUp) ? formData.serviceUp : [];

    // انتخاب ستون‌های قابل مشاهده با useMemo بهینه شده
    const headerColumns = useMemo(() => {
        return visibleColumns.size === Coursecolumns.length
            ? Coursecolumns
            : Coursecolumns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    // اکشن کلیک اول: رفتن به صفحه ویرایش
    const firstActionClickHandler = useCallback(
        (id: string | number) => {
            router.push(`/admin/courses/${id}/details`);
        },
        [router]
    );

    // باز کردن مودال حذف
    const secondActionClickHandler = useCallback((id: string | number) => {
        if (!id) {
            showToast("آیدی دوره آموزشی نامعتبر است", "error");
            return;
        }

        setSelectedCourseId(id);
        setIsModalOpen(true);
    }, []);

    // تایید حذف دوره آموزشی
    const handleDeleteCourse = useCallback(() => {
        if (!selectedCourseId) {
            showToast("آیدی دوره آموزشی نامعتبر است", "error");
            return;
        }

        deletService({ id: toEnglishNumbers(selectedCourseId) }, {
            onSuccess: () => {
                showToast("دوره آموزشی با موفقیت حذف شد", "success");
            },
            onError: () => {
                showToast("حذف دوره آموزشی با خطا مواجه شد", "error");
            },
        });

        setIsModalOpen(false);
        setSelectedCourseId(null);
    }, [selectedCourseId, deletService]);

    return {
        isModalOpen,
        setIsModalOpen,
        selectedCourseId,
        view,
        visibleColumns,
        formData,
        formDataCourses,
        visibleKeys,
        headerColumns,
        isPending,
        isError,
        firstActionClickHandler,
        secondActionClickHandler,
        handleDeleteCourse,
        router
    };
};
