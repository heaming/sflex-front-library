<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WellsHeadOfficeHeader - 홈카드 화면의 Wells 본사 헤더
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
      <span style="color: #2f3c73;">WELLS 본사</span>
    </p>
    <div class="dashboard_summary_counter">
      <h5>판매</h5>
      <kw-btn-toggle
        v-model="sales"
        :options="['계약', '매출']"
        dense
        gap="0px"
      />
      <dl>
        <dt>목표/실적(달성율)</dt>
        <dd>0/0<span>(%)</span></dd>
        <dt>신규율/재렌탈율</dt>
        <dd>0%/0%</dd>
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
      <h5>계정</h5>
      <dl>
        <dt>누적/순증/순수이탈률</dt>
        <dd>0/0/0%</dd>
      </dl>
    </div>
  </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import useMeta from '../../../composables/useMeta';

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

</script>
<style scoped lang="scss">
</style>
