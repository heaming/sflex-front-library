import { isEmpty } from 'lodash-es';
import dayjs from 'dayjs';

export default {
  validator: (([from, to], [years]) => {
    if (isEmpty(from || to)) return false;
    if (dayjs(from, 'YYYY').format('YYYY') === 'Invalid Date' || dayjs(to, 'YYYY').format('YYYY') === 'Invalid Date') return false;
    const dateTo = dayjs(to, 'YYYY');
    const fromAfterYears = dayjs(from, 'YYYY').add(years, 'year');
    if (fromAfterYears.diff(dateTo, 'year') < 0) return false;
    return true;
  }),
  message: 'MSG_VAL_DATE_RANGE_YEARS',
};
