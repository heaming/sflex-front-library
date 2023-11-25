<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebDashboardM - 홈카드 화면
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- 접속 시 홈 화면에, 로그인 계정에 설정된 홈카드들을 보여주는 화면
****************************************************************************************************
--->
<template>
  <kw-page
    class="py12"
    style="margin: 0 auto;"
  >
    <div class="relative-position">
      <div class="dashboard dashboard--fixed">
        <div
          v-if="!hasDashboardItem"
          class="no-item"
        >
          <img
            :src="tenantLogoUrl"
            :alt="tenantLogoAlt"
            style="width: 180px;"
          >
        </div>
        <!-- EDU 센터장 -->
        <template v-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.EDU_CENTER_LEADER">
          <edu-center-leader-header />
        </template>
        <!-- EDU 지국장 -->
        <template v-else-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.EDU_DISTRICT_MANAGER">
          <edu-district-manager-header />
        </template>
        <!-- EDU 매니저/플래너 -->
        <template v-else-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.EDU_MANAGER">
          <edu-manager-header />
        </template>
        <!-- WELLS 영업부 -->
        <template v-else-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.WELLS_BUSINESS_DEPARTMENT">
          <wells-business-department-header />
        </template>
        <!-- WELLS 엔지니어 -->
        <template v-else-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.WELLS_ENGINEER">
          <wells-engineer-header />
        </template>
        <!-- WELLS 본사 -->
        <template v-else-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.WELLS_HEAD_OFFICE">
          <wells-head-office-header />
        </template>
        <!-- 공통 헤더? -->
        <template v-else-if="hasDashboardItem && hcdHeaderType === hcdHeaderTypes.COMMON">
          <common-header />
        </template>
        <div class="dashboard_wrap">
          <template
            v-for="(userCard, idx) in userCards"
            :key="idx"
          >
            <div
              class="dashboard_el"
              :class="`dashboard_el_`
                + `${userCard.homeCardSizeTypeName.split('X')[0]}by${userCard.homeCardSizeTypeName.split('X')[1]}`"
            >
              <component
                :is="userCard.component"
                :period-type="periodType"
                :area-type="areaType"
              />
            </div>
          </template>
        </div>
      </div>
      <web-footer />
    </div>
  </kw-page>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import EduCenterLeaderHeader from './dashboardHeader/EduCenterLeaderHeader.vue';
import EduDistrictManagerHeader from './dashboardHeader/EduDistrictManagerHeader.vue';
import EduManagerHeader from './dashboardHeader/EduManagerHeader.vue';
import WellsBusinessDepartmentHeader from './dashboardHeader/WellsBusinessDepartmentHeader.vue';
import WellsEngineerHeader from './dashboardHeader/WellsEngineerHeader.vue';
import WellsHeadOfficeHeader from './dashboardHeader/WellsHeadOfficeHeader.vue';
import CommonHeader from './dashboardHeader/CommonHeader.vue';
import logoStandard from '../../assets/images/kstation_standard.svg';
import logoEdu from '../../assets/images/kstation_edu.svg';
import logoWells from '../../assets/images/kstation_wells.svg';
import { http } from '../../plugins/http';
import useMeta from '../../composables/useMeta';
import WebFooter from './WebFooter.vue';
import env from '../../consts/private/env';

const tenantPrefix = 'TNT_';
const tenantLogoUrls = {
  standard: logoStandard,
  edu: logoEdu,
  wells: logoWells,
};

const tenantId = env.VITE_TENANT_ID;
const tenant = tenantId.replace(tenantPrefix, '').toLowerCase();
const tenantLogoUrl = tenantLogoUrls[tenant] || tenantLogoUrls.standard;
const tenantLogoAlt = tenant ? `K-Station ${tenant}` : 'K-Station';

const { getters, commit } = useStore();

const props = defineProps({
  importedComponents: {
    type: Array,
    default: undefined,
  },
});

const areaType = ref('G');
const periodType = ref('D');
const hasDashboardItem = ref(false);

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const hcdHeaderTypes = ref({
  EDU_CENTER_LEADER: 'HE100', // EDU 센터장
  EDU_DISTRICT_MANAGER: 'HE200', // EDU 지국장
  EDU_MANAGER: 'HE300', // EDU 선생님 (매니저)
  WELLS_BUSINESS_DEPARTMENT: 'HW100', // WELLS 영업부
  WELLS_PLANNER: 'HW200', // WELLS 플래너 (모바일만?)
  WELLS_ENGINEER: 'HW300', // WELLS 엔지니어
  WELLS_HEAD_OFFICE: 'HW400', // WELLS 본사
  COMMON: 'HG100',
});

const hcdHeaderType = computed(() => userInfo?.value?.hcdCd);

const userCards = shallowRef([]);
async function fetchUserCards() {
  const response = await http.get('/sflex/common/common/user-homecards');

  userCards.value = response.data.sort((a, b) => (a.rowPosition === b.rowPosition
    ? (a.columnPosition - b.columnPosition) : (a.rowPosition - b.rowPosition)));

  const modules = props.importedComponents;
  userCards.value.forEach((item) => {
    modules.forEach((module) => {
      if (module.key.indexOf(item.pageId) > -1) {
        item.component = module.component;
      }
    });
  });

  if (userCards.value.length > 0) {
    hasDashboardItem.value = true;
  } else {
    hasDashboardItem.value = false;
  }
  commit('app/setUserHomecardChanged', false);
}
await fetchUserCards();

watch(() => getters['app/getUserHomecardChanged'], async (newVal) => {
  if (newVal) {
    await fetchUserCards();
  }
});

</script>
<style scoped lang="scss">
</style>
