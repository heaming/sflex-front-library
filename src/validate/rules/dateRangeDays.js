import { isEmpty } from 'lodash-es';
import dayjs from 'dayjs';

export default {
  validator: (([from, to], [days]) => {
    if (isEmpty(from || to)) return false;
    if (dayjs(from, 'YYYYMMDD').format('YYYYMMDD') === 'Invalid Date' || dayjs(to, 'YYYYMMDD').format('YYYYMMDD') === 'Invalid Date') return false;
    const dateTo = dayjs(to, 'YYYYMMDD');
    const fromAfterMonths = dayjs(from, 'YYYYMMDD').add(days, 'day');
    if (fromAfterMonths.diff(dateTo, 'day') < 0) return false;
    return true;
  }),
  message: 'MSG_VAL_DATE_RANGE_DAYS',
};
