<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WellsBusinessDepartmentHeader - 홈카드 화면의 Wells 영업부 헤더
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- 접속 시 홈 카드 영역의 헤더를 보여준다. (WELLS 영업부)
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
      <span style="color: #2f3c73;">WELLS 영업부</span>
    </p>
    <div class="dashboard_summary_counter">
      <h5>판매</h5>
      <kw-btn-toggle
        v-model="salesOrContract"
        :options="[
          { codeName: '계약', codeId: 'contract'},
          { codeName: '매출', codeId: 'sales' }]"
        dense
        gap="0px"
      />
      <dl>
        <dt>일계/누계(달성률)</dt>
        <template v-if="salesOrContract === 'contract'">
          <dd>
            {{ `${getNumberWithComma(topBarData.sales.contractRes?.orgTgrCnt) ?? 0}/` +
              `${getNumberWithComma(topBarData.sales.contractRes?.orgSumAckmtPerfCnt) ?? 0}` }}
            <span>({{ Math.round(Number(topBarData.sales.contractRes?.achvRate ?? 0)) ?? 0 }}%)</span>
          </dd>
        </template>
        <template v-else>
          <dd>
            {{ `${getNumberWithComma(topBarData.sales.salesRes?.orgTgrCnt) ?? 0}/` +
              `${getNumberWithComma(topBarData.sales.salesRes?.orgSumAckmtPerfCnt) ?? 0}` }}
            <span>({{ Math.round(Number(topBarData.sales.salesRes?.achvRate ?? 0)) ?? 0 }}%)</span>
          </dd>
        </template>
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
      <h5>조직</h5>
      <dl>
        <dt>가동(등록)</dt>
        <dd>
          {{ getNumberWithComma(topBarData.org.prtnrSaleCnt) ?? 0 }}
          <span>({{ getNumberWithComma(topBarData.org.prtnr1nmnCnt) ?? 0 }})</span>
        </dd>
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
      <h5>서비스(BS)</h5>
      <dl>
        <dt>관리/방문/완료(처리율)</dt>
        <dd>
          {{ `${getNumberWithComma(topBarData.bs.totalCnt) ?? 0}/` +
            `${getNumberWithComma(topBarData.bs.incompleteCnt) ?? 0}/` +
            `${getNumberWithComma(topBarData.bs.completeCnt) ?? 0}`
          }}<span> ({{ topBarData.bs.completeRate ?? '0%' }})</span>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import useMeta from '../../../composables/useMeta';
import { http } from '../../../plugins/http';
import { getNumberWithComma } from '../../../utils/string';

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));
const salesOrContract = ref('contract');

const topBarData = ref({
  sales: {},
  org: {},
  bs: {},
});

async function getSalesPurposeAndPerformance() {
  // 판매목표/실적
  const resp = await http.get('/sms/wells/contract/homecard/channel-contract-amt');
  return resp.data;
}

async function getOrgMonthlyOperationData() {
  // 조직 월별 가동현황
  const resp = await http.get('/sms/common/orgs/home-cards/org-month-optn');
  return resp.data;
}

async function getBsProcess() {
  // 조직 월별 가동현황
  const resp = await http.get('/sms/wells/service/bs-process-status');
  return resp.data;
}

async function getDataAll() {
  if (['WEB_DEF', 'MBL_DEF', 'TBL_DEF'].includes(userInfo.value.portalId) && userInfo.value.tenantId === 'TNT_WELLS') {
    try {
      const [sales, org, bs] = await Promise.all(
        [getSalesPurposeAndPerformance(), getOrgMonthlyOperationData(), getBsProcess()],
      );
      topBarData.value.sales = sales ?? {};
      topBarData.value.org = org ?? {};
      topBarData.value.bs = bs ?? {};
    } catch (e) {
      topBarData.value.sales = {};
      topBarData.value.org = {};
      topBarData.value.bs = {};
    }
  }
}

onMounted(() => {
  getDataAll();
});

</script>
<style scoped lang="scss">
</style>
