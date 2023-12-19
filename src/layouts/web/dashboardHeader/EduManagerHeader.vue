<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : EduManagerHeader - 홈카드 화면의 EDU 매니저 (선생님) 헤더
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- 접속 시 홈 카드 영역의 헤더를 보여준다. (EDU 매니저, 선생님)
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
      <span style="color: #2f3c73;">EDU 매니저/선생님</span>
    </p>
    <div class="dashboard_summary_counter">
      <h5>미팅참석현황</h5>
      <dl>
        <!-- <dt>어제</dt>
              <dd>{{ topBarData.meeting.metgPrscDc ?? 0 }}</dd> -->
        <dt>{{ (dayjs().month() + 1) + '월' }}</dt>
        <dd>{{ getNumberWithComma(topBarData.meeting.METG_PRSC_DC) ?? 0 }}</dd>
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
        <dd>{{ getNumberWithComma(topBarData.customer.cstIn) ?? 0 }}</dd>
        <dt>이탈</dt>
        <dd>{{ getNumberWithComma(topBarData.customer.cstOut) ?? 0 }}</dd>
        <dt>총인원수</dt>
        <dd>{{ getNumberWithComma(topBarData.customer.cstTot) ?? 0 }}</dd>
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
        v-model="prdType"
        :options="[
          {'cd':'D', 'nm':'일간'},
          {'cd':'M', 'nm':'월간'}
        ]"
        option-label="nm"
        option-value="cd"
        dense
        gap="0px"
      />
      <dl>
        <dt>진단검사</dt>
        <dd>{{ getNumberWithComma(topBarData.index.dgnsCnt) ?? 0 }}</dd>
        <dt>무료체험</dt>
        <dd>{{ getNumberWithComma(topBarData.index.smartCnt) ?? 0 }}</dd>
      </dl>
    </div>
  </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import { http } from '../../../plugins/http';
import useMeta from '../../../composables/useMeta';
import { getNumberWithComma } from '../../../utils/string';

const prdType = ref('D');

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const topBarData = ref({
  meeting: {},
  customer: {},
  index: {},
});

async function getMeetingAttendData() {
  const params = {
    agrgYm: dayjs().format('YYYYMM'),
    ogTpCd: userInfo.value.ogTpCd,
    prtnrNo: userInfo.value.employeeIDNumber,
  };
  const resp = await http.get('/sms/common/competence/month-partner-meeting', { params });
  return resp.data;
}

async function getCustomerData() {
  const resp = await http.get('/sms/edu/contract/homecard/customer-status');
  return resp.data;
}

async function getIndexData() {
  const resp = await http.get(`/sms/edu/customer/common/homecards/status/${prdType.value}`);
  return resp.data;
}

async function getDataAll() {
  if (['WEB_DEF', 'MBL_DEF', 'TBL_DEF'].includes(userInfo.value.portalId) && userInfo.value.tenantId === 'TNT_EDU') {
    try {
      const [meeting, customer, index] = await Promise.all(
        [getMeetingAttendData(), getCustomerData(), getIndexData()],
      );
      topBarData.value.meeting = meeting ?? {};
      topBarData.value.customer = customer ?? {};
      topBarData.value.index = index ?? {};
    } catch (e) {
      topBarData.value.meeting = {};
      topBarData.value.customer = {};
      topBarData.value.index = {};
    }
  }
}

watch(prdType, () => {
  getDataAll();
});

onMounted(async () => {
  await getDataAll();
});

</script>
