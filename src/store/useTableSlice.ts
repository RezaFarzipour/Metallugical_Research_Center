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
    rowsPerPage: number;
    sortDescriptor: SortDescriptor;
    page: number;
    view: boolean;
    setFilterValue: (value: string) => void;
    setSelectedKeys: (keys: Set<string>) => void;
    setVisibleColumns: (columns: Set<string>) => void;
    setStatusFilter: (filter: string | Set<string>) => void;
    setRolesFilter: (filter: string | Set<string>) => void;
    setRowsPerPage: (rows: number) => void;
    setSortDescriptor: (descriptor: SortDescriptor) => void;
    setPage: (page: number) => void;
    setView: (view: boolean) => void;
}

export const useTableStore = create<TableState>((set) => ({
    filterValue: '',
    selectedKeys: new Set<string>(),
    visibleColumns: new Set<string>(),
    statusFilter: 'all',
    rolesFilter: 'all',
    rowsPerPage: 5,
    sortDescriptor: { column: 'id', direction: 'ascending' },
    page: 1,
    view: false,
    setFilterValue: (value: string) => set({ filterValue: value }),
    setSelectedKeys: (keys: Set<string>) => set({ selectedKeys: keys }),
    setVisibleColumns: (columns: Set<string>) => set({ visibleColumns: columns }),
    setStatusFilter: (filter: string | Set<string>) => set({ statusFilter: filter }),
    setRolesFilter: (filter: string | Set<string>) => set({ rolesFilter: filter }),
    setRowsPerPage: (rows: number) => set({ rowsPerPage: rows }),
    setSortDescriptor: (descriptor: SortDescriptor) => set({ sortDescriptor: descriptor }),
    setPage: (page: number) => set({ page }),
    setView: (view: boolean) => set({ view }),
}));
