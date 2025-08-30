
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceAdmin } from "@/services/api/service";
import { toEnglishNumbers, toPersianNumbers, toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Coursecolumns } from "@/constants/tableData";
import { showToast } from "@/store/useToastSlice";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { ServerServiceType } from "@/types/serviceType";
import { useDeleteCourse } from "./useDeleteCource";
import { useCoursesTableStore } from "@/store/useTableSlice";

type RawService = {
    id: string;
    service_name: string;
    description: string;
    price: number;
    cover_image?: string;
    "service-reserve_date"?: { id: number; reserved_from: string; reserved_to: string; service: number }[];
    is_package?: boolean;
};

type GroupedServices = {
    serviceUp: ServerServiceType[];
};

export const useAdminCoursesDataAction = () => {
    const [formData, setFormData] = useState<GroupedServices>({ serviceUp: [] });
    const [selectedCourseId, setSelectedCourseId] = useState<string | number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deletService } = useDeleteCourse();

    const router = useRouter();

    // گرفتن مقدارها از Zustand به صورت مستقیم
    const visibleColumns = useCoursesTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useCoursesTableStore((state) => state.setVisibleColumns);
    const view = useCoursesTableStore((state) => state.view);

    // گروه‌بندی داده‌ها
    const groupServicesByKeys = useCallback((data: RawService[]): GroupedServices => {
        return data.reduce<GroupedServices>((acc, service, index) => {
            const dateRanges = formatDateRangesToPersian(service["service-reserve_date"] ?? []);

            acc.serviceUp.push({
                _id: toPersianNumbers(index + 1),
                id: toPersianNumbers(service.id),
                price: toPersianNumbersWithComma(service.price),
                name: service.service_name,
                image: service.cover_image,
                actions: service.id.toString(),
                description: service.description,
                dateRange: dateRanges,
            });

            return acc;
        }, { serviceUp: [] });
    }, []);

    const { data, isPending, isError } = useQuery<RawService[]>({
        queryKey: ["getAll-services"],
        queryFn: getAllServiceAdmin,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (Array.isArray(data)) {
            // فقط سرویس‌های پکیج
            const onlyPackages = data.filter(course => course.is_package === true);

            const grouped = groupServicesByKeys(onlyPackages);
            setFormData(grouped);

            if (grouped.serviceUp.length > 0) {
                // ستون‌ها را به zustand منتقل کن
                const keys = Object.keys(grouped.serviceUp[0]);
                setVisibleColumns(new Set(keys));
            }
        }
    }, [data, groupServicesByKeys, setVisibleColumns]);

    const formDataCourses = Array.isArray(formData.serviceUp) ? formData.serviceUp : [];

    const headerColumns = useMemo(() => {
        return visibleColumns.size === Coursecolumns.length
            ? Coursecolumns
            : Coursecolumns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    const firstActionClickHandler = useCallback(
        (id: string | number) => {
            router.push(`/admin/courses/${id}/details`);
        },
        [router]
    );

    const secondActionClickHandler = useCallback((id: string | number) => {
        if (!id) {
            showToast("آیدی دوره آموزشی نامعتبر است", "error");
            return;
        }

        setSelectedCourseId(id);
        setIsModalOpen(true);
    }, []);

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
        headerColumns,
        isPending,
        isError,
        firstActionClickHandler,
        secondActionClickHandler,
        handleDeleteCourse,
        router,
    };
};
