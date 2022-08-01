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
import { ObserverContextKey } from '../../consts/private/symbols';
import { confirm } from '../../plugins/dialog';
import i18n from '../../i18n';

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
    modifiedTargets: {
      type: Array,
      default: () => [],
    },
  },

  emits: [
    'update:modelValue',
    'change',
  ],

  setup(props, { emit }) {
    const max = computed(() => Math.ceil(props.totalCount / props.pageSize));

    const {
      getRegisteredChild,
    } = inject(ObserverContextKey, {});

    async function confirmIfTargetsModified() {
      const targets = props.modifiedTargets.map(getRegisteredChild);
      const isModified = targets.some((e) => e?.ctx.isModified());
      return !isModified || await confirm(i18n.t('MSG_ALT_CHG_CNTN'));
    }

    async function onUpdateValue(val) {
      if (await confirmIfTargetsModified()) {
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
