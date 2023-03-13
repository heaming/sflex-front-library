const regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
export default {
  validator: (value) => regex.test(value),
  message: 'MSG_VAL_TELEPHONE',
};
