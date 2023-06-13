<template>
  <q-dialog
    :class="notifyClass"
    :model-value="isActive"
    :transition-duration="DIALOG_TRANSITION_DURATION"
    transition-show="fade"
    transition-hide="fade"
    seamless
    :style="{'top': popupOffsetTop, 'padding-left': popupPaddingLeft, 'padding-right': popupPaddingRight }"
    no-focus
    no-refocus
  >
    <div class="global-notify__inner">
      <span class="global-notify__message">
        <kw-icon
          v-if="activeNotification.icon"
          :name="activeNotification.icon"
          size="16px"
          class="mr4"
        />
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
import { platform } from '../../plugins/platform';

const {
  DIALOG_TRANSITION_DURATION,
} = libConfig;

const DEFAULT_PADDING_LEFT_WITH_DRAWER = 343;
const DEFAULT_PADDING_LEFT_NO_DRAWER = 80;
const DEFAULT_PADDING_RIGHT = 40;
const DEFAULT_OFFSET_TOP = 0;
const DEFAULT_OFFSET_TOP_POPUP = -110;
const DEFAULT_PADDING_LEFT_POPUP = 40;

const DEFAULT_PADDING_MOBILE = 0;
const DEFAULT_OFFSET_TOP_MOBILE = -125;

const DEFAULT_PADDING_LEFT_TABLET = 30;
const DEFAULT_PADDING_RIGHT_TABLET = 92;
const DEFAULT_OFFSET_TOP_TABLET = -110;

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
    const popupOffsetTop = ref(`${DEFAULT_OFFSET_TOP}`);
    const popupPaddingLeft = ref(`${DEFAULT_PADDING_LEFT_WITH_DRAWER}px`);
    const popupPaddingRight = ref(`${DEFAULT_PADDING_RIGHT}px`);
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

    registerGlobalVm(GlobalNotifyVmKey, vm, async (notification) => {
      if (notification) {
        // let offsetTop;
        // let offsetLeft;
        // const isPopup = window.location.pathname.indexOf('/popup') >= 0;
        // if (isPopup) {
        //   offsetLeft = DEFAULT_PADDING_LEFT_POPUP;
        //   offsetTop = DEFAULT_OFFSET_TOP_POPUP;
        // } else {
        //   offsetLeft = isLeftExpanded.value ? DEFAULT_PADDING_LEFT_WITH_DRAWER : DEFAULT_PADDING_LEFT_NO_DRAWER;
        //   offsetTop = DEFAULT_OFFSET_TOP;
        // }
        // const offsetRight = DEFAULT_PADDING_RIGHT;

        // popupOffsetTop.value = `${offsetTop}px`;
        // popupPaddingLeft.value = `${offsetLeft}px`;
        // popupPaddingRight.value = `${offsetRight}px`;

        await timeout();
        const popups = window.$('div.kw-popup');
        let offsetTop;
        let offsetLeft;
        let offsetRight;
        const isPopup = window.location.pathname.indexOf('/popup') >= 0;

        if (popups.length > 0) {
          const noHeaderPopup = !window.$('h1.kw-popup__header-title').eq(popups.length - 1).offset();
          if (noHeaderPopup) {
            if (platform.is.tablet) {
              offsetTop = window.$('div.kw-popup > div.kw-popup__content').eq(popups.length - 1).offset().top - 122;
              offsetLeft = window.$('div.kw-popup').eq(popups.length - 1).offset().left - 32;
              offsetRight = window.$('div.kw-popup').eq(popups.length - 1).offset().left + 30;
            } else if (platform.is.mobile) {
              offsetTop = window.$('div.kw-popup > div.kw-popup__content').eq(popups.length - 1).offset().top - 126;
              offsetLeft = DEFAULT_PADDING_MOBILE;
              offsetRight = DEFAULT_PADDING_MOBILE;
            } else {
              offsetTop = window.$('h1.kw-popup__header-title').eq(popups.length - 1).offset().top - 140;
              offsetLeft = window.$('div.kw-popup').eq(popups.length - 1).offset().left + 30;
              offsetRight = window.$('div.kw-popup').eq(popups.length - 1).offset().left + 30;
            }
          } else {
            offsetTop = window.$('h1.kw-popup__header-title').eq(popups.length - 1).offset().top - 140;
            offsetLeft = window.$('div.kw-popup').eq(popups.length - 1).offset().left + 30;
            offsetRight = window.$('div.kw-popup').eq(popups.length - 1).offset().left + 30;
          }
        } else if (platform.is.mobile) {
          offsetLeft = DEFAULT_PADDING_MOBILE;
          offsetTop = DEFAULT_OFFSET_TOP_MOBILE;
          offsetRight = DEFAULT_PADDING_MOBILE;
        } else if (platform.is.tablet) {
          offsetLeft = DEFAULT_PADDING_LEFT_TABLET;
          offsetTop = DEFAULT_OFFSET_TOP_TABLET;
          offsetRight = DEFAULT_PADDING_RIGHT_TABLET;
        } else if (isPopup) {
          offsetLeft = DEFAULT_PADDING_LEFT_POPUP;
          offsetTop = DEFAULT_OFFSET_TOP_POPUP;
          offsetRight = DEFAULT_PADDING_RIGHT;
        } else {
          offsetLeft = isLeftExpanded.value ? DEFAULT_PADDING_LEFT_WITH_DRAWER : DEFAULT_PADDING_LEFT_NO_DRAWER;
          offsetTop = DEFAULT_OFFSET_TOP;
          offsetRight = DEFAULT_PADDING_RIGHT;
        }
        popupOffsetTop.value = `${offsetTop}px`;
        popupPaddingLeft.value = `${offsetLeft}px`;
        popupPaddingRight.value = `${offsetRight}px`;

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
      popupOffsetTop,
      popupPaddingLeft,
      popupPaddingRight,
    };
  },
};
</script>
