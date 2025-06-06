export const Usercolumns = [
  { name: "#", uid: "id" },
  { name: "نام و نام خانوادگی", uid: "name" },
  { name: "نقش", uid: "role" },
  { name: "ایمیل", uid: "email" },
  { name: "شماره همراه", uid: "phone_number" },
  { name: "عملیات", uid: "actions" },
];

export const Servicecolumns = [
  { name: "#", uid: "_id" },
  { name: "نام سرویس", uid: "name" },
  { name: "توضیحات", uid: "description" },
  { name: "قیمت", uid: "price" },
  { name: "تاریخ باز", uid: "dateRange" },
  { name: "عملیات", uid: "actions" },
];

export const ReservesAdmincolumns = [
  { name: "#", uid: "_id" },
  { name: "نام کاربر", uid: "name" },
  { name: "شماره همراه", uid: "phone_number" },
  { name: "نام سرویس", uid: "service_name" },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },
  { name: "مرحله", uid: "stage" },
  { name: "تاریخ رزرو", uid: "dateRange" },
  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },
  { name: "توضیحات", uid: "admin_description" },
  { name: "عملیات", uid: "actions" },
];
export const ReservesCustomercolumns = [
  { name: "#", uid: "_id" },
  { name: "نام کاربر", uid: "name" },
  { name: "نام سرویس", uid: "service_name" },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },
  { name: "تاریخ رزرو", uid: "dateRange" },
  { name: "مرحله", uid: "stage" },
  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },
  { name: "توضیحات", uid: "admin_description" },
  { name: "عملیات", uid: "actions" },
];
export const ReportsAdmincolumns = [
  { name: "#", uid: "_id" },
  { name: "نام کاربر", uid: "name" },
  { name: "شماره همراه", uid: "phone_number" },
  { name: "نام سرویس", uid: "service_name" },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },
  { name: "تاریخ رزرو", uid: "dateRange" },
  { name: "مرحله", uid: "stage" },
  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },
  { name: "توضیحات", uid: "admin_description" },
];
export const ReportsCustomercolumns = [
  { name: "#", uid: "_id" },
  { name: "نام کاربر", uid: "name" },
  { name: "نام سرویس", uid: "service_name" },
  { name: "قیمت", uid: "price" },
  { name: "مدت زمان رزرو", uid: "reserve_duration" },
  { name: "تاریخ رزرو", uid: "dateRange" },
  { name: " وضعیت پرداخت", uid: "payment_status" },
  { name: "وضعیت", uid: "status" },
  { name: "توضیحات", uid: "admin_description" },
  { name: "مرحله", uid: "stage" },
];

export const columns = [
  { name: "#", uid: "id" },
  { name: "نام", uid: "full-name" },
  { name: "نقش", uid: "role" },
  { name: "ایمیل", uid: "email" },
  { name: "وضعیت", uid: "status" },
  { name: "تاریخ", uid: "date" },
  { name: "قیمت", uid: "amount" },
  { name: "عملیات", uid: "actions" },
];

export const blogColumns = [
  { name: "#", uid: "_id" },
  { name: "عنوان", uid: "name" },
  { name: "اسلاگ ", uid: "slug" },
  { name: "تگ ها", uid: "tags" },
  { name: "عملیات", uid: "actions" },
];

export const statusOptions = [
  { name: "تمام شده", uid: "تمام شده" },
  { name: "درحال انتظار", uid: "درحال انتظار" },
  { name: "لغو شده", uid: "لغو شده" },
];
export const statusOptionsPayment = [
  { name: "پرداخت شده", uid: "پرداخت شده" },
  { name: "در انتظار پرداخت", uid: "در انتظار پرداخت" },
];
export const rolesOptions = [
  { name: "ادمین", uid: "ادمین" },
  { name: "کاربر", uid: "کاربر" },
];




export const statusColorMap: Record<string, "success" | "warning" | "danger" | "secondary" | "default" | "primary"> = {
  "تمام شده": "success",
  "در حال انتظار": "warning",
  "لغو شده": "danger",
  "پرداخت شده": "success",
  "در انتظار پرداخت": "warning",

  ادمین: "secondary",
  کاربر: "success",
};
