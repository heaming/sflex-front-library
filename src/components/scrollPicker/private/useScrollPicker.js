import { findIndex } from 'lodash-es';
import { createAnimateCanceledError, isAnimateCanceledError } from './animateCancel';

const { max, min, abs, floor, ceil, PI } = Math;
const normalizeIndex = ({ length }, index) => (index + (abs(floor(index / length)) + 1) * length) % length;

export const DIRECTION = { UP: -1, DOWN: 1 };

export const useScrollPickerProps = {
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
  infinite: {
    type: Boolean,
    default: true,
  },
};

export const useScrollPickerEmits = [
  'update:modelValue',
];

export default () => {
  const { props, emit } = getCurrentInstance();

  const items = toRaw(props.items);
  const itemSize = toRaw(props.itemSize);
  const itemAngle = toRaw(props.itemAngle);
  const infinite = toRaw(props.infinite);

  const circumference = (itemSize * 360) / itemAngle;
  const radius = circumference / (2 * PI);

  const rotation = ref(0);
  const virtualOptions = shallowRef();
  const options = computed(() => virtualOptions.value ?? items);

  const selectedItem = ref();
  const selectedItemIndex = computed(() => findIndex(items, { value: selectedItem.value?.value }));
  const selectedItemValue = computed(() => selectedItem.value?.value);

  const optionsStyle = computed(() => {
    const top = `calc(50% - ${itemSize / 2}px)`;
    const transform = `rotateX(${rotation.value}deg) rotateY(2deg)`;
    return { top, transform };
  });

  const getOptionStyle = (index) => {
    const m = floor(options.value.length / 2);
    const height = `${itemSize}px`;
    const transform = `rotateX(${(m - index) * itemAngle}deg) translateZ(${radius}px)`;
    return { height, transform };
  };

  const cachedVirtualOptions = new Map();
  function updateOptions(value, initialRotation = 0) {
    rotation.value = initialRotation;

    if (value !== selectedItemValue.value) {
      const index = max(findIndex(items, { value }), 0);
      const length = floor(90 / itemAngle) * 2 + 1;
      const m = infinite ? floor(length / 2) : 0;

      if (!cachedVirtualOptions.has(value)) {
        const newVirtualOptions = Array.from({ length }, (v, i) => items[normalizeIndex(items, i + index - m)]);
        cachedVirtualOptions.set(value, newVirtualOptions);
      }

      virtualOptions.value = cachedVirtualOptions.get(value);
      selectedItem.value = items[index];
    }
  }

  function updateValue(value = selectedItemValue.value) {
    updateOptions(value);

    if (value !== props.modelValue) {
      emit('update:modelValue', value);
    }
  }

  watch(() => props.modelValue, (val) => {
    updateOptions(val);
  }, { immediate: true });

  const lastAnimationFrameId = ref(null);
  const requestingAnimationFrame = computed(() => lastAnimationFrameId.value !== null);

  function rotate(rotationOffset) {
    if (requestingAnimationFrame.value) return;

    rotation.value += rotationOffset;

    const x = rotation.value / itemAngle;
    const indexOffset = rotationOffset < 0 ? ceil(x) : floor(x);
    const normalizedIndex = normalizeIndex(items, selectedItemIndex.value + indexOffset);
    const { value } = items[normalizedIndex];

    if (value !== selectedItemValue.value) {
      const overflowedRotation = rotation.value % itemAngle;
      updateOptions(value, overflowedRotation);
    }
  }

  function rotationFix(direction) {
    const rotationOffset = (itemAngle * direction - rotation.value) % itemAngle;
    rotate(rotationOffset);
  }

  function animate(rotationOffset) {
    cancelAnimationFrame(lastAnimationFrameId.value);

    return new Promise((resolve, reject) => {
      const animationFrameId = requestAnimationFrame(() => {
        lastAnimationFrameId.value = null;
        rotate(rotationOffset);
        resolve();
      });

      lastAnimationFrameId.value = animationFrameId;

      requestAnimationFrame(() => {
        reject(createAnimateCanceledError(animationFrameId));
      });
    });
  }

  async function scrollTo(value) {
    const index = findIndex(items, { value });

    if (index > -1) {
      const distance = abs(selectedItemIndex.value - index);
      const indexOffset = min(distance, normalizeIndex(items, -distance));

      const normalizedIndex = normalizeIndex(items, selectedItemIndex.value - indexOffset);
      const direction = normalizedIndex === index ? DIRECTION.UP : DIRECTION.DOWN;
      const rotationOffset = max((indexOffset * itemAngle) / 12, itemAngle / 3) * direction;

      rotationFix(direction);

      try {
        while (index !== selectedItemIndex.value) {
          // eslint-disable-next-line no-await-in-loop
          await animate(rotationOffset);
        }

        updateValue(value);
      } catch (e) {
        if (!isAnimateCanceledError(e)) {
          throw e;
        }
      }
    }
  }

  async function scrollBy(indexOffset) {
    const normalizedIndex = normalizeIndex(items, selectedItemIndex.value + indexOffset);
    const { value } = items[normalizedIndex];
    await scrollTo(value);
  }

  async function previous() {
    await scrollBy(-1);
  }

  async function next() {
    await scrollBy(1);
  }

  return {
    items,
    itemSize,
    itemAngle,

    rotation,
    options,
    optionsStyle,
    getOptionStyle,

    updateValue,
    rotate,
    animate,
    scrollTo,
    scrollBy,
    previous,
    next,
  };
};
