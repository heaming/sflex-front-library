<template>
  <q-dialog
    ref="bottomSheetRef"
    :model-value="isActive"
    class="global-bottom-sheet"
    :transition-duration="DIALOG_TRANSITION_DURATION"
    no-shake
    transition-show="jump-up"
    transition-hide="jump-down"
    no-refocus
    @keydown.esc="onClick(false)"
    @before-hide="onClick(false)"
  >
    <q-card
      class="global-bottom-sheet__inner"
      square
    >
      <q-card-section class="global-bottom-sheet__content">
        <div
          v-if="activeDialog.icon"
          class="bottom-sheet-icon"
        >
          <kw-icon
            :name="activeDialog.icon"
            size="24px"
          />
        </div>
        <kw-icon
          class="global-bottom-sheet__close-btn"
          size="24px"
          name="close_24"
          @mousedown.stop
          @touchstart.stop
          @click="onClick(false)"
        />
        <!-- 데이터 영역 -->
        <div
          v-for="(item, index) in items"
          :key="index"
        >
          <div @click="onClick(true)">
            {{ item.label }}
          </div>
        </div>
        <!-- 데이터 영역 -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { GlobalBottomSheetVmKey } from '../../consts/private/symbols';
import libConfig from '../../consts/private/libConfig';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVm';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { timeout } from '../../utils/private/tick';

const {
  DIALOG_TRANSITION_DURATION,
} = libConfig;

export default {
  name: 'GlobalBottomSheet',

  setup() {
    const vm = getCurrentInstance();

    const dialogs = shallowRef([]);
    const activeDialog = computed(() => dialogs.value[0]);
    const items = computed(() => dialogs.value[0]?.items);
    const isActive = computed(() => dialogs.value.length > 0);
    watch(isActive, async (val) => {
      if (val) {
        await timeout(DIALOG_TRANSITION_DURATION);
      }
    });

    registerGlobalVm(GlobalBottomSheetVmKey, vm, () => {
      dialogs.value = getGlobalData(GlobalBottomSheetVmKey);
    });

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalBottomSheetVmKey);
    });

    async function onClick(result) {
      if (isActive.value) {
        const { resolve } = activeDialog.value;

        resolve({ result });
        removeGlobalData(activeDialog.value);
      }
    }

    return {
      DIALOG_TRANSITION_DURATION,
      activeDialog,
      isActive,
      onClick,
      items,
    };
  },
};
</script>
