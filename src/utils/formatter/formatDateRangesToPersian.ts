import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface ReserveDate {
  reserved_from: string; // مثلاً "2025-04-26"
  reserved_to: string;
}

export function formatDateRangesToPersian(
  reserveDates: ReserveDate[],
  separator: string = " / ",
  format: string = "YYYY/MM/DD"
): string {
  if (!Array.isArray(reserveDates)) return "";

  return reserveDates
    .map(({ reserved_from, reserved_to }) => {
      const from = new DateObject({
        date: new Date(reserved_from),
        calendar: persian,
        locale: persian_fa,
      }).format(format);

      const to = new DateObject({
        date: new Date(reserved_to),
        calendar: persian,
        locale: persian_fa,
      }).format(format);

      return `${from} تا ${to}`;
    })
    .join(separator);
}

export const formatDateRangesToPersian2 = (date: string): string => {
  // برای مثال با dayjs:
  // return dayjs(date).locale('fa').format('YYYY/MM/DD');

  // یا اگر بدون کتابخانه:
  return new Date(date).toLocaleDateString("fa-IR"); // ساده‌شده
};


export function getDayPart() {
  const getTimeOfDay = (hour) => {
    if (hour >= 5 && hour < 12) {
      return "صبح";
    } else if (hour >= 12 && hour < 17) {
      return "ظهر";
    } else if (hour >= 17 && hour < 21) {
      return "عصر";
    } else {
      return "شب";
    }
  };

  // استفاده از تابع
  const currentHour = new Date().getHours();
  const timeOfDay = getTimeOfDay(currentHour);

  return timeOfDay;
}

export const today = new Date().toLocaleDateString("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});