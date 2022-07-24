import { isEmpty } from 'lodash-es';
import { isOverByte } from '../../utils/string';

export default {
  validator: (value, [max]) => isEmpty(value) || !isOverByte(value, parseInt(max, 10)),
  message: 'MSG_VAL_MAX_BYTE',
};
