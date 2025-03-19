import { create } from 'zustand';

interface SortDescriptor {
    column: string;
    direction: 'ascending' | 'descending';
}

interface TableState {
    filterValue: string;
    selectedKeys: Set<string>;
    visibleColumns: Set<string>;
    statusFilter: string | Set<string>;
    rolesFilter: string | Set<string>;
    productStatusFilter: string | Set<string>; // Corrected the property name
    rowsPerPage: number;
    sortDescriptor: SortDescriptor;
    page: number;
    setFilterValue: (value: string) => void;
    setSelectedKeys: (keys: Set<string>) => void;
    setVisibleColumns: (columns: Set<string>) => void;
    setStatusFilter: (filter: string | Set<string>) => void;
    setRolesFilter: (filter: string | Set<string>) => void;
    setProductStatusFilter: (filter: string | Set<string>) => void; // Added the missing method
    setRowsPerPage: (rows: number) => void;
    setSortDescriptor: (descriptor: SortDescriptor) => void;
    setPage: (page: number) => void;
}

export const useTableStore = create<TableState>((set) => ({
    filterValue: '',
    selectedKeys: new Set<string>(),
    visibleColumns: new Set<string>(),
    statusFilter: 'all',
    rolesFilter: 'all',
    productStatusFilter: 'all',
    rowsPerPage: 5,
    sortDescriptor: { column: 'id', direction: 'ascending' },
    page: 1,
    setFilterValue: (value: string) => set({ filterValue: value }),
    setSelectedKeys: (keys: Set<string>) => set({ selectedKeys: keys }),
    setVisibleColumns: (columns: Set<string>) => set({ visibleColumns: columns }),
    setStatusFilter: (filter: string | Set<string>) => set({ statusFilter: filter }),
    setRolesFilter: (filter: string | Set<string>) => set({ rolesFilter: filter }),
    setProductStatusFilter: (filter: string | Set<string>) => set({ productStatusFilter: filter }),
    setRowsPerPage: (rows: number) => set({ rowsPerPage: rows }),
    setSortDescriptor: (descriptor: SortDescriptor) => set({ sortDescriptor: descriptor }),
    setPage: (page: number) => set({ page }),
}));

export const initializeTableStore = (initialVisibleColumns: string[]) => {
    useTableStore.setState({ visibleColumns: new Set(initialVisibleColumns) });
};