import { FormExpandableContextKey } from '../../consts/private/symbols';

export const useFormExpandableProps = {
  defaultVisibleRows: {
    type: Number,
    default: 2,
  },
};

export default () => {
  const { props } = getCurrentInstance();

  const registeredList = [];
  const registeredCount = ref(0);

  const isExpandable = computed(() => registeredCount.value > props.defaultVisibleRows);
  const isExpanded = ref(false);

  async function updateExpand() {
    registeredCount.value = registeredList.length;
    await nextTick();

    registeredList.forEach((vm, i) => {
      vm.proxy.toggleShowing(
        !isExpandable.value
        || isExpanded.value
        || i < props.defaultVisibleRows,
      );
    });
  }

  function register(vm) {
    registeredList.push(vm);
    updateExpand();
  }

  function unregister(vm) {
    const index = registeredList.findIndex((v) => v === vm);

    if (index > -1) {
      registeredList.splice(index, 1);
      registeredCount.value = registeredList.length;
    }
    updateExpand();
  }

  provide(FormExpandableContextKey, {
    register,
    unregister,
  });

  function toggleExpand(val) {
    isExpanded.value = val ?? !isExpanded.value;
    updateExpand();
  }

  return {
    isExpandable,
    isExpanded,
    toggleExpand,
  };
};
