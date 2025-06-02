import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceAdmin } from "@/services/api/service";
import { useTableStore } from "@/store/useTableSlice";
import { toEnglishNumbers, toPersianNumbers, toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Servicecolumns } from "@/constants/tableData";
import { showToast } from "@/store/useToastSlice";
import { useDeleteService } from "./useDeleteService";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";

type RawService = {
    id: string;
    service_name: string;
    description: string;
    price: number;
    cover_image?: string;
    "service-reserve_date"?: { id: number; reserved_from: string; reserved_to: string; service: number }[];
};

type FilteredService = {
    _id: string
    id: string;
    price: string;
    name: string;
    image?: string;
    actions: string;
    description: string; dateRange: string;
};

type GroupedServices = {
    serviceUp: FilteredService[];
};



export const useAdminServicesDataAction = () => {
    const { view, visibleColumns } = useTableStore();
    const [formData, setFormData] = useState<GroupedServices>({ serviceUp: [] });
    const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deletService } = useDeleteService();

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
            const grouped = groupServicesByKeys(data);
            setFormData(grouped);

            if (grouped.serviceUp.length > 0) {
                setVisibleKeys(Object.keys(grouped.serviceUp[0]));
            }
        }
    }, [data]);
    // آرایه‌ی سرویس‌ها برای دسترسی راحت‌تر
    const formDataServices = Array.isArray(formData.serviceUp) ? formData.serviceUp : [];

    // انتخاب ستون‌های قابل مشاهده با useMemo بهینه شده
    const headerColumns = useMemo(() => {
        return visibleColumns.size === Servicecolumns.length
            ? Servicecolumns
            : Servicecolumns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    // اکشن کلیک اول: رفتن به صفحه ویرایش
    const firstActionClickHandler = useCallback(
        (id: string | number) => {
            router.push(`/admin/services/${id}/details`);
        },
        [router]
    );

    // باز کردن مودال حذف
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
    const handleDeleteService = useCallback(() => {
        if (!selectedServiceId) {
            console.error("ID for deletion is undefined or null");
            showToast("آیدی سرویس نامعتبر است", "error");
            return;
        }

        deletService({ id: toEnglishNumbers(selectedServiceId) }, {
            onSuccess: () => {
                showToast("سرویس با موفقیت حذف شد", "success");
            },
            onError: () => {
                showToast("حذف سرویس با خطا مواجه شد", "error");
            },
        });

        setIsModalOpen(false);
        setSelectedServiceId(null);
    }, [selectedServiceId]);

    return {
        isModalOpen,
        setIsModalOpen,
        selectedServiceId,
        view,
        visibleColumns,
        formData,
        formDataServices,
        visibleKeys,
        headerColumns,
        isPending,
        isError,
        firstActionClickHandler,
        secondActionClickHandler,
        handleDeleteService,
        router
    };
};
