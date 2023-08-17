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
    >
      <q-badge
        v-if="footerMenu.icon === 'mob_basket'"
        rounded
        floating
        color="error"
        :label="0"
        class="alert-badge"
        style="top: 5px; right: 27px;"
      />
    </kw-btn>
  </q-footer>
</template>

<script>
import { modal } from '../../plugins/modal';
import { getPreference } from '../../utils/mobile';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { GlobalModalVmKey } from '../../consts/private/symbols';
import consts from '../../consts';

export default {
  name: 'MobileFooter',

  setup() {
    const { getters } = useStore();
    const { userId } = getters['meta/getUserInfo'];
    const { push } = useRouter();
    const { t } = useI18n();
    const curr = ref(-1);
    const footerMenus = ref([
      { icon: 'mob_home', label: t('MSG_TXT_HOME') },
      { icon: 'mob_task', label: t('MSG_TXT_WK_LIST') },
      { icon: 'mob_recently', label: t('MSG_TXT_RECENT_WORK') },
      { icon: 'mob_basket', label: t('MSG_TXT_STLM_BASKET'), component: async () => await import('../../pages/mobile/MobileTotalMenuTestP.vue') },
      { icon: 'mob_menu', label: t('MSG_BTN_ALL_VIEW'), component: async () => await import('../../pages/mobile/MobileTotalMenuP.vue') },
    ]);

    async function openMenu(menu, idx) {
      const globalModals = getGlobalData(GlobalModalVmKey);
      if (globalModals.length > 0) {
        const mainMenuModals = globalModals.filter((globalModal) => globalModal.dialogProps.class === 'main-menu-modal');
        mainMenuModals.forEach((mainMenuModal) => removeGlobalData(mainMenuModal.uid));
        if (curr.value === idx) {
          curr.value = -1;
          return;
        }
      }

      curr.value = idx;
      if (menu.component) {
        await modal({
          component: menu.component,
          dialogProps: { maximized: true, class: 'main-menu-modal' },
        });

        curr.value = -1;
        return;
      }

      if (idx === 2 && userId) { // 최근 메뉴 라우팅
        const name = (await getPreference(`${consts.MENU_RECENT_WORK_PREFIX}${userId.toUpperCase()}`)).value;
        push({ name });
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
