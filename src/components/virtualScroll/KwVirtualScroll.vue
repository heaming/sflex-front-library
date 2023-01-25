<template>
  <q-virtual-scroll
    ref="scrollRef"
    v-bind="styleClassAttrs"
    class="kw-virtual-scroll"
    :type="type"
    :items="items"
    :items-fn="itemsFn"
    :items-size="itemsSize"
    :separator="separator"
    :scroll-target="scrollTarget"
    :virtual-scroll-horizontal="virtualScrollHorizontal"
    :virtual-scroll-slice-size="virtualScrollSliceSize"
    :virtual-scroll-slice-ratio-before="virtualScrollSliceRatioBefore"
    :virtual-scroll-slice-ratio-after="virtualScrollSliceRatioAfter"
    :virtual-scroll-item-size="virtualScrollItemSize"
    :virtual-scroll-sticky-size-start="virtualScrollStickySizeStart"
    :virtual-scroll-sticky-size-end="virtualScrollStickySizeEnd"
    :table-colspan="tableColspan"
    @virtual-scroll="onVirtualScroll"
  >
    <template
      v-if="$slots.default"
      #default="scope"
    >
      <slot
        name="default"
        v-bind="scope"
      />
    </template>
    <template
      v-if="$slots.before"
      #before
    >
      <slot name="before" />
    </template>
    <template
      v-if="$slots.after"
      #after
    >
      <slot name="after" />
    </template>
  </q-virtual-scroll>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

const typeValues = ['list', 'table'];

export default {
  name: 'KwVirtualScroll',
  inheritAttrs: false,
  props: {
    // fall through props
    type: { type: String, default: 'list', validator: (v) => typeValues.includes(v) },
    items: { type: Array, default: () => [] },
    itemsFn: { type: Function, default: undefined },
    itemsSize: { type: Number, default: undefined },
    separator: { type: Boolean, default: false },
    scrollTarget: { type: [Element, String], default: undefined },
    virtualScrollHorizontal: { type: Function, default: undefined },
    virtualScrollSliceSize: { type: [Number, String], default: undefined },
    virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 },
    virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 },
    virtualScrollItemSize: { type: [Number, String], default: 24 },
    virtualScrollStickySizeStart: { type: [Number, String], default: 0 },
    virtualScrollStickySizeEnd: { type: [Number, String], default: 0 },
    tableColspan: { type: [Number, String], default: undefined },

    // customize props
    debounce: { type: [Number, String], default: 200 },
    initialIndex: { type: Number, default: 0 },
    loadOnMounted: { type: Boolean, default: false },
    onLoad: { type: Function, default: undefined },
  },

  emits: [
    'virtual-scroll',
    'load',
  ],

  setup(props, { emit }) {
    const scrollRef = ref();
    const loadIndex = ref(props.initialIndex);

    function scrollTo(index, edge) {
      scrollRef.value?.scrollTo(index, edge);
    }

    function reset() {
      scrollRef.value?.reset();
    }

    function refresh(index) {
      scrollRef.value?.refresh(index);
    }

    function setIndex(index) {
      loadIndex.value = index;
    }

    let timeoutOnLoad;
    function onLoad() {
      clearTimeout(timeoutOnLoad);

      const timeout = setTimeout(() => {
        loadIndex.value += 1;
        props.onLoad?.(loadIndex.value);
      }, props.debounce);

      timeoutOnLoad = timeout;
    }

    function onVirtualScroll(details) {
      emit('virtual-scroll', details);

      if (details.direction === 'increase') {
        const lastIndex = props.itemsFn ? props.itemsSize - 1 : props.items.length - 1;
        const shouldInvokeOnLoad = details.index === lastIndex;

        if (shouldInvokeOnLoad) {
          onLoad();
        }
      }
    }

    onMounted(() => {
      if (props.loadOnMounted === true) {
        props.onLoad?.(loadIndex.value);
      }
    });

    onBeforeUnmount(() => {
      clearTimeout(timeoutOnLoad);
    });

    return {
      ...useInheritAttrs(),
      scrollRef,
      scrollTo,
      reset,
      refresh,
      setIndex,
      onVirtualScroll,
    };
  },
};
</script>
