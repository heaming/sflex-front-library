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
        :style="getOptionStyle(i)"
        clickable
        tabindex="-1"
        @click="onClickOption(option)"
      >
        <q-item-section>
          <q-item-label>
            {{ option.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="kw-scroll-picker__highlight">
      <q-list
        class="kw-scroll-picker__options"
        :style="optionsStyle"
      >
        <q-item
          v-for="(option, i) in options"
          :key="i"
          :style="getOptionStyle(i)"
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
import useScrollPicker, { useScrollPickerProps, useScrollPickerEmits, DIRECTION } from './private/useScrollPicker';
import { stopAndPrevent } from '../../utils/private/event';

export default {
  name: 'KwScrollPicker',

  props: {
    ...useScrollPickerProps,
  },
  emits: [
    ...useScrollPickerEmits,
  ],

  setup() {
    const ctx = useScrollPicker();

    function onWheel(evt) {
      stopAndPrevent(evt);

      const direction = evt.deltaY < 0 ? DIRECTION.UP : DIRECTION.DOWN;
      const rotationOffset = ctx.itemAngle * direction;

      ctx.rotate(rotationOffset);
      ctx.updateValue();
    }

    function onClickOption(option) {
      ctx.scrollTo(option.value);
    }

    return {
      ...ctx,
      onWheel,
      onClickOption,
    };
  },
};
</script>
