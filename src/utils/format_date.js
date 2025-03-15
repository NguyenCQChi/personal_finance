const month_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const format_date = (date) => {
  const date_array = date.split("T");
  const date_split = date_array[0];
  // const time_split = date_array[1];

  const year = date_split.split("-")[0];
  const month = date_split.split("-")[1];
  const day = date_split.split("-")[2];

  const day_string = day.toString() + " " + month_array[month - 1] + " " + year.toString();

  return day_string
}

export default format_date