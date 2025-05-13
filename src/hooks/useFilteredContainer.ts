
import { useMemo } from "react";
import { useTableStore } from "@/store/useTableSlice";

interface Data {
    id: number;
    name: string;
    service_name: string
    phone_number: string;
    email: string;
    role: string;
    status: string;
    amount: string;
    date: string;
    title: string;
    description: string;
    cover_image: string;
    author: string;
    articleTitle: string;
}

export function useFilteredContainer(datas: Data[]) {
    const {
        filterValue,
        statusFilter,
        rolesFilter,
        rowsPerPage,
        sortDescriptor,
        page,
    } = useTableStore();

    // محاسبه فیلترهای مختلف
    const filteredItems = useMemo<Data[]>(() => {
        let filteredUsers = [...datas];

        const applyFilter = (
            items: Data[],
            filter: string | Set<string>,
            key: keyof Data
        ) => {
            if (filter !== "all" && filter instanceof Set) {
                return items.filter((item) => filter.has(item[key] as string));
            }
            return items;
        };

        if (filterValue) {
            const lowerCaseFilter = filterValue.toLowerCase();
            filteredUsers = filteredUsers.filter((user) => {
                const name = user.name?.toLowerCase() || "";
                const service_name = user.service_name?.toLowerCase() || "";
                const title = user.title?.toLowerCase() || "";

                return (
                    name.includes(lowerCaseFilter) || service_name.includes(lowerCaseFilter) || title.includes(lowerCaseFilter)
                );
            });
        }

        filteredUsers = applyFilter(filteredUsers, statusFilter, "status");
        filteredUsers = applyFilter(filteredUsers, rolesFilter, "role");

        return filteredUsers;
    }, [datas, filterValue, statusFilter, rolesFilter,]);

    // محاسبه تعداد صفحات و آیتم‌های قابل نمایش
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [filteredItems, page, rowsPerPage]);

    // مرتب‌سازی آیتم‌ها
    const sortedItems = useMemo(() => {
        return [...paginatedItems].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Data];
            const second = b[sortDescriptor.column as keyof Data];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "ascending" ? cmp : -cmp;
        });
    }, [paginatedItems, sortDescriptor]);

    return { filteredItems, paginatedItems, sortedItems, pages };
}