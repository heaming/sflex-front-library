import { isEmpty } from 'lodash-es';
import { date } from 'quasar';

export default {
  validator: ([from, to], [years]) => isEmpty(from || to)
    || (date.extractDate(to, 'YYYYMMDD').valueOf()
      <= date.addToDate(date.extractDate(from, 'YYYYMMDD'), { years }).valueOf()),
  message: 'MSG_VAL_DATE_RANGE_YEARS',
};
