<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      virtualScroll
    </h2>
    <p class="kw-guide-description">
      virtualScroll
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="virtualScrollProps"
        title="virtualScrollProps"
      />
      <kw-separator />
      <kw-virtual-scroll
        v-slot="{ item, index }"
        style="max-height: 300px;"
        v-bind="bindingProps"
      >
        <div>
          #{{ index }} - {{ item.label }}
        </div>
      </kw-virtual-scroll>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-virtual-scroll
        v-slot="{ item, index }"
        style="max-height: 300px;"
        v-bind="bindingProps"
      >
        <div>
          #{{ index }} - {{ item.label }}
        </div>
      </kw-virtual-scroll>
    </guide-section>
  </kw-page>
</template>

<script setup>
const virtualScrollProps = {
  type: { type: String, default: 'list' },
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
};

const maxSize = 10000;
const heavyList = [];

for (let i = 0; i < maxSize; i += 1) {
  heavyList.push({
    label: `Option ${i + 1}`,
  });
}

const bindingProps = ref({
  items: heavyList,
});

const defaultCode = `
      <kw-virtual-scroll
        v-slot="{ item, index }"
        style="max-height: 300px;"
        v-bind="bindingProps"
      >
        <div>
          #{{ index }} - {{ item.label }}
        </div>
      </kw-virtual-scroll>`;
</script>
