/* eslint-disable no-await-in-loop */
import { findIndex } from 'lodash-es';
import { createAnimateCanceledError, isAnimateCanceledError } from './animateCancel';
import { stopAndPrevent } from '../../../utils/private/event';
import { normalizeArrayIndex } from '../../../utils/private/normalize';

const { max, min, abs, round, floor, PI } = Math;

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
  rotateY: {
    type: Number,
    default: 0,
  },
  animateOnValueUpdate: {
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
  const rotateY = toRef(props, 'rotateY');

  const circumference = (itemSize * 360) / itemAngle;
  const radius = circumference / (2 * PI);
  const rotation = ref(0);

  const options = shallowRef();
  const selected = ref();
  const selectedIndex = computed(() => findIndex(items, { value: selected.value?.value }));
  const selectedValue = computed(() => selected.value?.value);

  const optionsStyle = computed(() => {
    const top = '50%';
    const transform = `rotateY(${rotateY.value}deg) translateZ(${-radius}px)`;
    return { top, transform };
  });

  const highlightStyle = computed(() => {
    const top = `calc(50% - ${itemSize / 2}px)`;
    const height = `${itemSize}px`;
    return { top, height };
  });

  const getOptionStyle = (option) => {
    const top = `${-itemSize / 2}px`;
    const height = `${itemSize}px`;
    const transform = `rotateX(${rotation.value + option.angle}deg) translateZ(${radius}px)`;
    const visibility = option.hidden ? 'hidden' : 'visible';
    return { top, height, transform, visibility };
  };

  function createOptions(index) {
    const length = floor(90 / itemAngle) * 2 + 1;
    const m = floor(length / 2);

    return Array.from({ length }, (v, i) => {
      const j = i + index - m;
      const k = normalizeArrayIndex(items, j);
      const angle = (m - i) * itemAngle;
      const hidden = !infinite && j !== k;
      return { ...items[k], angle, hidden };
    });
  }

  function updateOptions(value, initialRotation = 0) {
    value ??= items[0].value;
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

  const lastAnimationFrameId = ref(null);
  const requestingAnimationFrame = computed(() => lastAnimationFrameId.value !== null);

  function rotate(rotationOffset) {
    if (requestingAnimationFrame.value) return;

    rotation.value += rotationOffset;

    const direction = rotationOffset < 0 ? DIRECTION.UP : DIRECTION.DOWN;
    const indexOffset = round(abs(rotation.value) / itemAngle) * direction;
    const index = selectedIndex.value + indexOffset;
    const normalizedIndex = infinite ? normalizeArrayIndex(items, index) : min(max(index, 0), items.length - 1);
    const { value } = items[normalizedIndex];

    if (value !== selectedValue.value) {
      const overflowedRotation = rotation.value % itemAngle;
      updateOptions(value, -overflowedRotation);
    }
  }

  function cancelAnimate() {
    cancelAnimationFrame(lastAnimationFrameId.value);
    lastAnimationFrameId.value = null;
  }

  function animate(rotationOffset) {
    cancelAnimate();

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

  function rotationFix(direction) {
    const rotationOffset = (itemAngle * direction - rotation.value) % itemAngle;
    rotate(rotationOffset);
  }

  async function scrollTo(value) {
    const index = findIndex(items, { value });

    if (index === -1) return;

    const distance = abs(selectedIndex.value - index);
    const indexOffset = infinite ? min(distance, normalizeArrayIndex(items, -distance)) : distance;

    const isUpside = infinite
      ? normalizeArrayIndex(items, selectedIndex.value - indexOffset) === index
      : index < selectedIndex.value;

    const frames = 12;
    const direction = isUpside ? DIRECTION.UP : DIRECTION.DOWN;
    const rotationOffset = ((indexOffset * itemAngle) / frames) * direction;

    rotationFix(direction);

    if (selectedIndex.value === index) return;

    try {
      let loopCount = 0;
      while (loopCount < frames) {
        loopCount += 1;
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
    const index = selectedIndex.value + indexOffset;
    const normalizedIndex = infinite ? normalizeArrayIndex(items, index) : min(max(index, 0), items.length - 1);
    const { value } = items[normalizedIndex];

    await scrollTo(value);
  }

  async function previous() {
    await scrollBy(-1);
  }

  async function next() {
    await scrollBy(1);
  }

  watch(() => props.modelValue, (val) => {
    if (props.animateOnValueUpdate) {
      scrollTo(val);
    } else {
      updateOptions(val);
    }
  });

  updateOptions(props.modelValue);

  function onWheel(evt) {
    stopAndPrevent(evt);

    const direction = evt.deltaY < 0 ? DIRECTION.UP : DIRECTION.DOWN;
    const rotationOffset = itemAngle * direction;

    cancelAnimate();
    rotate(rotationOffset);
    updateValue();
  }

  function onClick(option) {
    scrollTo(option.value);
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
    cancelAnimate,
    animate,
    scrollTo,
    scrollBy,
    previous,
    next,

    onWheel,
    onClick,
  };
};
