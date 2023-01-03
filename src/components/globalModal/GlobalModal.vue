<template>
  <q-dialog
    v-for="modal of modals"
    :key="modal.uid"
    class="global-modal"
    v-bind="modal.dialogProps"
    :model-value="true"
    persistent
    no-shake
    no-refocus
  >
    <kw-popup-container
      :draggable="modal.popupCtx?.draggable.value"
      @resolve="onResolve(modal, $event)"
      @close="onClose(modal, $event)"
    >
      <kw-observer :ref="(vm) => modal.observer = vm">
        <component
          :is="modal.component"
          v-bind="modal.componentProps"
        />
      </kw-observer>
    </kw-popup-container>
  </q-dialog>
</template>

<script>
import { GlobalModalVmKey } from '../../consts/private/symbols';
import libConfig from '../../consts/private/libConfig';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVm';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';

const {
  DIALOG_TRANSITION_DURATION,
} = libConfig;

export default {
  name: 'GlobalModal',

  setup() {
    const vm = getCurrentInstance();
    const modals = shallowRef([]);

    registerGlobalVm(GlobalModalVmKey, vm, () => {
      modals.value = getGlobalData(GlobalModalVmKey);
    });

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalModalVmKey);
    });

    function onResolve(modal, popupCtx) {
      modal.componentResolved = true;
      modal.popupCtx = popupCtx;
    }

    async function isClosable(modal, result) {
      const { observer, popupCtx } = modal;
      const shouldCheckModified = result === false;

      if (shouldCheckModified) {
        if (!await observer.confirmIfIsModified()) { return false; }
      }

      return (await popupCtx.onBeforeClose.value?.(result)) !== false;
    }

    async function onClose(modal, { result, payload }) {
      if (!modal.componentResolved || await isClosable(modal, result)) {
        modal.resolve({ result, payload });
        removeGlobalData(modal);
      }
    }

    return {
      DIALOG_TRANSITION_DURATION,
      modals,
      onResolve,
      onClose,
    };
  },
};
</script>
