<template>
  <div
    v-if="isActive"
    ref="containerRef"
    class="global-loading"
    tabindex="-1"
  >
    <!--    <q-circular-progress-->
    <!--      v-if="isProgress"-->
    <!--      show-value-->
    <!--      :value="progressValue"-->
    <!--      :animation-speed="LOADING_PROGRESS_ANIMATION_SPEED"-->
    <!--    />-->
    <div
      class="loading-fading-circle"
    >
      <div class="loading-circle1 loading-circle" />
      <div class="loading-circle2 loading-circle" />
      <div class="loading-circle3 loading-circle" />
      <div class="loading-circle4 loading-circle" />
      <div class="loading-circle5 loading-circle" />
      <div class="loading-circle6 loading-circle" />
      <div class="loading-circle7 loading-circle" />
      <div class="loading-circle8 loading-circle" />
      <div class="loading-circle9 loading-circle" />
      <div class="loading-circle10 loading-circle" />
      <div class="loading-circle11 loading-circle" />
      <div class="loading-circle12 loading-circle" />
    </div>
  </div>
</template>

<script>
import { GlobalLoadingVmKey } from '../../consts/private/symbols';
import libConfig from '../../consts/private/libConfig';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVm';
import { stopAndPrevent } from '../../utils/private/event';
import { addFocusout, removeFocusout } from '../../utils/private/focusout';

const {
  LOADING_PROGRESS_MAX,
  LOADING_PROGRESS_ANIMATION_SPEED,
} = libConfig;

export default {
  name: 'GlobalLoading',

  setup() {
    const vm = getCurrentInstance();

    const loadCount = ref(0);
    const progressValue = ref(-1);

    const isProgress = computed(() => progressValue.value > -1);
    const isActive = computed(() => isProgress.value || loadCount.value > 0);

    registerGlobalVm(GlobalLoadingVmKey, vm);

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalLoadingVmKey);
    });

    function increaseLoadCount() {
      loadCount.value += 1;
    }

    function decreaseLoadCount() {
      loadCount.value = Math.max(0, loadCount.value - 1);
    }

    function setProgressValue(value) {
      progressValue.value = Math.min(
        Math.round(value),
        LOADING_PROGRESS_MAX,
      );
    }

    const containerRef = ref();

    function onFocusChange(evt) {
      stopAndPrevent(evt);
      containerRef.value.focus();
    }

    watch(isActive, (val) => {
      if (val) {
        addFocusout(onFocusChange);
      } else {
        removeFocusout(onFocusChange);
      }
    });

    return {
      LOADING_PROGRESS_MAX,
      LOADING_PROGRESS_ANIMATION_SPEED,
      progressValue,
      isProgress,
      isActive,
      increaseLoadCount,
      decreaseLoadCount,
      setProgressValue,
      containerRef,
    };
  },
};

</script>
