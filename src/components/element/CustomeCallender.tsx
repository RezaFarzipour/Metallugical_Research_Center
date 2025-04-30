"use client";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CustomeCallender = () => {
  const [date, setDate] = useState(
    new DateObject({ calendar: persian }).set("date", 10)
  );

  return (
    <div>
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={new DateObject({ calendar: persian }).set("date", 5)}
        maxDate={new DateObject({ calendar: persian }).set("date", 15)}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
      />
    </div>
  );
};

export default CustomeCallender;
