import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceAdmin } from "@/services/api/service";
import { toEnglishNumbers, toPersianNumbers, toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Servicecolumns } from "@/constants/tableData";
import { showToast } from "@/store/useToastSlice";
import { useDeleteService } from "./useDeleteService";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { ServerServiceType } from "@/types/serviceType";
import { useAdminServicesTableStore, } from "@/store/useTableSlice";
import { getHttpsUrl } from "@/utils/formatter/domainFormatter";

type RawService = {
    id: string;
    service_name: string;
    description: string;
    price: number;
    cover_image?: string;
    "service-reserve_date"?: { id: number; reserved_from: string; reserved_to: string; service: number }[];
    is_package: boolean
};

type GroupedServices = {
    serviceUp: ServerServiceType[];
};



export const useAdminServicesDataAction = () => {
    const [formData, setFormData] = useState<GroupedServices>({ serviceUp: [] });
    const [selectedServiceId, setSelectedServiceId] = useState<string | null | number>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deletService } = useDeleteService();

    const router = useRouter();

    // گرفتن مقدارها از Zustand به صورت مستقیم
    const visibleColumns = useAdminServicesTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useAdminServicesTableStore((state) => state.setVisibleColumns);
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
                    image: getHttpsUrl(service.cover_image),
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
            // فقط سرویس‌هایی که پکیج نیستند
            const filteredData = data.filter(service => service.is_package === false);

            const grouped = groupServicesByKeys(filteredData);
            setFormData(grouped);

            if (grouped.serviceUp.length > 0) {
                // ستون‌ها را به zustand منتقل کن
                const keys = Object.keys(grouped.serviceUp[0]);
                setVisibleColumns(new Set(keys));
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
            showToast("آیدی سرویس نامعتبر است", "error");
            return;
        }

        setSelectedServiceId(id);
        setIsModalOpen(true);
    }, []);

    // تایید حذف سرویس
    const handleDeleteService = useCallback(() => {
        if (!selectedServiceId) {
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
    }, [selectedServiceId, deletService]);

    return {
        isModalOpen,
        setIsModalOpen,
        selectedServiceId,
        formData,
        formDataServices,
        headerColumns,
        isPending,
        isError,
        firstActionClickHandler,
        secondActionClickHandler,
        handleDeleteService,
        router
    };
};
