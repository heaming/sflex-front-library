<template>
  <div
    v-touch-pan.vertical.prevent.mouse="onWheel"
    class="kw-scroll-picker"
  >
    <q-list
      class="kw-scroll-picker__options"
      :style="transformPositionStyle"
    >
      <q-item
        v-for="(option, i) in options"
        :key="i"
        :style="getOptionStyle(option)"
        :disable="disable === true"
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
      :style="centralPositionStyle"
    >
      <q-list
        class="kw-scroll-picker__options"
        :style="transformPositionStyle"
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

    <div
      v-if="step === true"
      class="kw-scroll-picker__step"
      :style="centralPositionStyle"
    >
      <q-icon
        :style="stepArrowUpStyle"
        name="arrow_up"
        @click="previous()"
      />
      <q-icon
        :style="stepArrowDownStyle"
        name="arrow_down"
        @click="next()"
      />
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
