<template>
  <q-dialog
    ref="dialogRef"
    class="global-dialog"
    :model-value="isActive"
    :transition-duration="DIALOG_TRANSITION_DURATION"
    persistent
    no-shake
    :no-refocus="activeDialog?.refocus === false"
    @keydown.esc="onClick(false)"
  >
    <q-card
      class="global-dialog__inner"
      square
    >
      <q-card-section class="global-dialog__content">
        <div
          v-if="activeDialog.icon"
          class="dialog-icon"
        >
          <kw-icon
            :name="activeDialog.icon"
            size="24px"
          />
        </div>
        <kw-icon
          class="global-dialog__close-btn"
          size="24px"
          name="close_24"
          @mousedown.stop
          @touchstart.stop
          @click="onClick(false)"
        />
        <p>
          {{ activeDialog.message }}
        </p>
        <p
          v-if="activeDialog.subMessage"
          class="sub-message"
        >
          {{ activeDialog.subMessage }}
        </p>
      </q-card-section>
      <q-card-section class="global-dialog__action">
        <kw-btn
          v-if="activeDialog.isConfirm"
          :label="$t('MSG_BTN_CANCEL', null, '취소')"
          negative
          @click="onClick(false)"
        />
        <kw-btn
          v-for="(btn, idx) in activeDialog.customBtns"
          :key="idx"
          :label="btn.btnLabel"
          @click="onClickCustomBtn(btn)"
        />
        <kw-btn
          ref="okRef"
          :label="$t('MSG_BTN_CONFIRM', null, '확인')"
          primary
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
import { timeout } from '../../utils/private/tick';

const {
  DIALOG_TRANSITION_DURATION,
} = libConfig;

export default {
  name: 'GlobalDialog',

  setup() {
    const vm = getCurrentInstance();

    const dialogs = shallowRef([]);
    const activeDialog = computed(() => dialogs.value[0]);

    const isPending = ref(false);
    const isActive = computed(() => !isPending.value && dialogs.value.length > 0);

    const okRef = ref();

    watch(isActive, async (val) => {
      if (val) {
        await timeout(DIALOG_TRANSITION_DURATION);
        okRef.value?.$el.focus();
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
      await timeout();
      isPending.value = false;
    }

    async function onClick(result) {
      if (isActive.value) {
        const { resolve } = activeDialog.value;

        removeGlobalData(activeDialog.value);
        resolve(result);

        await pending();
      }
    }

    async function onClickCustomBtn(btn) {
      const res = await btn.btnCallback();

      await onClick(res);
    }

    return {
      DIALOG_TRANSITION_DURATION,
      activeDialog,
      isActive,
      okRef,
      onClick,
      onClickCustomBtn,
    };
  },
};
</script>
