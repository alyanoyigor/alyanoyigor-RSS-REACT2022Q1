export const convertDate = (date: string, monthOptions?: Intl.DateTimeFormatOptions) => {
  const month = new Date(date).toLocaleString('en-US', monthOptions);
  const day = new Date(date).toLocaleString('en-US', { day: '2-digit' });
  const year = new Date(date).getFullYear();
  return { month, day, year };
};

export const convertLongNum = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};

export const convertTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes}m`;
};
