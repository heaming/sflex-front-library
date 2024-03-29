<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : EduCenterLeaderHeader - 홈카드 화면의 EDU 센터장, 본사 헤더
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- 접속 시 홈 카드 영역의 헤더를 보여준다. (EDU 센터장)
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
      <span style="color: #2f3c73;">EDU 센터장</span>
    </p>
    <div class="dashboard_summary_counter">
      <h5>미팅참석현황</h5>
      <dl>
        <dt>어제</dt>
        <dd>{{ getNumberWithComma(topBarData.yesterdayMeeting.cnt) ?? 0 }}</dd>
      </dl>
      <dl class="ml16">
        <dt>오늘</dt>
        <dd>{{ getNumberWithComma(topBarData.todayMeeting.cnt) ?? 0 }}</dd>
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
      <h5>주요지표(실적/지평)</h5>
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
        <dd>
          {{ `${getNumberWithComma(topBarData.index.dgnsCnt) ?? 0}/` +
            `${getNumberWithComma(topBarData.index.dgnsAvg) ?? 0}` }}
        </dd>
        <dt>무료체험</dt>
        <dd>
          {{ `${getNumberWithComma(topBarData.index.smartCnt) ?? 0}/` +
            `${getNumberWithComma(topBarData.index.smartAvg) ?? 0}` }}
        </dd>
      </dl>
    </div>
  </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import useMeta from '../../../composables/useMeta';
import { http } from '../../../plugins/http';
import { getNumberWithComma } from '../../../utils/string';

const prdType = ref('D');

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const topBarData = ref({
  todayMeeting: {},
  yesterdayMeeting: {},
  customer: {},
  index: {},
});

async function getTodayMeetingAttendData() {
  const params = {
    metgSchdYmd: dayjs().format('YYYYMMDD'), // 기준일자
    inqrDv: '2', // 조회구분
    ogTpCd: userInfo.value.ogTpCd, // 조직유형
    prtnrNo: userInfo.value.employeeIDNumber, // 파트너 번호
    lorOgIncYn: 'Y', // 하위조직 포함여부
  };
  const resp = await http.get('/sms/edu/competence/meeting-home-card', { params });
  return resp.data;
}

async function getYesterdayMeetingAttendData() {
  const params = {
    metgSchdYmd: dayjs().add(-1, 'd').format('YYYYMMDD'),
    inqrDv: '2', // 조회구분
    ogTpCd: userInfo.value.ogTpCd, // 조직유형
    prtnrNo: userInfo.value.employeeIDNumber, // 파트너 번호
    lorOgIncYn: 'Y', // 하위조직 포함여부
  };
  const resp = await http.get('/sms/edu/competence/meeting-home-card', { params });
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
      const [todayMeeting, yesterdayMeeting, customer, index] = await Promise.all(
        [getTodayMeetingAttendData(), getYesterdayMeetingAttendData(), getCustomerData(), getIndexData()],
      );
      topBarData.value.todayMeeting = todayMeeting ?? {};
      topBarData.value.yesterdayMeeting = yesterdayMeeting ?? {};
      topBarData.value.customer = customer ?? {};
      topBarData.value.index = index ?? {};
    } catch (e) {
      topBarData.value.todayMeeting = {};
      topBarData.value.yesterdayMeeting = {};
      topBarData.value.customer = {};
      topBarData.value.index = {};
    }
  }
}

watch(prdType, () => {
  getDataAll();
});

onMounted(() => {
  getDataAll();
});

</script>
<style scoped lang="scss">
</style>
