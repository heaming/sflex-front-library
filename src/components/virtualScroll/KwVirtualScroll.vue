<template>
  <q-virtual-scroll
    ref="quasarRef"
    v-bind="styleClassAttrs"
    class="kw-virtual-scroll"
    :type="type"
    :items="items"
    :items-fn="itemsFn"
    :items-size="itemsSize"
    :scroll-target="scrollTarget"
    :virtual-scroll-horizontal="virtualScrollHorizontal"
    :on-virtual-scroll="onVirtualScroll"
    :virtual-scroll-slice-size="virtualScrollSliceSize"
    :virtual-scroll-slice-ratio-before="virtualScrollSliceRatioBefore"
    :virtual-scroll-slice-ratio-after="virtualScrollSliceRatioAfter"
    :virtual-scroll-item-size="virtualScrollItemSize"
    :virtual-scroll-sticky-size-start="virtualScrollStickySizeStart"
    :virtual-scroll-sticky-size-end="virtualScrollStickySizeEnd"
    :table-colspan="tableColspan"
    @virtual-scroll="$emit('virtual-scroll', $event)"
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
      v-if="$slots.after"
      #after
    >
      <slot name="after" />
    </template>
    <template
      v-if="$slots.before"
      #before
    >
      <slot name="before" />
    </template>
  </q-virtual-scroll>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

const typeOptions = ['list', 'table', '__qtable'];

export default {
  name: 'KwVirtualScroll',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    type: { type: String, default: 'list', validator: (v) => typeOptions.includes(v) },
    items: { type: Array, default: () => [] },
    itemsFn: { type: Function, default: undefined },
    itemsSize: { type: Number, default: undefined },
    scrollTarget: { type: [Element, String], default: undefined },
    virtualScrollHorizontal: { type: Function, default: undefined },
    onVirtualScroll: { type: Function, default: undefined },
    virtualScrollSliceSize: { type: [Number, String], default: undefined },
    virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 },
    virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 },
    virtualScrollItemSize: { type: [Number, String], default: 24 },
    virtualScrollStickySizeStart: { type: [Number, String], default: 0 },
    virtualScrollStickySizeEnd: { type: [Number, String], default: 0 },
    tableColspan: { type: [Number, String], default: undefined },

  },
  emits: [
    'virtual-scroll',
  ],
  setup() {
    const { styleClassAttrs } = useInheritAttrs();
    const quasarRef = ref();
    function scrollTo(...args) { quasarRef.value?.scrollTo(...args); }
    function reset(...args) { quasarRef.value?.reset(...args); }
    function refresh(...args) { quasarRef.value?.refresh(...args); }

    return {
      quasarRef,
      styleClassAttrs,
      scrollTo,
      reset,
      refresh,
    };
  },
};
</script>
