"use client";

import { TableInfo } from "@/constants/data";

export type OrderTypes = {
  description: string;
  amount: string;
  date: string;
  status: string;
  statusColor: string;
};

export default function TableModule() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-6 text-right">شرح سفارش</th>
            <th className="py-3 px-6 text-right">مبلغ</th>
            <th className="py-3 px-6 text-right">تاریخ</th>
            <th className="py-3 px-6 text-right">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {TableInfo.map((order, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 px-3">{order.description}</td>
              <td className="py-4 px-3">{order.amount}</td>
              <td className="py-4 px-3 ">{order.date}</td>
              <td className={`py-4 px-3   ${order.statusColor}`}>
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
