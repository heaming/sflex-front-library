/* eslint-disable no-bitwise */
import { FormExpandableContextKey } from '../../consts/private/symbols';

export const useFormExpandableProps = {
  defaultVisibleRows: {
    type: Number,
    default: 2,
  },
  expandWhenMounted: {
    type: Boolean,
    default: true,
  },
};

export default () => {
  const { props } = getCurrentInstance();

  const registeredList = [];
  const registeredCount = ref(0);

  const isExpandable = computed(() => registeredCount.value > props.defaultVisibleRows);
  const isExpanded = ref(false);

  async function updateExpand(forceExpand = false) {
    let count = 0;
    if (forceExpand) isExpanded.value = true;
    registeredList.forEach((vm) => {
      if (vm.proxy.$el.style.display !== 'none') {
        vm.proxy.toggleShowing(
          !isExpandable.value
        || isExpanded.value
        || count < props.defaultVisibleRows,
        );
        count++;
      }
    });
    registeredCount.value = count;
  }

  function registerExpandableChild(vm) {
    registeredList.push(vm);
    registeredList.sort((n, o) => {
      const node = n.proxy.$el;
      const otherNode = o.proxy.$el;
      if (node.style.display !== 'none' && otherNode.style.display === 'none') {
        return -1;
      }
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

  // 필수처리된 item들이 hidden Row에 있을 경우 펼쳐진 상태로.
  function expandWhenRequiredItemsInHiddenRows() {
    if (isExpandable.value) {
      let i = props.defaultVisibleRows;
      for (i; i < registeredCount.value; i += 1) {
        const rowItems = registeredList[i].slots.default?.();
        const shouldExpand = rowItems.some((rowItem) => rowItem.props?.required || rowItem.props?.required === '');

        if (shouldExpand) {
          toggleExpand(true);
          break;
        }
      }
    }
  }

  onMounted(() => {
    if (props.expandWhenMounted) expandWhenRequiredItemsInHiddenRows();
  });

  return {
    isExpandable,
    isExpanded,
    toggleExpand,
    updateExpand,
  };
};
