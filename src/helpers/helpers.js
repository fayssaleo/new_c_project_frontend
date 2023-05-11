const moment = require("moment");

export function formatToSimpleFormatDD_MM_YYYY(d) {
  return moment(d).format("MM/DD/YYYY");
}
export function FormatDateStringToISOSimpleEnglishDate(d) {
  let dateHolderArray = elements[0].split("-");

  return (
    dateHolderArray[2] + "/" + dateHolderArray[1] + "/" + dateHolderArray[0]
  );
}
export function toLaravelDatetime(d) {
  if (d == "") return "";
  if (d == null) return "";

  let dateHolderArray = d.split("/");

  return (
    dateHolderArray[2] + "-" + dateHolderArray[0] + "-" + dateHolderArray[1]
  );
}
export function NullTest(d) {
  return !d ? "" : d;
}
