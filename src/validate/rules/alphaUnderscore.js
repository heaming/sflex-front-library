import { isEmpty } from 'lodash-es';

function validator(value) {
  if (isEmpty(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((val) => validator(val));
  }
  return /^[0-9A-Z_]*$/i.test(value);
}

export default {
  validator,
  message: 'MSG_VAL_ALPHA_UNDERSCORE',
};
