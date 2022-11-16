<template>
  <div class="scroll-picker">
    <div class="scroll-picker__control">
      <q-list
        class="scroll-picker__options"
        :style="optionsStyle"
        @wheel="onWheel"
      >
        <q-item
          v-for="(option, i) in options"
          :key="i"
          :style="getOptionStyle(i)"
          clickable
          tabindex="-1"
          @click="scrollTo(option.value)"
        >
          <q-item-section>
            <q-item-label>
              {{ option.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- <div
        class="scroll-picker__highlight"
        :style="{height: `${itemSize}px`, transform: `translateY(${((controlSize - 1) * itemSize) / 2}px)`}"
      /> -->
    </div>
  </div>
</template>

<script>

const ANIMATE_CANCELED_MESSAGE = 'Animate canceled';

export default {
  name: 'ScrollPicker',
  props: {
    modelValue: {
      type: [Number, String, Boolean],
      default: undefined,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemSize: {
      type: Number,
      default: 34,
    },
    itemAngle: {
      type: Number,
      default: 18,
    },
  },
  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const options = shallowRef([]);
    const optionsRotate = ref();
    const optionsBaseIndex = ref();
    const optionsBaseItemValue = computed(() => options.value[optionsBaseIndex.value]?.value);
    const optionsBaseItemIndex = computed(() => props.items.findIndex((e) => e.value === optionsBaseItemValue.value));
    const optionsStyle = computed(() => ({ transform: `rotateX(${optionsRotate.value}deg)` }));

    const circumference = computed(() => (props.itemSize * 360) / props.itemAngle);
    const radius = computed(() => circumference.value / (2 * Math.PI));

    const getOptionStyle = (index) => ({
      top: `${-props.itemSize / 2}px`,
      height: `${props.itemSize}px`,
      transform: `rotateX(${(optionsBaseIndex.value - index) * props.itemAngle}deg) translateZ(${radius.value}px)`,
    });

    const normalizeIndex = (index) => (index + props.items.length) % props.items.length;

    function updateOptions(value, rotate = 0) {
      const { items, itemAngle } = props;
      const index = Math.max(items.findIndex((e) => e.value === value), 0);
      const length = Math.floor(90 / itemAngle) * 2 + 1;
      const baseIndex = Math.floor(length / 2);

      options.value = Array.from({ length }, (v, i) => items[normalizeIndex(i + index - baseIndex)]);
      optionsRotate.value = rotate;
      optionsBaseIndex.value = baseIndex;
    }

    function updateValue(value) {
      if (value !== props.modelValue) {
        emit('update:modelValue', value);
      }
    }

    watch(() => props.modelValue, (val) => {
      updateOptions(val);
    }, { immediate: true });

    let animationFrameId;

    function animate(rotateOffset, updateValueOnChange = true) {
      cancelAnimationFrame(animationFrameId);

      return new Promise((resolve, reject) => {
        animationFrameId = requestAnimationFrame(() => {
          optionsRotate.value += rotateOffset;

          const { items, itemAngle } = props;
          const mathFn = rotateOffset < 0 ? Math.ceil : Math.floor;
          const indexOffset = mathFn(optionsRotate.value / itemAngle);
          const normalizedIndex = normalizeIndex(optionsBaseItemIndex.value + indexOffset);
          const { value } = items[normalizedIndex];

          if (value !== optionsBaseItemValue.value) {
            const overflowedRotate = optionsRotate.value % itemAngle;
            updateOptions(value, overflowedRotate);

            if (updateValueOnChange) updateValue(value);
          }

          resolve();
        });

        requestAnimationFrame(() => {
          reject(ANIMATE_CANCELED_MESSAGE);
        });
      });
    }

    async function scrollTo(value) {
      const index = props.items.findIndex((e) => e.value === value);

      if (index === -1) return;

      const { itemAngle } = props;
      const distance = Math.abs(optionsBaseItemIndex.value - index);
      const indexOffset = Math.min(distance, normalizeIndex(-distance));
      const direction = normalizeIndex(optionsBaseItemIndex.value - indexOffset) === index ? -1 : 1;
      const rotateOffset = Math.max((indexOffset * itemAngle) / 12, itemAngle / 3) * direction;

      try {
        const fixRotateOffset = (itemAngle * direction - optionsRotate.value) % itemAngle;

        if (fixRotateOffset) {
          await animate(fixRotateOffset, false);
        }

        while (index !== optionsBaseItemIndex.value) {
          // eslint-disable-next-line no-await-in-loop
          await animate(rotateOffset, false);
        }

        updateValue(value);
      } catch (e) {
        if (e !== ANIMATE_CANCELED_MESSAGE) throw e;
      }
    }

    async function scrollBy(indexOffset) {
      const normalizedIndex = normalizeIndex(optionsBaseItemIndex.value + indexOffset);
      const { value } = props.items[normalizedIndex];
      await scrollTo(value);
    }

    async function previous() {
      await scrollBy(-1);
    }

    async function next() {
      await scrollBy(1);
    }

    function onWheel(evt) {
      scrollBy(evt.deltaY < 0 ? -2 : 2);
    }

    return {
      options,
      optionsRotate,
      optionsBaseIndex,
      optionsStyle,
      getOptionStyle,
      scrollTo,
      scrollBy,
      previous,
      next,
      onWheel,
    };
  },
};
</script>

<style lang="scss">
.scroll-picker {
  &__control {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to bottom, rgb(255 255 255 / 75%), rgb(255 255 255 / 0%));
      z-index: 1;
      pointer-events: none;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to bottom, rgb(255 255 255 / 0%), rgb(255 255 255 / 75%));
      z-index: 1;
      pointer-events: none;
    }
  }

  &__options {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 0;
    transform-style: preserve-3d;

    .q-item {
      position: absolute;
      width: 100%;
      min-height: initial;
      padding: 7px 12px;
      font-size: 14px;
      font-weight: 500;
      color: $black2;

      &__label {
        text-align: center;
      }

      &.q-router-link--active,
      &--active {
        font-weight: 700;
        color: $black2;
      }

      // .q-focus-helper {
      //   display: none;
      // }
    }
  }

  &__highlight {
    position: absolute;
    top: 0;
    width: 100%;
    background: $placeholder;
    opacity: 0.1;
    pointer-events: none;
  }
}
</style>
