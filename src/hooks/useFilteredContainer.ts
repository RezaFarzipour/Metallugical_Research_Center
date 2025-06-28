
import { useMemo } from "react";
import { useTableStore } from "@/store/useTableSlice";

// تعریف اینترفیس پایه برای TData
interface BaseTableData {
    id: string | number;
    name?: string;
    service_name?: string;
    title?: string;
    payment_status?: string;
    status?: string;
    role?: string;
    [key: string]: any; // برای انعطاف‌پذیری در پراپرتی‌های اضافی
}

export function useFilteredContainer<TData extends BaseTableData>(datas: TData[]) {
    const {
        filterValue,
        statusFilter,
        peymentStatusFilter,
        rolesFilter,
        rowsPerPage,
        sortDescriptor,
        page,
    } = useTableStore();

    // محاسبه آیتم‌های فیلترشده
    const filteredItems = useMemo<TData[]>(() => {
        let filteredItems = [...datas];

        const applyFilter = (
            items: TData[],
            filter: string | Set<string>,
            key: keyof TData
        ) => {
            if (filter !== "all" && filter instanceof Set) {
                return items.filter((item) => filter.has(String(item[key])));
            }
            return items;
        };

        if (filterValue) {
            const lowerCaseFilter = filterValue.toLowerCase();
            filteredItems = filteredItems.filter((item) => {
                const name = String(item.name || "").toLowerCase();
                const service_name = String(item.service_name || "").toLowerCase();
                const title = String(item.title || "").toLowerCase();

                return (
                    name.includes(lowerCaseFilter) ||
                    service_name.includes(lowerCaseFilter) ||
                    title.includes(lowerCaseFilter)
                );
            });
        }

        filteredItems = applyFilter(filteredItems, peymentStatusFilter, "payment_status");
        filteredItems = applyFilter(filteredItems, statusFilter, "status");
        filteredItems = applyFilter(filteredItems, rolesFilter, "role");

        return filteredItems;
    }, [datas, filterValue, statusFilter, peymentStatusFilter, rolesFilter]);

    // محاسبه صفحه‌بندی
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [filteredItems, page, rowsPerPage]);

    // محاسبه آیتم‌های مرتب‌شده
    const sortedItems = useMemo(() => {
        return [...paginatedItems].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp =
                first && second && first < second
                    ? -1
                    : first && second && first > second
                        ? 1
                        : 0;
            return sortDescriptor.direction === "ascending" ? cmp : -cmp;
        });
    }, [paginatedItems, sortDescriptor]);

    return { filteredItems, paginatedItems, sortedItems, pages };
}