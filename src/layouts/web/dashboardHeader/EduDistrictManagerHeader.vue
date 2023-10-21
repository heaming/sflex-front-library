<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : EduDistrictManagerHeader - 홈카드 화면의 EDU 지국장 헤더
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- 접속 시 홈 화면에, 로그인 계정에 설정된 홈카드들을 보여주는 화면
****************************************************************************************************
--->
<template>
  <div
    class="dashboard_summary dashboard_summary_type1"
  >
    <p class="greetings">
      <span>{{ `${userInfo.userName}${userInfo.rsbNm
        ? userInfo.rsbNm.endsWith('님')
          ? ` ${userInfo.rsbNm.slice(0, -1)}` : ` ${userInfo.rsbNm}`
        : ''}님` }}</span>, 좋은 하루 보내세요.
    </p>
    <div class="dashboard_summary_counter">
      <h5>미팅참석현황</h5>
      <dl>
        <!-- <dt>어제</dt>
              <dd>{{ topBarData.meeting.metgPrscDc ?? 0 }}</dd> -->
        <dt>{{ (dayjs().month() + 1) + '월' }}</dt>
        <dd>{{ topBarData.meeting.metgPrscDc ?? 0 }}</dd>
      </dl>
    </div>
    <kw-separator
      vertical
      inset
      spaced="20px"
      style="opacity: 0.5;"
      color="bg-white"
    />
    <div class="dashboard_summary_counter">
      <h5>고객현황</h5>
      <dl>
        <dt>유입</dt>
        <dd>{{ topBarData.customer.cstIn ?? 0 }}</dd>
        <dt>이탈</dt>
        <dd>{{ topBarData.customer.cstOut ?? 0 }}</dd>
        <dt>총인원수</dt>
        <dd>{{ topBarData.customer.cstTot ?? 0 }}</dd>
      </dl>
    </div>
    <kw-separator
      vertical
      inset
      spaced="20px"
      style="opacity: 0.5;"
      color="bg-white"
    />
    <div class="dashboard_summary_counter">
      <h5>주요지표(실적)</h5>
      <kw-btn-toggle
        v-model="periodType"
        :options="[{'cd':'D', 'nm':'일간'}, {'cd':'M', 'nm':'월간'}]"
        option-label="nm"
        option-value="cd"
        dense
        gap="0px"
      />
      <dl>
        <dt>진단검사</dt>
        <dd>{{ topBarData.index.dgnsCnt ?? 0 }}</dd>
        <dt>무료체험</dt>
        <dd>{{ topBarData.index.smartCnt ?? 0 }}</dd>
      </dl>
    </div>
  </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import { http } from '../../../plugins/http';
import useMeta from '../../../composables/useMeta';

const { getters, commit } = useStore();

const props = defineProps({
  importedComponents: {
    type: Array,
    default: undefined,
  },
});

const periodType = ref('D');
const hasDashboardItem = ref(false);

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const topBarData = ref({
  meeting: {},
  customer: {},
  index: {},
});

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

async function getMeetingAttendData() {
  const params = {
    body: {
      AGRG_YM: dayjs().format('YYYYMM'),
      OG_TP_CD: userInfo.value.ogTpCd,
      PRTNR_NO: userInfo.value.loginId,
    },
    header: {},
  };
  const resp = await http.post('/interface/sms/common/competence/mcby-prtnr-metg-agrg', params);
  return resp.data;
}

async function getCustomerData() {
  const params = {
    dayOrMonth: 'MONTH',
    ogCd: userInfo.value.ogCd,
    ogTpCd: userInfo.value.ogTpCd,
  };
  const resp = await http.get('/sms/edu/contract/orderstatus/customer-status', { params });
  return resp.data;
}

async function getIndexData() {
  const resp = await http.get(`/sms/edu/customer/common/homecards/status/${periodType.value}`);
  return resp.data;
}

async function getDataAll() {
  if (['WEB_DEF', 'MBL_DEF', 'TBL_DEF'].includes(userInfo.value.portalId) && userInfo.value.tenantId === 'TNT_EDU') {
    try {
      const [meeting, customer, index] = await Promise.all(
        [getMeetingAttendData(), getCustomerData(), getIndexData()],
      );
      topBarData.value.meeting = meeting.body ?? {};
      topBarData.value.customer = customer ?? {};
      topBarData.value.index = index ?? {};
    } catch (e) {
      topBarData.value.meeting = {};
      topBarData.value.customer = {};
      topBarData.value.index = {};
    }
  }
}

watch(periodType, () => {
  getDataAll();
});

onMounted(async () => {
  await getDataAll();
});

</script>
<style scoped lang="scss">
</style>
