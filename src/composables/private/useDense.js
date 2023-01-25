import useSearchChild from './useSearchChild';
import { DenseContextKey } from '../../consts/private/symbols';

export const useDenseProps = {
  dense: { type: Boolean, default: undefined },
  blockInheritDense: { type: Boolean, default: undefined },
};

export default (defaults = {}) => {
  const { props } = getCurrentInstance();

  const { isSearchContext } = useSearchChild();

  const injected = inject(DenseContextKey, null);
  const computedDense = computed(() => {
    if (typeof props.dense === 'boolean') { return props.dense; }
    if (isSearchContext) { return true; }
    if (typeof injected?.dense?.value === 'boolean') { return injected.dense.value; }
    if (typeof defaults.dense === 'boolean') { return defaults.dense; }
    return undefined;
  });

  provide(DenseContextKey, {
    dense: (props.blockInheritDense ?? defaults.blockInheritDense) ? undefined : computedDense,
  });

  return computedDense;
};
