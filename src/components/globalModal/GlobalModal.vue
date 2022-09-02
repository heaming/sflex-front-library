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
      ref="containerRefs"
      :draggable="modal.draggable"
      @resolve="resolveComponent(modal)"
      @close="close(modal, $event)"
    >
      <component
        :is="modal.component"
        v-bind="modal.componentProps"
      />
    </kw-popup-container>
  </q-dialog>
</template>

<script>
import { GlobalModalVmKey } from '../../consts/private/symbols';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVms';
import { getGlobalDatas, removeGlobalDatas } from '../../utils/private/globalDatas';

export default {
  name: 'GlobalModal',

  setup() {
    const vm = getCurrentInstance();

    const modals = shallowRef([]);
    const containerRefs = ref();

    registerGlobalVm(GlobalModalVmKey, vm, () => {
      modals.value = getGlobalDatas(GlobalModalVmKey);
    });

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalModalVmKey);
    });

    function resolveComponent(modal) {
      modal.componentResolved = true;
    }

    const getContainerCtx = (modal) => containerRefs.value[modals.value.findIndex((v) => v === modal)]?.ctx;

    async function isClosable(modal, result) {
      const shouldCheckModified = !result && !modal.ignoreOnModified;

      if (shouldCheckModified) {
        const ctx = getContainerCtx(modal);
        if (!await ctx?.observer.confirmIfIsModified()) { return false; }
      }

      return await modal.beforeClose(result) !== false;
    }

    async function close(modal, { result, payload }) {
      if (!modal.componentResolved || await isClosable(modal, result)) {
        modal.resolve({ result, payload });
        removeGlobalDatas(modal);
      }
    }

    return {
      modals,
      containerRefs,
      resolveComponent,
      close,
    };
  },
};
</script>
