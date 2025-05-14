"use client";

import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface ReserveDate {
  reserved_from: string; // "YYYY-MM-DD"
  reserved_to: string;
}

interface CustomeDateRangePickerProps {
  reserveData: ReserveDate;
  onRangeSelect: (minDate: Date, maxDate: Date) => void;
}

export default function CustomeDateRangePicker({
  reserveData,
  onRangeSelect,
}: CustomeDateRangePickerProps) {
  const [range, setRange] = useState<[DateObject | null, DateObject | null]>([
    null,
    null,
  ]);

  const minDate = new DateObject({
    date: new Date(reserveData.reserved_from),
    calendar: persian,
    locale: persian_fa,
  });

  const maxDate = new DateObject({
    date: new Date(reserveData.reserved_to),
    calendar: persian,
    locale: persian_fa,
  });



  const handleRangeChange = (dates: any) => {
    setRange(dates);
    if (dates[0] && dates[1]) {
      onRangeSelect(dates[0].toDate(), dates[1].toDate());
    }
  };

  if (!minDate || !maxDate) return null; // جلوگیری از رندر قبل از تنظیم تاریخ‌ها

  return (
    <div style={{ padding: "1rem" }}>
      {/* <h3 className="mb-4">انتخاب بازه‌ی زمانی در محدوده انتخاب‌شده</h3> */}
      <Calendar 
        value={range}
        onChange={handleRangeChange}
        range
        minDate={minDate}
        maxDate={maxDate}
        format="YYYY/MM/DD"
        calendar={persian}
        locale={persian_fa}
        //calendarPosition="bottom-left"
        //placeholder="بازه تاریخ را انتخاب کنید"
      />
    </div>
  );
}
