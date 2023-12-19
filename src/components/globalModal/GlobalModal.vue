<template>
  <q-dialog
    v-for="modal of modals"
    :key="modal.uid"
    class="global-modal"
    :class="isModalPopup ? 'modal-popup' : ''"
    v-bind="getDialogProps(modal.dialogProps)"
  >
    <kw-popup-container
      @resolve="onResolve(modal, $event)"
      @close="onClose(modal, $event)"
    >
      <kw-observer
        :ref="(vm) => modal.observerVm = vm"
      >
        <component
          :is="modal.component"
          v-if="getDraggable(modal)"
          v-drag
          v-bind="modal.componentProps"
        />
        <component
          :is="modal.component"
          v-else
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
import { platform } from '../../plugins/platform';

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

    // hash 에서 파라미터가 있는지 파악해보기.
    let urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
    if (urlSearchParams.size === 0) {
      const { hash } = window.location;
      if (hash.length > 0) {
        urlSearchParams = new URLSearchParams(hash.substring(hash.indexOf('?') + 1, 1000));
      }
    }
    const isModalPopup = urlSearchParams?.get('modal-popup') === 'true';

    const getDialogProps = (dialogProps) => ({
      class: dialogProps.class,
      maximized: platform.is.mobile || dialogProps.maximized === true,
      transitionDuration: dialogProps.maximized === true ? 0 : undefined,
      modelValue: true,
      persistent: true,
      noShake: true,
      noRefocus: true,
    });

    function getDraggable(modal) {
      return modal.dialogProps?.draggable === true;
    }

    function onResolve(modal, popupCtx) {
      modal.componentResolved = true;
      modal.popupCtx = popupCtx;
    }

    async function isClosable(modal, result) {
      const { observerVm, popupCtx } = modal;
      const { onBeforeClose } = popupCtx;

      if (onBeforeClose?.value) {
        return (await onBeforeClose.value?.(result)) !== false;
      }

      return result !== false || await observerVm?.confirmIfIsModified();
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
      getDialogProps,
      onResolve,
      onClose,
      getDraggable,
      isModalPopup,
    };
  },
};
</script>
