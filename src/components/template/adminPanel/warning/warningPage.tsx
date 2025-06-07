"use client";
import React from "react";
import CardModule from "@/components/module/cardModule/CardModule";
import Empty from "@/components/element/Empty";
import useExpiredReserveStore from "@/store/useExpiredReserveStore";

const WarningPage: React.FC = () => {
  const { expiredReserveDates } = useExpiredReserveStore();

  const isEmpty = !expiredReserveDates || expiredReserveDates.length === 0;

  return (
    <div>
      <div
        className={`${
          isEmpty ? "hidden" : "flex"
        } mb-8 p-4 bg-yellow-100 rounded`}
      >
        <h2 className="text-lg font-bold mb-2">
          سرویس‌های با تاریخ رزرو گذشته:
        </h2>
      </div>

      {isEmpty ? (
        <Empty spanValue="سرویسی" btn={false} pVisiable={false} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          <CardModule
            data={expiredReserveDates}
            isDate={false}
            isMoreDetails="adminServices"
            widthConter="100%"
            heightImg="250px"
            heightConter="200px"
            bottomOffset="160"
            styleForAdmin={true}
          />
        </div>
      )}
    </div>
  );
};

export default WarningPage;
