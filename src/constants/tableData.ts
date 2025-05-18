export const usersOrders = [
  {
    id: 1,
    name: "Tony Reichert",
    amount: "1000",
    status: "انجام شده",
    date: "1403/01/22",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    amount: "1000",
    status: "کنسل شده",
    date: "1403/01/22",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    amount: "1000",
    status: "انجام شده",
    date: "1403/01/22",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    amount: "1000",
    status: "درحال انتظار",
    date: "1403/01/22",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "علی محمدی",
    amount: "1000",
    status: "کنسل شده",
    date: "1403/01/22",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Michael Smith",
    amount: "1200",
    status: "انجام شده",
    date: "1403/01/22",
    email: "michael.smith@example.com",
  },
  {
    id: 7,
    name: "Emily Johnson",
    amount: "1500",
    status: "درحال انتظار",
    date: "1403/01/22",
    email: "emily.johnson@example.com",
  },
  {
    id: 8,
    name: "David Brown",
    amount: "800",
    status: "کنسل شده",
    date: "1403/01/22",
    email: "david.brown@example.com",
  },
  {
    id: 9,
    name: "Sophia Davis",
    amount: "900",
    status: "انجام شده",
    date: "1403/01/22",
    email: "sophia.davis@example.com",
  },
  {
    id: 10,
    name: "James Wilson",
    amount: "1100",
    status: "درحال انتظار",
    date: "1403/01/22",
    email: "james.wilson@example.com",
  },
  {
    id: 11,
    name: "Isabella Martinez",
    amount: "1300",
    status: "کنسل شده",
    date: "1403/01/22",
    email: "isabella.martinez@example.com",
  },
];
export const usersOrdersINITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "status",
  "date",
  "amount",
  "actions",
];



export const Usercolumns = [
  { name: "#", uid: "id", sortable: true },
  { name: "نام و نام خانوادگی", uid: "name", sortable: true },
  { name: "نقش", uid: "role", sortable: true },
  { name: "ایمیل", uid: "email" },
  { name: "شماره همراه", uid: "phone_number" },
  { name: "عملیات", uid: "actions" },
];

export const Servicecolumns = [
  { name: "#", uid: "_id", sortable: true },
  { name: "نام سرویس", uid: "name", sortable: true },
  { name: "توضیحات", uid: "description", sortable: true },
  { name: "قیمت", uid: "price" },
  { name: "تاریخ باز", uid: "dateRange" },
  { name: "عملیات", uid: "actions" },
];

export const ReservesAdmincolumns = [
  { name: "#", uid: "_id", sortable: true },
  { name: "نام کاربر", uid: "name", sortable: true },
  { name: "شماره همراه", uid: "phone_number", sortable: true },
  { name: "نام سرویس", uid: "service_name", sortable: true },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },
  { name: "توضیحات", uid: "admin_description", sortable: true },
  { name: "تاریخ رزرو", uid: "dateRange" },
  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },
  { name: "مرحله", uid: "stage" },
  { name: "عملیات", uid: "actions" },
];
export const ReservesCustomercolumns = [
  { name: "#", uid: "_id", sortable: true },
  { name: "نام کاربر", uid: "name", sortable: true },
  { name: "نام سرویس", uid: "service_name", sortable: true },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },

  { name: "توضیحات", uid: "admin_description", sortable: true },
  { name: "تاریخ رزرو", uid: "dateRange" },

  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },

  { name: "مرحله", uid: "stage" },
  { name: "عملیات", uid: "actions" },
];

export const ReportsCustomercolumns = [
  { name: "#", uid: "_id", sortable: true },
  { name: "نام کاربر", uid: "name", sortable: true },
  { name: "نام سرویس", uid: "service_name", sortable: true },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },

  { name: "توضیحات", uid: "admin_description", sortable: true },
  { name: "تاریخ رزرو", uid: "dateRange" },

  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },

  { name: "مرحله", uid: "stage" },
];

export const columns = [
  { name: "#", uid: "id", sortable: true },
  { name: "نام", uid: "full-name", sortable: true },
  { name: "نقش", uid: "role", sortable: true },
  { name: "ایمیل", uid: "email" },
  { name: "وضعیت", uid: "status", sortable: true },
  { name: "تاریخ", uid: "date", sortable: true },
  { name: "قیمت", uid: "amount", sortable: true },
  { name: "عملیات", uid: "actions" },
];

export const blogColumns = [
  { name: "#", uid: "id", sortable: true },
  { name: "عنوان", uid: "title", sortable: true },
  { name: "دسته بندی", uid: "category", sortable: true },
  { name: "عملیات", uid: "actions" },
  { name: "تگ ها", uid: "tags", sortable: true },
];

export const statusOptions = [
  { name: "انجام شده", uid: "انجام شده" },
  { name: "درحال انتظار", uid: "درحال انتظار" },
  { name: "کنسل شده", uid: "کنسل شده" },
];
export const statusOptionsPayment = [
  { name: "پرداخت شده", uid: "پرداخت شده" },
  { name: "در انتظار پرداخت", uid: "در انتظار پرداخت" },

];
export const rolesOptions = [
  { name: "ادمین", uid: "ادمین" },
  { name: "کاربر", uid: "کاربر" },
];

export const statusColorMap = {
  "تمام شده": "success",
  "درحال انتظار": "warning",
  "لغو شده": "danger",
  "پرداخت شده": "success",
  "در انتظار پرداخت": "warning",

  ادمین: "secondary",
  کاربر: "success",
};
