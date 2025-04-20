
import { useMemo } from "react";
import { useTableStore } from "@/store/useTableSlice";

interface User {
    full_name: string,
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    amount: string;
    date: string;
    title: string;
    description: string;
    image: string;
    author: string;
    articleTitle: string;
}

export function useFilteredContainer(users: User[]) {
    const {
        filterValue,
        statusFilter,
        rolesFilter,
        productStatusFilter,
        rowsPerPage,
        sortDescriptor,
        page,
    } = useTableStore();

    // محاسبه فیلترهای مختلف
    const filteredItems = useMemo<User[]>(() => {
        let filteredUsers = [...users];

        const applyFilter = (
            items: User[],
            filter: string | Set<string>,
            key: keyof User
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
                const title = user.title?.toLowerCase() || "";

                return (
                    name.includes(lowerCaseFilter) || title.includes(lowerCaseFilter)
                );
            });
        }

        filteredUsers = applyFilter(filteredUsers, statusFilter, "status");
        filteredUsers = applyFilter(filteredUsers, rolesFilter, "role");
        filteredUsers = applyFilter(filteredUsers, productStatusFilter, "status");

        return filteredUsers;
    }, [users, filterValue, statusFilter, rolesFilter, productStatusFilter]);

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
            const first = a[sortDescriptor.column as keyof User];
            const second = b[sortDescriptor.column as keyof User];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "ascending" ? cmp : -cmp;
        });
    }, [paginatedItems, sortDescriptor]);

    return { filteredItems, paginatedItems, sortedItems, pages };
}