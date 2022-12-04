/* eslint-disable no-bitwise */
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
    registeredList.forEach((vm, i) => {
      vm.proxy.toggleShowing(
        !isExpandable.value
        || isExpanded.value
        || i < props.defaultVisibleRows,
      );
    });
  }

  function registerExpandableChild(vm) {
    registeredList.push(vm);
    registeredList.sort((n, o) => {
      const node = n.proxy.$el;
      const otherNode = o.proxy.$el;
      const relativePosition = node.compareDocumentPosition(otherNode);
      const isOtherNodeFollowing = relativePosition & Node.DOCUMENT_POSITION_FOLLOWING;

      return isOtherNodeFollowing ? -1 : 1;
    });

    updateExpand();
  }

  function unregisterExpandableChild(vm) {
    const index = registeredList.findIndex((v) => v === vm);

    if (index > -1) {
      registeredList.splice(index, 1);
      registeredCount.value = registeredList.length;
    }
    updateExpand();
  }

  provide(FormExpandableContextKey, {
    registerExpandableChild,
    unregisterExpandableChild,
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
