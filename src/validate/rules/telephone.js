import { isEmpty } from 'lodash-es';

const regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
export default {
  validator: (value) => {
    if (isEmpty(value)) return true;

    const stringValue = String(value);
    if (stringValue.indexOf('-') >= 0) return regex.test(value);

    const { length } = stringValue;
    let formatNum;
    if (length === 11) formatNum = stringValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    // else if (length === 8) formatNum = stringValue.replace(/(\d{4})(\d{4})/, '$1-$2'); // 업체번호?
    else if (stringValue.startsWith('02')) {
      if (length <= 9) formatNum = stringValue.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
      else formatNum = stringValue.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else formatNum = stringValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    return regex.test(formatNum);
  },
  message: 'MSG_VAL_TELEPHONE',
};
