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
    peymentStatusFilter: string | Set<string>;
    rolesFilter: string | Set<string>;
    rowsPerPage: number;
    sortDescriptor: SortDescriptor;
    page: number;
    view: boolean;
    setFilterValue: (value: string) => void;
    setSelectedKeys: (keys: Set<string>) => void;
    setVisibleColumns: (columns: Set<string>) => void;
    setStatusFilter: (filter: string | Set<string>) => void;
    setPeymentStatusFilter: (filter: string | Set<string>) => void;
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
    peymentStatusFilter: 'all',
    rolesFilter: 'all',
    rowsPerPage: 5,
    sortDescriptor: { column: 'id', direction: 'ascending' },
    page: 1,
    view: false,
    setFilterValue: (value: string) => set({ filterValue: value }),
    setSelectedKeys: (keys: Set<string>) => set({ selectedKeys: keys }),
    setVisibleColumns: (columns: Set<string>) => set({ visibleColumns: columns }),
    setStatusFilter: (filter: string | Set<string>) => set({ statusFilter: filter }),
    setPeymentStatusFilter: (filter: string | Set<string>) => set({ peymentStatusFilter: filter }),
    setRolesFilter: (filter: string | Set<string>) => set({ rolesFilter: filter }),
    setRowsPerPage: (rows: number) => set({ rowsPerPage: rows }),
    setSortDescriptor: (descriptor: SortDescriptor) => set({ sortDescriptor: descriptor }),
    setPage: (page: number) => set({ page }),
    setView: (view: boolean) => set({ view }),
}));


export const createTableStore = () =>
    create<TableState>((set) => ({
        filterValue: "",
        selectedKeys: new Set<string>(),
        visibleColumns: new Set<string>(),
        statusFilter: "all",
        peymentStatusFilter: "all",
        rolesFilter: "all",
        rowsPerPage: 5,
        sortDescriptor: { column: "id", direction: "ascending" },
        page: 1,
        view: false,

        setFilterValue: (value) => set({ filterValue: value }),
        setSelectedKeys: (keys) => set({ selectedKeys: keys }),
        setVisibleColumns: (columns) => set({ visibleColumns: columns }),
        setStatusFilter: (filter) => set({ statusFilter: filter }),
        setPeymentStatusFilter: (filter) => set({ peymentStatusFilter: filter }),
        setRolesFilter: (filter) => set({ rolesFilter: filter }),
        setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
        setSortDescriptor: (descriptor) => set({ sortDescriptor: descriptor }),
        setPage: (page) => set({ page }),
        setView: (view) => set({ view }),
    }));



export const useReportsTableStore = createTableStore();
export const useReservesTableStore = createTableStore();
export const useUsersTableStore = createTableStore();
export const useCoursesTableStore = createTableStore();
export const useBlogsTableStore = createTableStore();
export const useAdminServicesTableStore = createTableStore();
export const useServicesTableStore = createTableStore();

