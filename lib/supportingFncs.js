export function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB"); // 'en-GB' for DD/MM/YYYY format
  return formattedDate;
}
