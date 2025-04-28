const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;
const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
export function toPersianNumbersWithComma(n: number | string): string {
  const numWithCommas = numberWithCommas(n); // 1000,2343
  const persianNumber = toPersianNumbers(numWithCommas);
  return persianNumber;
}

function numberWithCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPersianNumbers(n: number | string): string {
  return n.toString().replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
}

export function toEnglishNumbers(n: number | string): string {
  return n.toString().replace(/[۰-۹]/g, (x: string) => englishDigits[farsiDigits.indexOf(x as any)]);
}