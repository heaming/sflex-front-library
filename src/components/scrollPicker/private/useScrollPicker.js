/* eslint-disable no-unused-vars */
import { findIndex } from 'lodash-es';
import { createAnimateCanceledError, isAnimateCanceledError } from './animateCancel';

const { max, min, abs, round, floor, PI } = Math;
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
    default: false,
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

  const options = shallowRef();
  const selected = ref();
  const selectedIndex = computed(() => findIndex(items, { value: selected.value?.value }));
  const selectedValue = computed(() => selected.value?.value);

  const optionsStyle = computed(() => {
    const top = '50%';
    const transform = `rotateX(${rotation.value}deg) rotateY(0deg)`;
    return { top, transform };
  });

  const highlightStyle = computed(() => {
    const top = `calc(50% - ${itemSize / 2}px)`;
    return { top };
  });

  const getOptionStyle = (option) => {
    const top = `${-itemSize / 2}px`;
    const height = `${itemSize}px`;
    const transform = `rotateX(${option.angle}deg) translateZ(${radius}px)`;
    const visibility = option.hidden ? 'hidden' : 'visible';
    return { top, height, transform, visibility };
  };

  function createOptions(index) {
    const length = floor(90 / itemAngle) * 2 + 1;
    const m = floor(length / 2);

    return Array.from({ length }, (v, i) => {
      const j = i + index - m;
      const k = normalizeIndex(items, j);
      const angle = (m - i) * itemAngle;
      const hidden = !infinite && j !== k;
      return { ...items[k], angle, hidden };
    });
  }

  function updateOptions(value, initialRotation = 0) {
    rotation.value = initialRotation;

    if (value !== selectedValue.value) {
      const index = max(findIndex(items, { value }), 0);

      options.value = createOptions(index);
      selected.value = items[index];
    }
  }

  function updateValue(value = selectedValue.value) {
    updateOptions(value);

    if (value !== props.modelValue) {
      emit('update:modelValue', value);
    }
  }

  watch(() => props.modelValue, (val) => {
    updateOptions(val ?? items[0]?.value);
  }, { immediate: true });

  const lastAnimationFrameId = ref(null);
  const requestingAnimationFrame = computed(() => lastAnimationFrameId.value !== null);

  function rotate(rotationOffset) {
    if (requestingAnimationFrame.value) return;

    rotation.value += rotationOffset;

    const direction = rotationOffset < 0 ? DIRECTION.UP : DIRECTION.DOWN;
    const indexOffset = round(abs(rotation.value) / itemAngle) * direction;
    const index = selectedIndex.value + indexOffset;

    const normalizedIndex = infinite
      ? normalizeIndex(items, index)
      : min(max(index, 0), items.length - 1);

    const { value } = items[normalizedIndex];

    if (value !== selectedValue.value) {
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

    if (index === -1) return;

    const distance = abs(selectedIndex.value - index);
    const indexOffset = min(distance, normalizeIndex(items, -distance));
    const normalizedIndex = normalizeIndex(items, selectedIndex.value - indexOffset);

    const isUpside = infinite ? normalizedIndex === index : index < selectedIndex.value;
    const direction = isUpside ? DIRECTION.UP : DIRECTION.DOWN;

    const frames = 12;
    const minOffset = itemAngle / 3;
    const rotationOffset = max((indexOffset * itemAngle) / frames, minOffset) * direction;

    rotationFix(direction);

    try {
      while (index !== selectedIndex.value) {
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

  async function scrollBy(indexOffset) {
    const normalizedIndex = normalizeIndex(items, selectedIndex.value + indexOffset);
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
    highlightStyle,
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
