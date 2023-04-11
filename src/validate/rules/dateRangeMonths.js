import { isEmpty } from 'lodash-es';
import dayjs from 'dayjs';

export default {
  validator: (([from, to], [months]) => {
    if (isEmpty(from || to)) return false;
    if (dayjs(from, 'YYYYMM').format('YYYYMM') === 'Invalid Date' || dayjs(to, 'YYYYMM').format('YYYYMM') === 'Invalid Date') return false;
    const dateTo = dayjs(to, 'YYYYMM');
    const fromAfterMonths = dayjs(from, 'YYYYMM').add(months, 'month');
    if (fromAfterMonths.diff(dateTo, 'month') < 0) return false;
    return true;
  }),
  message: 'MSG_VAL_DATE_RANGE_MONTHS',
};
