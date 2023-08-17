export const useFileCounterProps = {
  counterLabel: { type: Function, default: undefined },
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

  const fileSizeToNumber = (fileSize) => {
    if (typeof fileSize === 'number') return Number.parseInt(fileSize, 10);
    const units = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const delimiterRemoved = fileSize.replaceAll(/[,_\s]/g, '');
    const findFirstCharOfUnit = /\d*([^.\d])/;
    const firstUnit = findFirstCharOfUnit.exec(delimiterRemoved)[1].toUpperCase();
    const numberFloat = Number.parseFloat(delimiterRemoved);
    return numberFloat * 1024 ** (units.indexOf(firstUnit) || 0);
  };

  const counterProps = computed(() => ({
    totalSize: fileSizeToString(files.value.reduce((acc, file) => acc + file.size, 0)),
    filesNumber: files.value.length,
    maxFiles: props.maxFiles,
  }));

  const defaultCounterLabel = ({ totalSize, filesNumber, maxFiles }) => {
    const totalSizeInt = fileSizeToNumber(totalSize);
    const counters = [];
    if (props.maxFiles) {
      counters.push(`${filesNumber} files of ${maxFiles}`);
    }
    if (props.maxTotalSize) {
      const maxTotalSizeString = fileSizeToString(props.maxTotalSize);
      const totalSizeString = fileSizeToString(totalSizeInt);
      // if (maxTotalSizeString.at(-2) === totalSizeString.at(-2)) {
      // totalSizeString = totalSizeString.replace(/\D*$/g, '');
      // }
      counters.push(`${totalSizeString} / ${maxTotalSizeString}`);
    }
    return counters.join(' | ');
  };

  const computedCounterLabel = computed(() => {
    if (props.counterLabel) {
      return () => props.counterLabel(counterProps.value);
    }
    return defaultCounterLabel;
  });

  const computedCounter = computed(() => computedCounterLabel.value(counterProps.value));

  return {
    fileSizeToNumber,
    fileSizeToString,
    computedCounterLabel,
    computedCounter,
  };
};
