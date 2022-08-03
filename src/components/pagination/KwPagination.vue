<template>
  <q-pagination
    class="kw-pagination justify-center"
    :model-value="modelValue"
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
    modelValue: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalCount: {
      type: Number,
      default: 1,
    },
  },

  emits: [
    'update:modelValue',
    'change',
  ],

  setup(props, { emit }) {
    const max = computed(() => Math.ceil(props.totalCount / props.pageSize));

    const {
      getRegisteredSearch,
    } = inject(PageSearchContextKey, {});

    const confirmIfTargetsModified = getRegisteredSearch?.().confirmIfTargetsModified || (() => true);

    async function onUpdateValue(val) {
      if (await confirmIfTargetsModified?.()) {
        emit('update:modelValue', val);
        emit('change', {
          pageNo: val,
          pageSize: props.pageSize,
        });
      }
    }

    return {
      max,
      onUpdateValue,
    };
  },
};
</script>
