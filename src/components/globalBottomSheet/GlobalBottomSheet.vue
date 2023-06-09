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
    >
      <q-card-section class="global-bottom-sheet__header">
        <!-- 제목 영역 -->
        <h1>
          제목
        </h1>
        <kw-icon
          class="global-bottom-sheet__close-btn"
          size="24px"
          name="close_24"
          @mousedown.stop
          @touchstart.stop
          @click="onClick(false)"
        />
      </q-card-section>
      <q-card-section class="global-bottom-sheet__content">
        <!-- 데이터 영역 -->
        <div
          v-for="(item, index) in items"
          :key="index"
          class="global-bottom-sheet__item global-bottom-sheet__item--selected"
        >
          <!-- to.개발 선택 된 요소일 경우 클래스 추가 global-bottom-sheet__item--selected -->
          <div @click="onClick(true)">
            {{ item.label }}
          </div>
        </div>
        <!-- 데이터 영역 -->
        <!-- 앱 버전 영역 -->
        <!--  -->
      </q-card-section>
      <q-card-section class="global-bottom-sheet__app-version">
        <div>앱 버전: 1.0.0</div>
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
