export const dateConversion = (
  date: Date,
  typeDate?: "full" | "time" | "date",
) => {
  const createDate = new Date(date);

  let day;
  let month;
  let hours;
  let minutes;
  const year = createDate.getFullYear();

  createDate.getDate() <= 9
    ? (day = "0" + createDate.getDate())
    : (day = createDate.getDate());
  createDate.getMonth() <= 8
    ? (month = "0" + (createDate.getMonth() + 1))
    : (month = createDate.getMonth() + 1);
  createDate.getHours() <= 9
    ? (hours = "0" + createDate.getHours())
    : (hours = createDate.getHours());
  createDate.getMinutes() <= 9
    ? (minutes = "0" + createDate.getMinutes())
    : (minutes = createDate.getMinutes());

  const convert_date_full =
    day + "." + month + "." + year + " " + hours + ":" + minutes;
  const convert_date_time = hours + ":" + minutes;
  const convert_date = day + "." + month + "." + year;

  if (typeDate) {
    if (typeDate === "full") {
      return convert_date_full;
    }

    if (typeDate === "time") {
      return convert_date_time;
    }

    if (typeDate === "date") {
      return convert_date;
    }
  } else {
    return convert_date_full;
  }
};
