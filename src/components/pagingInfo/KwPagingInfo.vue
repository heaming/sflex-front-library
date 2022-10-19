<template>
  <div class="kw-paging-info">
    <div
      v-if="totalCount !== undefined"
      class="flex items-center self-stretch"
    >
      <span>{{ $t('MSG_TXT_COM_TOT', null, '총') }}</span>
      <span class="kw-paging-info__total-count">{{ totalCount }}</span>
      <kw-separator
        spaced
        vertical
        inset
      />
    </div>
    <kw-select
      :model-value="pageSize"
      class="kw-paging-info__rows-per-page"
      :options="options"
      :suffix="$t('MSG_TXT_PER_PAGE_SIZE', null, '개씩보기')"
      borderless
      dense
      ignore-on-reset
      ignore-on-modified
      @update:model-value="onUpdateValue"
    />
  </div>
</template>

<script>
import { isNil } from 'lodash-es';
import { PageSearchContextKey } from '../../consts/private/symbols';

const defaultOptions = [10, 20, 30, 40, 50];

export default {
  name: 'KwPagingInfo',
  inheritAttrs: false,

  props: {
    pageIndex: {
      type: Number,
      default: undefined,
    },
    pageSize: {
      type: Number,
      default: undefined,
    },
    totalCount: {
      type: Number,
      default: undefined,
    },
    options: {
      type: Array,
      default: () => [...defaultOptions],
    },
  },

  emits: [
    'update:pageIndex',
    'update:pageSize',
    'change',
  ],

  setup(props, { emit }) {
    const {
      getRegisteredSearch,
    } = inject(PageSearchContextKey, {});

    const confirmIfTargetsModified = getRegisteredSearch?.()?.confirmIfTargetsModified || (() => true);

    async function onUpdateValue(val) {
      if (await confirmIfTargetsModified?.()) {
        emit('update:pageIndex', 1);
        emit('update:pageSize', val);
        emit('change', 1, val);
      }
    }

    if (isNil(props.pageSize)) {
      const firstOptionVal = props.options[0]?.codeId || props.options[0];
      emit('update:pageSize', firstOptionVal);
    }

    return {
      onUpdateValue,
    };
  },
};
</script>
