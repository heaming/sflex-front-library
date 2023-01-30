import { debounce } from 'lodash-es';
import { platform } from '../../../plugins/platform';

const DEFAULT_DEBOUNCE = 100;

export const useInfiniteScrollProps = {
  initialLoadIndex: {
    type: Number,
    default: 1,
  },
  loadDebounce: {
    type: [String, Number],
    default: DEFAULT_DEBOUNCE,
  },
  loadOnMounted: {
    type: Boolean,
    default: false,
  },
  onLoad: {
    type: Function,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const stopLoading = ref(false);
  const infiniteIsEnabled = computed(() => platform.is.mobile && typeof props.onLoad === 'function' && stopLoading.value === false);
  const isFetching = ref(false);

  const scrollTarget = ref();
  const loadIndex = ref(props.initialLoadIndex);

  async function fetch() {
    if (infiniteIsEnabled.value === false || isFetching.value === true) {
      return;
    }

    isFetching.value = true;
    loadIndex.value += 1;

    await props.onLoad(loadIndex.value);
    await nextTick();

    isFetching.value = false;
  }

  const deobuncedFetch = computed(() => {
    if (infiniteIsEnabled.value === false) {
      return;
    }

    const wait = parseInt(props.loadDebounce, 10);
    return debounce(fetch, Number.isNaN(wait) ? DEFAULT_DEBOUNCE : wait);
  });

  function onScroll(evt) {
    if (infiniteIsEnabled.value === false || isFetching.value === true) {
      return;
    }

    const el = scrollTarget.value;
    const isOnBottom = evt.direction === 'down' && evt.position.top === el.scrollHeight - el.clientHeight;

    if (isOnBottom) {
      deobuncedFetch.value();
    }
  }

  async function mountedFunc() {
    if (infiniteIsEnabled.value === true && props.loadOnMounted === true) {
      await nextTick();
      let isContinue = true;
      loadIndex.value -= 1;

      while (isContinue) {
        const el = scrollTarget.value;
        const { clientHeight, scrollHeight } = el;

        if (clientHeight !== scrollHeight) {
          isContinue = false;
        } else {
          // eslint-disable-next-line no-await-in-loop
          await fetch();
        }
      }
    }
  }

  onMounted(async () => {
    await mountedFunc();
  });

  async function stopLoad() {
    stopLoading.value = true;
  }

  async function resetLoad() {
    stopLoading.value = false;
    loadIndex.value = props.initialLoadIndex;

    await mountedFunc();
  }

  return {
    scrollTarget,
    infiniteIsEnabled,
    onScroll,
    stopLoad,
    resetLoad,
  };
};
