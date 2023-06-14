export default {
  validator: (value) => {
    if (!value) return true;
    const isMultiple = Array.isArray(value);
    if (isMultiple) {
      const failedFiles = value.find((file) => !file.serverFile);
      return !failedFiles;
    }
    return value?.serverFile;
  },
  message: 'MSG_VAL_FAILED_FILE',
};
