import { isEmpty } from 'lodash-es';

export default {
  validator: ([from, to]) => !isEmpty(from) && !isEmpty(to),
  message: 'MSG_VAL_DATE_RANGE_REQUIRED',
};
