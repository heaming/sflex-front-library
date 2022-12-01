<template>
  <div
    class="kw-scroll-picker"
    @wheel="onWheel"
  >
    <q-list
      class="kw-scroll-picker__options"
      :style="optionsStyle"
    >
      <q-item
        v-for="(option, i) in options"
        :key="i"
        :style="getOptionStyle(option)"
        clickable
        tabindex="-1"
        @click="onClick(option)"
      >
        <q-item-section>
          <q-item-label>
            {{ option.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div
      class="kw-scroll-picker__highlight"
      :style="highlightStyle"
    >
      <q-list
        class="kw-scroll-picker__options"
        :style="optionsStyle"
      >
        <q-item
          v-for="(option, i) in options"
          :key="i"
          :style="getOptionStyle(option)"
          tabindex="-1"
        >
          <q-item-section>
            <q-item-label>
              {{ option.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import useScrollPicker, { useScrollPickerProps, useScrollPickerEmits } from './private/useScrollPicker';

export default {
  name: 'KwScrollPicker',

  props: {
    ...useScrollPickerProps,
  },
  emits: [
    ...useScrollPickerEmits,
  ],

  setup() {
    return {
      ...useScrollPicker(),
    };
  },
};
</script>
