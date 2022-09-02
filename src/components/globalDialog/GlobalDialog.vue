<template>
  <q-dialog
    ref="dialogRef"
    class="global-dialog"
    :model-value="isActive"
    :transition-duration="DIALOG_TRANSITION_DURATION"
    persistent
    no-shake
    :no-refocus="dialog?.refocus === false"
    @keydown.esc="onClick(false)"
  >
    <q-card
      class="global-dialog__inner"
      square
    >
      <q-card-section class="global-dialog__content">
        <p>
          {{ dialog.message }}
        </p>
        <p v-if="dialog.subMessage">
          {{ dialog.subMessage }}
        </p>
      </q-card-section>
      <q-card-section class="global-dialog__action">
        <kw-btn
          v-if="dialog.isConfirm"
          class="kw-btn--h36 kw-btn--negative"
          :label="$t('MSG_BTN_NO', null, '취소')"
          @click="onClick(false)"
        />
        <kw-btn
          ref="okRef"
          class="kw-btn--h36"
          :label="$t('MSG_BTN_CONFIRM', null, '확인')"
          @click="onClick(true)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { GlobalDialogVmKey } from '../../consts/private/symbols';
import libConfig from '../../consts/private/libConfig';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVm';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import processWait from '../../utils/private/processWait';

const { DIALOG_TRANSITION_DURATION } = libConfig;

export default {
  name: 'GlobalDialog',

  setup() {
    const vm = getCurrentInstance();

    const dialogRef = ref();
    const dialogs = shallowRef([]);

    const isPending = ref(false);
    const isActive = computed(() => !isPending.value && dialogs.value[0] !== undefined);

    const dialog = computed(() => dialogs.value[0]);
    const okRef = ref();

    watch(isActive, async (val) => {
      if (val) {
        await nextTick();
        okRef.value.$el.focus();
      }
    });

    registerGlobalVm(GlobalDialogVmKey, vm, () => {
      dialogs.value = getGlobalData(GlobalDialogVmKey);
    });

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalDialogVmKey);
    });

    async function pending() {
      isPending.value = true;
      await processWait(DIALOG_TRANSITION_DURATION);
      isPending.value = false;
    }

    async function onClick(result) {
      if (isActive.value) {
        await processWait();

        dialog.value.resolve(result);
        removeGlobalData(dialog.value);

        await pending();
      }
    }

    return {
      DIALOG_TRANSITION_DURATION,
      dialogRef,
      isActive,
      dialog,
      okRef,
      onClick,
    };
  },
};
</script>
