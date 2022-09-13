import { FormTypeContextKey } from '../../consts/private/symbols';
import { FORM_TYPE } from './useFormType';

export default () => {
  const isSearchContext = inject(FormTypeContextKey, null) === FORM_TYPE.SEARCH;
  return { isSearchContext };
};
