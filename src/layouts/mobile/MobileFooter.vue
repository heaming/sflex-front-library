<template>
  <q-footer
    class="mobile-footer flex items-center"
    bordered
  >
    <!-- 버튼 활성화 될 경우 .curr -->
    <kw-btn
      v-for="(footerMenu, footerIdx) in footerMenus"
      :key="footerIdx"
      :icon="footerMenu.icon"
      :label="footerMenu.label"
      style="font-size: 24px;"
      borderless
      class="menu_icon"
      :class="{ 'curr': curr === footerIdx }"
      @click="openMenu(footerMenu, footerIdx)"
    />
  </q-footer>
</template>

<script>
import { modal } from '../../plugins/modal';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { GlobalModalVmKey } from '../../consts/private/symbols';

export default {
  name: 'MobileFooter',

  setup() {
    const { t } = useI18n();
    const curr = ref(0);
    const footerMenus = ref([
      { icon: 'mob_home', label: t('MSG_TXT_HOME') },
      { icon: 'mob_task', label: t('MSG_TXT_WK_LIST') },
      { icon: 'mob_recently', label: t('MSG_TXT_RECENT_WORK') },
      { icon: 'mob_basket', label: t('MSG_TXT_STLM_BASKET'), component: async () => await import('../../pages/mobile/MobileTotalMenuTestP.vue') },
      { icon: 'mob_menu', label: t('MSG_BTN_ALL_VIEW'), component: async () => await import('../../pages/mobile/MobileTotalMenuP.vue') },
    ]);

    async function openMenu(menu, idx) {
      curr.value = idx;

      const globalModals = getGlobalData(GlobalModalVmKey);
      if (globalModals.length > 0) {
        const mainMenuModals = globalModals.filter((globalModal) => globalModal.dialogProps.class === 'main-menu-modal');
        mainMenuModals.forEach((mainMenuModal) => removeGlobalData(mainMenuModal.uid));
      }

      if (menu.component) {
        await modal({
          component: menu.component,
          dialogProps: { maximized: true, class: 'main-menu-modal' },
        });
      }
    }

    return {
      openMenu,
      footerMenus,
      curr,
    };
  },
};

</script>
