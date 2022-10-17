import { getNormalizedVNodes } from '../../../utils/private/vm';

export const usePanelProps = {
  modelValue: {
    type: [Number, String],
    default: undefined,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  animated: {
    type: Boolean,
    default: false,
  },
  infinite: {
    type: Boolean,
    default: false,
  },
  swipeable: {
    type: Boolean,
    default: false,
  },
};

export const usePanelChildProps = {
  name: {
    type: [Number, String],
    default: undefined,
  },
  disable: {
    type: Boolean,
    default: false,
  },
};

export const usePanelEmits = ['update:modelValue'];

function getNormalizedPanels(slots) {
  const vnodes = slots.default();
  const normalizedVNodes = getNormalizedVNodes(vnodes);

  const isValidPanel = (v) => v.type.name === 'KwTabPanel' && v.props?.name !== undefined;
  const panels = normalizedVNodes.filter(isValidPanel);

  return panels;
}

export default () => {
  const { props, emit } = getCurrentInstance();
  const slots = useSlots();

  const panels = computed(() => getNormalizedPanels(slots));
  const activePanel = computed(() => panels.value.find((v) => v.props.name === props.modelValue));

  const isMounted = ref(false);
  const isActivePanel = (panel) => !isMounted.value || panel === activePanel.value;

  onMounted(() => {
    isMounted.value = true;
  });

  const getPanelIndex = (name) => panels.value.findIndex((v) => v.props.name === name);
  const getActivePanelIndex = () => panels.value.findIndex((v) => v === activePanel.value);

  const validDirections = computed(() => (props.vertical ? ['up', 'down'] : ['left', 'right']));
  const panelTransition = ref({});

  watch(() => props.modelValue, (val, oldVal) => {
    const direction = validDirections.value[getPanelIndex(val) < getPanelIndex(oldVal) ? 1 : 0];

    panelTransition.value = {
      name: `q-transition--slide-${direction}`,
      duration: 300,
      css: !!props.animated,
    };
  });

  function goToByIndex(index) {
    const panel = panels.value[index];

    if (panel !== undefined) {
      emit('update:modelValue', panel.props.name);
    }
  }

  function goToByOffset(offset) {
    const index = getActivePanelIndex();

    if (index < 0) {
      goToByIndex(0);
      return;
    }

    const direction = offset > 0 ? 1 : -1;
    const panelsLength = panels.value.length;

    let loopCount = 0;
    let offsetCount = Math.abs(offset);
    let i = index;

    while (loopCount < panelsLength && offsetCount > 0) {
      loopCount += 1;
      i += direction;

      if (i === -1 || i === panelsLength) {
        if (props.infinite) {
          i = direction > 0 ? 0 : panelsLength - 1;
        } else {
          break;
        }
      }

      const panel = panels.value[index];
      if (panel !== undefined
        && panel.props.disable !== ''
        && panel.props.disable !== true) {
        offsetCount -= 1;
      }
    }

    if (offsetCount === 0) {
      goToByIndex(i);
    }
  }

  function previous() {
    goToByOffset(-1);
  }

  function next() {
    goToByOffset(1);
  }

  function goTo(name) {
    const index = getPanelIndex(name);
    goToByIndex(index);
  }

  function onSwipe(evt) {
    if (props.swipeable) {
      const isValidDirection = validDirections.value.includes(evt.direction);

      if (isValidDirection) {
        goToByOffset(evt.direction === validDirections.value[0] ? 1 : -1);
      }
    }
  }

  return {
    panels,
    panelTransition,
    isActivePanel,
    previous,
    next,
    goTo,
    onSwipe,
  };
};
