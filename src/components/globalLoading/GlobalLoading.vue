<template>
  <q-dialog
    ref="dialogRef"
    :model-value="isActive"
    class="global-loading"
    :transition-duration="0"
    persistent
    no-shake
  >
    <div>
      <q-circular-progress
        v-if="isProgress"
        show-value
        :value="progressValue"
        :animation-speed="LOADING_PROGRESS_ANIMATION_SPEED"
      />
      <q-spinner
        v-else
      />
    </div>
  </q-dialog>
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

    const dialogRef = ref();

    function onFocusChange(evt) {
      stopAndPrevent(evt);
      dialogRef.value.focus();
    }

    watch(isActive, (val) => {
      if (val === true) {
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
      dialogRef,
    };
  },
};

</script>
