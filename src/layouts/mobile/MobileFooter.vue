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
        v-if="footerMenu.icon === 'mob_basket' && basketSize !== 0"
        rounded
        floating
        color="error"
        :label="basketSize"
        class="alert-badge"
        style="top: 8px;right: calc(50% - 12px);"
      />
    </kw-btn>
  </q-footer>
</template>

<script>
import { isEmpty } from 'lodash-es';
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
    const router = useRouter();
    const { t } = useI18n();
    const curr = ref(-1);

    const basketSize = computed(() => getters['meta/getBaskets']);
    const routerList = router.getRoutes();

    const footerMenus = ref([
      { icon: 'mob_home', label: t('MSG_TXT_HOME') },
      { icon: 'mob_task', label: t('MSG_TXT_WK_LIST') },
      { icon: 'mob_recently', label: t('MSG_TXT_RECENT_WORK') },
      { icon: 'mob_basket', label: t('MSG_TXT_STLM_BASKET') },
      { icon: 'mob_menu', label: t('MSG_BTN_ALL_VIEW'), component: async () => await import('../../pages/mobile/MobileTotalMenuP.vue') },
    ]);

    function findMainMenu(fromMenuUid) {
      if (fromMenuUid) {
        const parent = routerList.find((menu) => menu.meta.menuUid === fromMenuUid);
        if (parent.meta.pageUseCode === 'N') return parent.path;
        if (parent.meta.pageUseCode === 'S') return findMainMenu(parent.meta.menuUid);
      }
      return null;
    }

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
        const menuUid = (await getPreference(`${consts.MENU_RECENT_WORK_PREFIX}${userId.toUpperCase()}`)).value;
        const targetMenu = routerList.find((route) => route.meta.menuUid === menuUid);

        // 메뉴가 있을때만 이동
        if (targetMenu) {
          const { pageUseCode } = targetMenu.meta;
          const SVPD_CST_SV_ASN_NO = await getPreference('SVPD_CST_SV_ASN_NO');
          const SVPD_DETAIL_MENU_CD = await getPreference('SVPD_DETAIL_MENU_CD');
          let svpdCstSvAsnNo;
          let svpdDetailMenuCd;
          if (isEmpty(SVPD_CST_SV_ASN_NO)) svpdCstSvAsnNo = '';
          else svpdCstSvAsnNo = SVPD_CST_SV_ASN_NO.value;
          if (isEmpty(SVPD_DETAIL_MENU_CD)) svpdDetailMenuCd = '';
          else svpdDetailMenuCd = SVPD_DETAIL_MENU_CD.value;

          if (pageUseCode === 'S') {
            const path = findMainMenu(targetMenu.meta.parentsMenuUid);

            if (path) {
              router.push({
                path,
                state: { stateParam: { recentWorkYn: 'Y', svpdCstSvAsnNo, svpdDetailMenuCd } },
              });
            }
          } else if (pageUseCode === 'N') {
            const { path } = targetMenu;
            router.push({
              path,
              state: { stateParam: { recentWorkYn: 'Y', svpdCstSvAsnNo, svpdDetailMenuCd } },
            });
          }
        }
      }

      if (idx === 3) {
        const name = routerList.find((route) => route.meta.pageName === 'WmsnbServiceSettlementMgtM')?.name;
        if (name) router.push({ name });
        else curr.value = -1;
      }
    }

    return {
      openMenu,
      footerMenus,
      curr,
      basketSize,
    };
  },
};

</script>
