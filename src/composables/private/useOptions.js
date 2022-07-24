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

const normalizeOption = (option, { optionValue, optionLabel }) => (
  option && typeof option === 'object' ? {
    ...option,
    value: option[optionValue],
    label: option[optionLabel] ?? String(option[optionValue]),
    [optionValue]: undefined,
    [optionLabel]: undefined,
  } : {
    value: option,
    label: String(option),
  }
);

export default () => {
  const { props } = getCurrentInstance();
  const { t } = useI18n();

  const normalizedOptions = computed(() => {
    const options = [];

    if (props.firstOption) {
      const defaultLabel = firstOptionLabels[props.firstOption]
        && t(...firstOptionLabels[props.firstOption]);

      options.push({
        value: props.firstOptionValue,
        label: props.firstOptionLabel || defaultLabel,
      });
    }

    return options.concat(
      props.options.map((e) => normalizeOption(e, props)),
    );
  });

  return {
    normalizedOptions,
  };
};
