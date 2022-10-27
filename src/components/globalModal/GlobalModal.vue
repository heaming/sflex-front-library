<template>
  <q-dialog
    v-for="modal of modals"
    :key="modal.uid"
    class="global-modal"
    :model-value="true"
    persistent
    no-shake
    no-refocus
  >
    <kw-popup-container
      :ref="(vm) => modal.containeVm = vm"
      :draggable="modal.draggable"
      @resolve="resolveComponent(modal)"
      @close="close(modal, $event)"
    >
      <kw-observer :ref="(vm) => modal.observerVm = vm">
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
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVm';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';

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

    function resolveComponent(modal) {
      modal.componentResolved = true;
    }

    async function isClosable(modal, result) {
      const observer = modal.observerVm;
      const popupCtx = modal.containeVm.ctx;

      const shouldCheckModified = result === false;

      if (shouldCheckModified) {
        if (!await observer.confirmIfIsModified()) { return false; }
      }

      return (await popupCtx.onBeforeClose.value?.(result)) !== false;
    }

    async function close(modal, { result, payload }) {
      if (!modal.componentResolved || await isClosable(modal, result)) {
        modal.resolve({ result, payload });
        removeGlobalData(modal);
      }
    }

    return {
      modals,
      resolveComponent,
      close,
    };
  },
};
</script>
