import i18n from '../../i18n';

const firstOptionValues = [
  true, false, 'all', 'select',
];

const firstOptionLabels = {
  all: ['MSG_TXT_ALL', null, '전체'],
  select: ['MSG_TXT_SEL', null, '선택'],
};

export const useOptionsProps = {
  options: {
    type: Array,
    default: () => [],
  },
  optionValue: {
    type: String,
    default: 'codeId',
  },
  optionLabel: {
    type: String,
    default: 'codeName',
  },
  optionSeparator: {
    type: String,
    default: 'separator',
  },
  firstOption: {
    type: [Boolean, String],
    default: false,
    validator: (v) => firstOptionValues.includes(v),
  },
  firstOptionValue: {
    type: String,
    default: '',
  },
  firstOptionLabel: {
    type: String,
    default: '',
  },
};

export default (valueRef, isSelect = false) => {
  const { props } = getCurrentInstance();

  const emitValue = !isSelect || props.emitValue;
  const value = isSelect ? props.optionValue : 'value';
  const label = isSelect ? props.optionLabel : 'label';
  const separator = isSelect ? props.optionSeparator : 'separator';

  const normalizedOptions = computed(() => {
    const options = [];

    if (props.firstOption) {
      const defaultLabel = firstOptionLabels[props.firstOption]
        && i18n.t(...firstOptionLabels[props.firstOption]);

      options.push({
        [value]: props.firstOptionValue,
        [label]: props.firstOptionLabel || defaultLabel,
      });
    }

    return options.concat(
      props.options.map((e) => (
        e && typeof e === 'object' ? {
          ...e,
          [value]: e[props.optionValue],
          [label]: e[props.optionLabel] ?? String(e[props.optionValue]),
          [separator]: e[props.optionSeparator],
        } : {
          [value]: e,
          [label]: String(e),
          [separator]: false,
        }
      )),
    );
  });

  const isArrayValue = () => isRef(valueRef) && Array.isArray(valueRef.value);

  const selectedAll = computed(() => {
    if (isArrayValue()) {
      const selectedValues = valueRef.value
        .reduce((a, v) => { a[emitValue ? v : v[value]] = true; return a; }, {});
      return normalizedOptions.value.every((v) => selectedValues[v[value]]);
    }
    return false;
  });

  function toggleAll() {
    if (isArrayValue()) {
      valueRef.value = selectedAll.value
        ? [] : normalizedOptions.value.map((v) => (emitValue ? v[value] : v));
    }
  }

  return {
    normalizedOptions,
    selectedAll,
    toggleAll,
  };
};
