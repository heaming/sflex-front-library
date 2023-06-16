<template>
  <div class="kw-paging-info">
    <div
      v-if="hasTotalCount"
      class="flex items-center self-stretch"
    >
      <span class="kw-paging-info__label">
        {{ $t('MSG_TXT_COM_TOT', null, '총') }}
      </span>
      <span class="kw-paging-info__count">
        {{ totalCountWithComma }}{{ $t('MSG_TXT_CNT', null, '건') }}
      </span>
      <kw-separator
        v-if="hasPageSizeOptions"
        spaced
        vertical
        inset
      />
    </div>
    <kw-select
      v-if="hasPageSizeOptions"
      :model-value="pageSize"
      class="kw-paging-info__rows-per-page"
      :options="normalizedPageSizeOptions"
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
import { getNumberWithComma } from '../../utils/string';

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
    pageSizeOptions: {
      type: Array,
      default: undefined,
    },
    totalCount: {
      type: Number,
      default: undefined,
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
      val = parseInt(val, 10);

      if (await confirmIfTargetsModified?.()) {
        if (props.totalCount && props.totalCount >= 1) {
          emit('update:pageIndex', 1);
          emit('update:pageSize', val, 10);
          emit('change', 1, val);
        }
      }
    }

    const hasPageSizeOptions = computed(() => Array.isArray(props.pageSizeOptions));
    const normalizedPageSizeOptions = computed(() => props.pageSizeOptions.map((v) => parseInt(v?.codeId || v, 10)));
    const hasTotalCount = computed(() => !isNil(props.totalCount));
    const totalCountWithComma = computed(() => hasTotalCount.value && getNumberWithComma(props.totalCount));

    return {
      onUpdateValue,
      hasPageSizeOptions,
      normalizedPageSizeOptions,
      hasTotalCount,
      totalCountWithComma,
    };
  },
};
</script>
