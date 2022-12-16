import useDense, { useDenseProps } from './useDense';
import useStretch, { useStretchProps } from './useStretch';
import { ListContextKey } from '../../consts/private/symbols';

export const useItemStyleProps = {
  ...useDenseProps,
  ...useStretchProps,

  padding: { type: [Boolean, String], default: undefined },
  blockInheritPadding: { type: Boolean, default: undefined },
};

export default (defaults = {}) => {
  const { props } = getCurrentInstance();

  const computedDense = useDense({
    blockInheritDense: false,
    ...defaults,
  });

  const injectionFromList = inject(ListContextKey, null);

  const computedPadding = computed(() => {
    const paddingValue = (props.padding !== undefined ? props.padding
      : (injectionFromList?.padding?.value ?? undefined));
    if (paddingValue === '' || paddingValue === true) {
      return true;
    }
    return paddingValue;
  });

  const { stretchClass } = useStretch(defaults);

  const itemClass = computed(() => ({
    ...stretchClass.value,
    'kw-item': true,
    'kw-item-type': true,
    'kw-item-type--dense': computedDense.value === true,
    'kw-item-type--padding': computedPadding.value === true,
  }));

  const itemStyle = computed(() => {
    const styles = {};
    if (typeof computedPadding.value === 'string') { styles.padding = computedPadding.value; }
    return styles;
  });

  provide(ListContextKey, {
    padding: (props.blockInheritPadding ?? defaults.blockInheritPadding)
      ? undefined
      : computedPadding,
  });

  return {
    itemClass,
    itemStyle,
  };
};
