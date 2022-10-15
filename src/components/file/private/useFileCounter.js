export const useFileCounterProps = {
  counterLabel: { type: Boolean, default: true },
};

export default (files) => {
  const { props } = getCurrentInstance();

  const fileSizeToString = (fileSize, fractionDigits) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
    const fd = fractionDigits || fileSize > 1024 ? 1 : 0;
    let unitIndex = 0;
    while (fileSize > 1024 && unitIndex < units.length) {
      fileSize /= 1024;
      unitIndex += 1;
    }
    return fileSize.toFixed(fd) + units[unitIndex];
  };

  const counterProps = computed(() => ({
    totalSize: fileSizeToString(files.value.reduce((acc, file) => acc + file.size, 0)),
    filesNumber: files.value.length,
    maxFiles: props.maxFiles,
  }));

  const defaultCounterLabel = ({ totalSize, filesNumber, maxFiles }) => {
    const counters = [];
    if (props.maxFiles) {
      counters.push(`${filesNumber} files of ${maxFiles}`);
    }
    if (props.maxTotalSize) {
      const maxTotalSizeString = fileSizeToString(props.maxTotalSize);
      let totalSizeString = totalSize;
      if (maxTotalSizeString.at(-2) === totalSizeString.at(-2)) {
        totalSizeString = totalSizeString.replace(/\D*$/g, '');
      }
      counters.push(`${totalSizeString} / ${maxTotalSizeString}`);
    }
    return counters.join(' | ');
  };

  const computedCounterLabel = computed(() => props.counterLabel || defaultCounterLabel);

  const computedCounter = computed(() => computedCounterLabel.value(counterProps.value));

  return {
    fileSizeToString,
    computedCounterLabel,
    computedCounter,
  };
};
