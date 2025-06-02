"use client";

import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function AdminDateRangePicker({
  onRangeSelect,
}: {
  onRangeSelect: (minDate: Date, maxDate: Date) => void;
}) {
  const [range, setRange] = useState<[DateObject | null, DateObject | null]>([
    null,
    null,
  ]);

  // تابع تبدیل تاریخ میلادی به شمسی
  const convertToPersianDate = (date: Date): string => {
    return new DateObject({
      date,
      calendar: persian,
      locale: persian_fa,
    }).format("YYYY/MM/DD");
  };

  const handleRangeChange = (dates: any) => {
    setRange(dates);
    if (dates[0] && dates[1]) {
      const minDate = dates[0].toDate(); // تاریخ شروع به میلادی
      const maxDate = dates[1].toDate(); // تاریخ پایان به میلادی

 

      // تبدیل تاریخ‌ها به شمسی برای نمایش
      const persianMinDate = convertToPersianDate(minDate);
      const persianMaxDate = convertToPersianDate(maxDate);

      console.log("Persian Dates:", persianMinDate, persianMaxDate);

      // ارسال تاریخ‌های میلادی به سرور
      onRangeSelect(minDate, maxDate);
    }
  };

  return (
    <DatePicker
      value={range}
      onChange={handleRangeChange}
      range
      format="YYYY/MM/DD"
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-left"
      placeholder="بازه تاریخ را انتخاب کنید"
    />
  );
}
