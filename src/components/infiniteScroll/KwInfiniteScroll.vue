<template>
  <slot />
  <InfiniteLoading
    :target="target"
    @infinite="load"
  />
</template>

<script>
import InfiniteLoading from 'v3-infinite-loading';
import { klona as deepCopy } from 'klona/full';

export default {
  name: 'KwInfiniteScroll',
  components: {
    InfiniteLoading,
  },
  props: {
    modelValue: { type: Array, default: () => ([]) },
    target: {
      type: String,
      default: 'window',
    },
    infiniteHandler: {
      type: Function,
      default: undefined,
    },
    pageInfo: {
      type: Object,
      default: () => ({
        pageIndex: 1,
        pageSize: 5,
        totalCount: 0,
        needTotalCount: false,
      }),
    },
  },

  emits: [
    'loadData',
  ],

  setup(props, { emit }) {
    const contents = ref(props.modelValue);
    let pageInfo = deepCopy(props.pageInfo);

    const load = async ($state) => {
      try {
        emit('loadData', pageInfo, (res) => {
          const response = res;
          const adds = response.data.list;
          pageInfo = response.data.pageInfo;
          if (adds.length < pageInfo.pageSize) $state.complete();
          else {
            contents.value.push(...adds);
            $state.loaded();
          }
          // eslint-disable-next-line no-plusplus
          pageInfo.pageIndex++;
        });
      } catch (error) {
        $state.error();
      }
    };

    return {
      load,
      contents,
    };
  },
};

</script>
