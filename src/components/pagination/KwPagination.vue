<template>
  <q-pagination
    class="kw-pagination justify-center"
    :model-value="pageIndex"
    :max="max"
    :max-pages="9"
    unelevated
    direction-links
    boundary-links
    :boundary-numbers="false"
    :ripple="false"
    :ellipses="false"
    @update:model-value="onUpdateValue"
  />
</template>

<script>
import { PageSearchContextKey } from '../../consts/private/symbols';

export default {
  name: 'KwPagination',

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

    watch(() => props.pageSize, async (val, oldVal) => {
      if (await confirmIfTargetsModified?.()) {
        emit('change', props.pageIndex, val);
      } else {
        emit('update:pageSize', oldVal);
      }
    });

    return {
      max,
      onUpdateValue,
    };
  },
};
</script>
