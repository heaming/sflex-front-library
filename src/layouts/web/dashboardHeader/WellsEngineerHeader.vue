<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WellsEngineerHeader - 홈카드 화면의 Wells 엔지니어 헤더
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
      <span style="color: #2f3c73;">WELLS 엔지니어</span>
    </p>
    <div class="dashboard_summary_counter">
      <h5>오늘일정</h5>
      <dl>
        <dt>오늘</dt>
        <dd>{{ getNumberWithComma(data.todayCnt) ?? 0 }}</dd>
        <dt>설치</dt>
        <dd>{{ getNumberWithComma(data.todayIstCnt) ?? 0 }}</dd>
        <dt>A/S</dt>
        <dd>{{ getNumberWithComma(data.todayAsCnt) ?? 0 }}</dd>
        <dt>B/S</dt>
        <dd>{{ getNumberWithComma(data.todayBsCnt) ?? 0 }}</dd>
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
      <h5>내일일정</h5>
      <dl>
        <dt>내일</dt>
        <dd>{{ getNumberWithComma(data.tommrCnt) ?? 0 }}</dd>
        <dt>설치</dt>
        <dd>{{ getNumberWithComma(data.tommrIstCnt) ?? 0 }}</dd>
        <dt>A/S</dt>
        <dd>{{ getNumberWithComma(data.tommrAsCnt) ?? 0 }}</dd>
        <dt>B/S</dt>
        <dd>{{ getNumberWithComma(data.tommrBsCnt) ?? 0 }}</dd>
      </dl>
    </div>
    <div class="q-space" />
    <kw-btn
      icon="search_doc_24"
      borderless
      class="kw-font-pt24 mr24"
    >
      <kw-tooltip>개인별 서비스 현황</kw-tooltip>
    </kw-btn>
  </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import { http } from '../../../plugins/http';
import useMeta from '../../../composables/useMeta';
import { getNumberWithComma } from '../../../utils/string';

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const data = ref({});

async function getEngineerHeaderData() {
  const res = await http.get('/sms/wells/service/proc-ps/homecard-search-cnt', { params: { rsbCd: userInfo.value.rsbCd } });
  data.value = res.data;
}

onMounted(() => {
  getEngineerHeaderData();
});

</script>
<style scoped lang="scss">
</style>
