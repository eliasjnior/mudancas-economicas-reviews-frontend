import { parseISO, format } from 'date-fns';

export function formatDate(date) {
  const parsedDate = parseISO(date);

  return format(parsedDate, 'dd/MM/yyyy');
}
