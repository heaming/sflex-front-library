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
    registerExpandableChild,
    unregisterExpandableChild,
  } = inject(FormExpandableContextKey, {});

  onMounted(() => {
    registerExpandableChild?.(vm);
  });

  onBeforeUnmount(() => {
    unregisterExpandableChild?.(vm);
  });

  return {
    showing,
  };
};
