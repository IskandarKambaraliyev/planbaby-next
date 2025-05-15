export const formatPrice = (value: number | string): string => {
  const number = typeof value === "string" ? parseInt(value, 10) : value;
  return number.toLocaleString("ru-RU");
};
