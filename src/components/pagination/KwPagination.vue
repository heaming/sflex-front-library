<template>
  <q-pagination
    ref="paginationRef"
    class="kw-pagination justify-center"
    :model-value="pageIndex"
    :max="max"
    :max-pages="9"
    :disable="disable"
    unelevated
    direction-links
    boundary-links
    :boundary-numbers="false"
    :ripple="false"
    :ellipses="false"
    icon-first="arrow_prev"
    icon-last="arrow_next"
    icon-prev="arrow_left"
    icon-next="arrow_right"
    @update:model-value="onUpdateValue"
  />
</template>

<script>
import { PageSearchContextKey } from '../../consts/private/symbols';

export default {
  name: 'KwPagination',
  inheritAttrs: false,

  props: {
    pageIndex: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'update:pageIndex',
    'update:pageSize',
    'change',
  ],

  setup(props, { emit }) {
    const max = computed(() => Math.ceil(props.totalCount / props.pageSize));

    const {
      getRegisteredSearch,
    } = inject(PageSearchContextKey, {});

    const confirmIfTargetsModified = getRegisteredSearch?.()?.confirmIfTargetsModified || (() => true);

    async function onUpdateValue(val) {
      if (await confirmIfTargetsModified?.()) {
        emit('update:pageIndex', val);
        emit('change', val, props.pageSize);
      }
    }

    const paginationRef = ref();

    function set(pageIndex) {
      paginationRef.value.set(pageIndex);
    }

    function setByOffset(offset) {
      paginationRef.value.setByOffset(offset);
    }

    return {
      max,
      onUpdateValue,
      paginationRef,
      set,
      setByOffset,
    };
  },
};
</script>
