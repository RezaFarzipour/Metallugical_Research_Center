import React from "react";

type ServicesReserveModalBodyTypes = {
  startDate: string | null;
  endDate: string | null;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
};

const ServicesReserveModalBody = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: ServicesReserveModalBodyTypes) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="font-bold">تاریخ شروع رزرو</span>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2"
          value={startDate || ""}
          onChange={handleStartDateChange}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-bold">تاریخ پایان رزرو</span>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2"
          value={endDate || ""}
          onChange={handleEndDateChange}
          min={startDate || undefined} // نمی‌گذاره تاریخ پایان قبل از شروع باشه
        />
      </label>

      {/* نمایش تاریخ انتخاب‌شده (اختیاری) */}
      <div className="text-sm text-gray-600">
        {startDate && endDate && (
          <p>
            شما دستگاه را از <b>{startDate}</b> تا <b>{endDate}</b> رزرو
            می‌کنید.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServicesReserveModalBody;
