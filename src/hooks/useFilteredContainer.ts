import { useMemo } from "react";

interface BaseTableData {
    id: string | number;
    name?: string;
    service_name?: string;
    title?: string;
    payment_status?: string;
    status?: string;
    role?: string;
    [key: string]: any;
}
interface TableStoreData {
    filterValue: string | undefined;
    statusFilter: string | Set<string>;
    peymentStatusFilter: string | Set<string>;
    rolesFilter: string | Set<string>;
    rowsPerPage: number;
    sortDescriptor: { column: string; direction: "ascending" | "descending" };
}

export function useFilteredContainer<TData extends BaseTableData>(
    datas: TData[],
    page: number,
    tableStoreData?: TableStoreData

): {
    filteredItems: TData[];
    paginatedItems: TData[];
    sortedItems: TData[];
    pages: number;
} {

    const {
        filterValue = "",
        statusFilter = "all",
        peymentStatusFilter = "all",
        rolesFilter = "all",
        rowsPerPage = 10,
        sortDescriptor = { column: "id", direction: "ascending" },
    } = tableStoreData || {};


    const filteredItems = useMemo(() => {
        let filtered = [...datas];

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
            filtered = filtered.filter((item) => {
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

        filtered = applyFilter(filtered, peymentStatusFilter, "payment_status");
        filtered = applyFilter(filtered, statusFilter, "status");
        filtered = applyFilter(filtered, rolesFilter, "role");

        return filtered;
    }, [datas, filterValue, statusFilter, peymentStatusFilter, rolesFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [filteredItems, page, rowsPerPage]);

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
