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
  const infiniteIsEnabled = computed(() => (platform.is.mobile || platform.is.tablet) && typeof props.onLoad === 'function' && stopLoading.value === false);
  const isFetching = ref(false);
  const scrollTarget = ref();
  const containerRef = ref();
  const loadIndex = ref(props.initialLoadIndex);
  const showFloatingBtn = ref(false);

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

  function onScroll(evt, newEl = null) {
    const el = newEl ? newEl.$el ?? newEl : scrollTarget.value.$el ?? scrollTarget.value;

    if (el?.scrollTop !== 0) showFloatingBtn.value = true;
    else showFloatingBtn.value = false;

    if (infiniteIsEnabled.value === false || isFetching.value === true) {
      return;
    }

    const isOnBottom = evt.direction === 'down' && Math.ceil(evt.position.top) >= el.scrollHeight - el.clientHeight;
    if (isOnBottom) {
      deobuncedFetch.value();
    }
  }

  function moveToPageTop(evt, newEl = null) {
    const el = newEl ? newEl.$el ?? newEl : scrollTarget.value.$el ?? scrollTarget.value;
    el?.scrollTo(0, 0);
  }

  async function mountedFunc() {
    await nextTick();
    let isContinue = true;
    loadIndex.value -= 1;

    while (isContinue) {
      let el;
      // FIXME 오류수정 일단 되게해놓음.
      if (platform.is.mobile && containerRef.value) {
        el = containerRef.value.$el ?? scrollTarget.value.$el ?? scrollTarget.value;
      } else el = scrollTarget.value.$el ?? scrollTarget.value;

      let clientHeight;
      let scrollHeight;
      if (el) {
        clientHeight = el.clientHeight;
        scrollHeight = el.scrollHeight;
      }

      if (clientHeight !== scrollHeight || stopLoading.value === true) {
        isContinue = false;
      } else {
        // eslint-disable-next-line no-await-in-loop
        await fetch();
      }
    }
  }

  onMounted(async () => {
    if (infiniteIsEnabled.value === true && props.loadOnMounted === true) {
      await mountedFunc();
    }
  });

  async function stopLoad() {
    stopLoading.value = true;
  }

  async function startLoad() {
    stopLoading.value = false;
    if (infiniteIsEnabled.value === true) {
      loadIndex.value = props.initialLoadIndex;

      await mountedFunc();
    }
  }

  return {
    scrollTarget,
    infiniteIsEnabled,
    onScroll,
    stopLoad,
    startLoad,
    containerRef,
    showFloatingBtn,
    moveToPageTop,
  };
};
