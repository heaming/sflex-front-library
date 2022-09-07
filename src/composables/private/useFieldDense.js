import { FormTypeContextKey } from '../../consts/private/symbols';
import { FORM_TYPE } from './useFormType';

export const useFieldDenseProps = {
  dense: {
    type: Boolean,
    default: false,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const isSearchContext = inject(FormTypeContextKey, null) === FORM_TYPE.SEARCH;

  return computed(() => isSearchContext || props.dense);
};
