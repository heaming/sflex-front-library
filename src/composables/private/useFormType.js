import { FormTypeContextKey } from '../../consts/private/symbols';

export const FORM_TYPE = {
  FORM: 'KwForm',
  SEARCH: 'KwSearch',
};

export default (type) => {
  const injectedType = inject(FormTypeContextKey, null);

  if (type !== injectedType) {
    const vm = getCurrentInstance();
    console.error(`${vm.type.name} needs to be child of ${type}`);
  }
};
