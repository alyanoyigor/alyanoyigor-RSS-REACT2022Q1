export const convertDate = (date: string, monthOptions?: Intl.DateTimeFormatOptions) => {
  const month = new Date(date).toLocaleString('en-US', monthOptions);
  const day = new Date(date).toLocaleString('en-US', { day: '2-digit' });
  const year = new Date(date).getFullYear();
  return { month, day, year };
};
