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
  const computedDense = computed(() => props.dense ?? (isSearchContext || injected?.dense?.value) ?? defaults.dense);

  provide(DenseContextKey, { dense: props.blockInheritDense ? undefined : computedDense });

  return computedDense;
};
