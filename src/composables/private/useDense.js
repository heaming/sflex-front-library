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
    if (props.dense !== undefined) { return props.dense; }
    if (isSearchContext) { return true; }
    if (injected?.dense !== undefined) { return injected?.dense?.value; }
    return defaults.dense;
  });

  provide(DenseContextKey, {
    dense: (props.blockInheritDense ?? defaults.blockInheritDense) ? undefined : computedDense,
  });

  return computedDense;
};
