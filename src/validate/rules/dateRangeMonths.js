import { isEmpty } from 'lodash-es';
import { date } from 'quasar';

export default {
  validator: ([from, to], [months]) => isEmpty(from || to)
    || (date.extractDate(to, 'YYYYMMDD').valueOf()
      <= date.addToDate(date.extractDate(from, 'YYYYMMDD'), { months }).valueOf()),
  message: 'MSG_VAL_DATE_RANGE_MONTHS',
};
