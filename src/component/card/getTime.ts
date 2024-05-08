export function destructureDate(date: any) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1; // Months are 0-indexed, so add 1
  month = month < 10 ? "0" + month : month; // Add leading zero if single digit
  let day = date.getDate();
  day = day < 10 ? "0" + day : day; // Add leading zero if single digit
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dayOfWeek];

  return { year, month, day, hour, minute, second, dayOfWeek: dayName };
}
