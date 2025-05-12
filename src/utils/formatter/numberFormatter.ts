export function toPersianDigits(n: number | string): string {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}


export const sp = (number:string |number|undefined ) => {
  if (number ===undefined) return;
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
    
  const joinedNumber = seperatedNumber?.join(",");
  return (joinedNumber);
};