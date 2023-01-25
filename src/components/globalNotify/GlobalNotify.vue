<template>
  <q-dialog
    :class="notifyClass"
    :model-value="isActive"
    :transition-duration="DIALOG_TRANSITION_DURATION"
    transition-show="fade"
    transition-hide="fade"
    seamless
    no-focus
    no-refocus
  >
    <div class="global-notify__inner">
      <span class="global-notify__message">
        {{ activeNotification.message }}
      </span>
    </div>
  </q-dialog>
</template>

<script>
import { GlobalNotifyVmKey } from '../../consts/private/symbols';
import libConfig from '../../consts/private/libConfig';
import { registerGlobalVm, unregisterGlobalVm } from '../../utils/private/globalVm';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { timeout } from '../../utils/private/tick';

const {
  DIALOG_TRANSITION_DURATION,
} = libConfig;

export default {
  name: 'GlobalNotify',

  setup() {
    const vm = getCurrentInstance();

    const { getters } = useStore();
    const isLeftExpanded = computed(() => getters['app/getLeftDrawerExpanded']);
    const notifyClass = computed(() => ({
      'global-notify': true,
      'global-notify--minimized': isLeftExpanded.value,
    }));

    const notifications = shallowRef([]);
    const activeNotification = computed(() => notifications.value[0]);

    const isPending = ref(false);
    const isActive = computed(() => !isPending.value && notifications.value.length > 0);

    async function pending() {
      isPending.value = true;
      await timeout();
      isPending.value = false;
    }

    async function close(notification) {
      clearTimeout(notification.timeout);
      removeGlobalData(notification);
      await pending();
    }

    registerGlobalVm(GlobalNotifyVmKey, vm, (notification) => {
      if (notification) {
        notification.timeout = setTimeout(() => {
          close(notification);
        }, libConfig.NOTIFY_TIMEOUT);

        if (activeNotification.value) {
          close(activeNotification.value);
        }
      }

      notifications.value = getGlobalData(GlobalNotifyVmKey);
    });

    onBeforeUnmount(() => {
      unregisterGlobalVm(GlobalNotifyVmKey);
    });

    return {
      DIALOG_TRANSITION_DURATION,
      notifyClass,
      notifications,
      activeNotification,
      isActive,
    };
  },
};
</script>
