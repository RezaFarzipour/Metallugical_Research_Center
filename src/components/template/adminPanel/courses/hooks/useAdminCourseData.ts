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
import { getHttpsUrl } from "@/utils/formatter/domainFormatter";

type RawCourse = {
    id: string;
    service_name: string;
    description: string;
    price: number;
    cover_image?: string;
    "service-reserve_date"?: { id: number; reserved_from: string; reserved_to: string; service: number }[];
    is_package?: boolean;
};

type GroupedCourses = {
    courseUp: ServerServiceType[];
};

export const useAdminCoursesDataAction = () => {
    const [formData, setFormData] = useState<GroupedCourses>({ courseUp: [] });
    const [selectedCourseId, setSelectedCourseId] = useState<string | number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deletService } = useDeleteCourse();

    const router = useRouter();

    const visibleColumns = useCoursesTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useCoursesTableStore((state) => state.setVisibleColumns);
    const view = useCoursesTableStore((state) => state.view);

    const groupCoursesByKeys = useCallback((data: RawCourse[]): GroupedCourses => {
        return {
            courseUp: data.map((course, index) => ({
                _id: toPersianNumbers(index + 1),
                id: toPersianNumbers(course.id),
                price: toPersianNumbersWithComma(course.price),
                name: course.service_name,
                image: getHttpsUrl(course.cover_image),
                actions: course.id.toString(),
                description: course.description,
                dateRange: formatDateRangesToPersian(course["service-reserve_date"] ?? []),
            }))
        };
    }, []);

    const { data, isPending, isError } = useQuery<RawCourse[]>({
        queryKey: ["getAll-services"],
        queryFn: getAllServiceAdmin,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (Array.isArray(data)) {
            const onlyPackages = data.filter(course => course.is_package);
            const grouped = groupCoursesByKeys(onlyPackages);
            setFormData(grouped);

            if (grouped.courseUp.length > 0) {
                const keys = Object.keys(grouped.courseUp[0]);
                setVisibleColumns(new Set(keys));
            }
        }
    }, [data, groupCoursesByKeys, setVisibleColumns]);

    const formDataCourses = formData.courseUp;

    const headerColumns = useMemo(() => {
        return visibleColumns.size === Coursecolumns.length
            ? Coursecolumns
            : Coursecolumns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    const firstActionClickHandler = useCallback(
        (id: string | number) => router.push(`/admin/courses/${id}/details`),
        [router]
    );

    const secondActionClickHandler = useCallback((id: string | number) => {
        if (!id) return showToast("آیدی دوره آموزشی نامعتبر است", "error");
        setSelectedCourseId(id);
        setIsModalOpen(true);
    }, []);

    const handleDeleteCourse = useCallback(() => {
        if (!selectedCourseId) return showToast("آیدی دوره آموزشی نامعتبر است", "error");

        deletService({ id: toEnglishNumbers(selectedCourseId) }, {
            onSuccess: () => showToast("دوره آموزشی با موفقیت حذف شد", "success"),
            onError: () => showToast("حذف دوره آموزشی با خطا مواجه شد", "error"),
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
