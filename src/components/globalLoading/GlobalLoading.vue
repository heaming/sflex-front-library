<template>
  <div
    v-if="isActive"
    class="global-loading q-loading fullscreen flex flex-center z-max"
  >
    <div class="q-loading__backdrop" />
    <div class="q-loading__box column items-center">
      <q-circular-progress
        v-if="isProgress"
        show-value
        size="8em"
        :value="progressValue"
        :animation-speed="$g.libConfig.LOADING_PROGRESS_ANIMATION_SPEED"
      />
      <q-spinner
        v-else
        class="q-loading__spinner"
        size="5em"
      />
    </div>
  </div>
</template>

<script>
import useLibConfig from '../../composables/private/useLibConfig';
import { GlobalLoadingVmKey } from '../../consts/private/symbols';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVms';

export default {
  name: 'GlobalLoading',

  setup() {
    const vm = getCurrentInstance();
    const { LOADING_PROGRESS_MAX } = useLibConfig();

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

    return {
      progressValue,
      isProgress,
      isActive,
      increaseLoadCount,
      decreaseLoadCount,
      setProgressValue,
    };
  },
};

</script>
