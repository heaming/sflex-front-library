<template>
  <q-footer
    class="mobile-footer flex items-center"
    bordered
  >
    <!-- 버튼 활성화 될 경우 .curr -->
    <template
      v-for="(footerMenu, footerIdx) in footerMenus"
      :key="footerIdx"
    >
      <kw-btn
        v-if="footerMenu.show"
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
    </template>
  </q-footer>
</template>

<script>
import { isEmpty } from 'lodash-es';
import { modal } from '../../plugins/modal';
import useMeta from '../../composables/useMeta';
import { getPreference } from '../../utils/mobile';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { GlobalModalVmKey } from '../../consts/private/symbols';
import consts from '../../consts';

// ROLE 출처 : https://kyowon.atlassian.net/wiki/spaces/ForKUS/pages/168263832/95.

const MANAGER_PLANNER = [
  // 'ROL_W1020', // 본사 영업부
  // 'ROL_W1030', // 본사 영업부
  // 'ROL_W2010', // P조직 플래너
  // 'ROL_W2020', // P조직 영업부
  // 'ROL_W2030', // P조직 영업부
  // 'ROL_W2040', // P조직 영업부
  // 'ROL_W2050', // P조직 영업부
  // 'ROL_W2060', // P조직 영업부
  'ROL_W3010', // M조직 플래너
  'ROL_W3020', // M조직 영업부
  'ROL_W3030', // M조직 영업부
  'ROL_W3040', // M조직 영업부
  'ROL_W3050', // M조직 영업부
  'ROL_W3060', // M조직 영업부
  // 'ROL_W5110', // B2B 영업부
  // 'ROL_W5210', // 온라인총판 영업부
];

const ENGINEER_HOMEMASTER = [
  'ROL_W4010', // 홈마스터 - 엔지니어
  'ROL_W4020', // 홈마스터 - 엔지니어
  'ROL_W6010', // 엔지니어
  'ROL_W6020', // 엔지니어
  'ROL_W6030', // 엔지니어
  'ROL_W6040', // 엔지니어
];

export default {
  name: 'MobileFooter',

  setup() {
    const { getters } = useStore();
    const { getUserInfo } = useMeta();
    const userInfo = computed(() => getUserInfo());

    const footerByRoles = computed(() => {
      const { roles } = userInfo.value;
      if (!roles || roles.length < 1) return 'DEFAULT';
      const roleList = roles.map((x) => x.roleId);
      const isManager = roleList.some((x) => MANAGER_PLANNER.includes(x));
      if (isManager) return 'MANAGER';
      const isEngineer = roleList.some((x) => ENGINEER_HOMEMASTER.includes(x));
      if (isEngineer) return 'ENGINEER';
      return 'DEFAULT';
    });

    const router = useRouter();
    const { t } = useI18n();
    const curr = ref(-1);

    const basketSize = computed(() => getters['meta/getBaskets']);
    const routerList = router.getRoutes();

    const footerMenus = ref([
      { icon: 'mob_home', label: t('MSG_TXT_HOME'), show: true },
      { icon: 'mob_task', label: t('MSG_TXT_WK_LIST'), show: footerByRoles.value !== 'DEFAULT' },
      { icon: 'mob_recently', label: t('MSG_TXT_RECENT_WORK'), show: footerByRoles.value !== 'DEFAULT' },
      { icon: 'mob_basket', label: t('MSG_TXT_STLM_BASKET'), show: footerByRoles.value === 'ENGINEER' },
      { icon: 'write_24', label: t('MSG_TXT_ITG_CNTRW'), show: footerByRoles.value !== 'ENGINEER' },
      { icon: 'mob_menu', label: t('MSG_BTN_ALL_VIEW'), component: async () => await import('../../pages/mobile/MobileTotalMenuP.vue'), show: true },
    ]);

    function findMainMenu(fromMenuUid) {
      if (fromMenuUid) {
        const now = routerList.find((menu) => menu.meta.menuUid === fromMenuUid);
        if (now.meta.pageUseCode === 'N') return now;
        if (now.meta.pageUseCode === 'S') return findMainMenu(now.meta.parentsMenuUid);
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

      if (menu.icon === 'mob_home') {
        if (router.currentRoute.value.name !== 'Home') router.push({ name: 'Home' });
      }

      if (menu.icon === 'mob_menu') {
        curr.value = idx;
        await modal({
          component: menu.component,
          dialogProps: { maximized: true, class: 'main-menu-modal' },
        });

        curr.value = -1;
        return;
      }

      if (menu.icon === 'mob_recently' && userInfo.value.userId) { // 최근 메뉴 라우팅
        const menuUid = (await getPreference(`${consts.MENU_RECENT_WORK_PREFIX}${userInfo.value.userId.toUpperCase()}`)).value;
        const targetMenu = findMainMenu(menuUid);
        const mainOfCurrentMenu = findMainMenu(router.currentRoute?.value?.meta?.menuUid);
        if (targetMenu?.meta?.menuUid === mainOfCurrentMenu?.meta?.menuUid) return;

        // 메뉴가 있을때만 이동
        if (targetMenu) {
          const SVPD_CST_SV_ASN_NO = await getPreference('SVPD_CST_SV_ASN_NO');
          const SVPD_DETAIL_MENU_CD = await getPreference('SVPD_DETAIL_MENU_CD');
          let svpdCstSvAsnNo;
          let svpdDetailMenuCd;
          if (isEmpty(SVPD_CST_SV_ASN_NO)) svpdCstSvAsnNo = '';
          else svpdCstSvAsnNo = SVPD_CST_SV_ASN_NO.value;
          if (isEmpty(SVPD_DETAIL_MENU_CD)) svpdDetailMenuCd = '';
          else svpdDetailMenuCd = SVPD_DETAIL_MENU_CD.value;

          const { path } = targetMenu;
          router.push({
            path,
            state: { stateParam: { recentWorkYn: 'Y', svpdCstSvAsnNo, svpdDetailMenuCd } },
          });
        }
      }

      let pageName;
      if (menu.icon === 'mob_basket') {
        pageName = 'WmsnbServiceSettlementMgtM';
        const name = routerList.find((route) => route.meta.pageName === pageName)?.name;
        if (name) router.push({ name });
        else curr.value = -1;
      }

      if (menu.icon === 'mob_task') { // 작업목록
        if (footerByRoles.value === 'MANAGER') pageName = 'WmsnbRegularVisitWorkListM';
        else pageName = 'WmsnbAsWorkListM';
        const name = routerList.find((route) => route.meta.pageName === pageName)?.name;
        if (name) router.push({ name });
        else curr.value = -1;
      }

      if (menu.icon === 'write_24') {
        if (router.currentRoute?.value?.fullPath !== '/mobile/wmcta-contract-registration-type-select') router.push('/mobile/wmcta-contract-registration-type-select');
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
