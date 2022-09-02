<template>
  <q-dialog
    class="global-notify"
    :model-value="true"
    :transition-duration="0"
    seamless
    position="right"
  >
    <transition-group
      tag="div"
      name="fade"
      class="global-notify__inner"
    >
      <div
        v-for="notification of notifications"
        :key="notification.uid"
        class="global-notify__item"
      >
        <p class="global-notify__item-message">
          {{ notification.message }}
        </p>
        <q-icon
          class="global-notify__item-close"
          name="close_24"
          @click="onClickClose(notification)"
        />
      </div>
    </transition-group>
  </q-dialog>
</template>

<script>
import { GlobalNotifyVmKey } from '../../consts/private/symbols';
import libConfig from '../../consts/private/libConfig';
import { registerGlobalVm, unregisterGlobalVm, UPDATE_STATE } from '../../utils/private/globalVm';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';

export default {
  name: 'GlobalNotify',

  setup() {
    const vm = getCurrentInstance();
    const notifications = shallowRef([]);

    function setTimeoutToClose(notification) {
      notification.timeout = setTimeout(() => {
        removeGlobalData(notification);
      }, libConfig.NOTIFY_TIMEOUT);
    }

    registerGlobalVm(GlobalNotifyVmKey, vm, (updateState, notification) => {
      notifications.value = getGlobalData(GlobalNotifyVmKey);
      if (updateState === UPDATE_STATE.ADDED) setTimeoutToClose(notification);
    });

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalNotifyVmKey);
    });

    function onClickClose(notification) {
      clearTimeout(notification.timeout);
      removeGlobalData(notification);
    }

    return {
      notifications,
      onClickClose,
    };
  },
};
</script>
