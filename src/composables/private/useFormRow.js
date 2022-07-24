import { FormExpandableContextKey } from '../../consts/private/symbols';

export default () => {
  const vm = getCurrentInstance();
  const showing = ref(true);

  function toggleShowing(val) {
    showing.value = val ?? !showing.value;
  }

  Object.assign(vm.proxy, {
    toggleShowing,
  });

  const {
    register,
    unregister,
  } = inject(FormExpandableContextKey, {});

  register(vm);

  onBeforeUnmount(() => {
    unregister(vm);
  });

  return {
    showing,
  };
};
