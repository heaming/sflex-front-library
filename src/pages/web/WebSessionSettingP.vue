<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebSessionChangeP - 임시 세션변경 기능
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- 테스트용으로 만들어둔, PC의 임시 세션변경 기능 (조직유형, 역할자코드 등 변경 가능)
****************************************************************************************************
--->
<template>
  <kw-popup
    class="web-dashboard-mgt"
    size="2xl"
    title="(임시) 세션변경"
  >
    <kw-form
      ref="frmMainRef"
      :cols="1"
      style="margin-top: 30px;margin-bottom: 30px;"
    >
      <kw-form-row>
        <kw-form-item label="회사코드">
          <kw-input v-model="userInfoForSetting.companyCode" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="회사명">
          <kw-input v-model="userInfoForSetting.companyName" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="조직유형코드">
          <kw-input v-model="userInfoForSetting.ogTpCd" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="조직유형코드 대상 코드 (hr1)">
          <kw-input v-model="userInfoForSetting.wkOjOgTpCd" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="조직코드">
          <kw-input v-model="userInfoForSetting.departmentId" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="조직ID">
          <kw-input v-model="userInfoForSetting.ogId" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="직급코드">
          <kw-input
            v-model="userInfoForSetting.careerLevelCode"
            placeholder="변경된 값은 저장 되나, 보여지지는 않습니다. (고객사 요청)"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="직급명">
          <kw-input
            v-model="userInfoForSetting.careerLevelName"
            placeholder="변경된 값은 저장 되나, 보여지지는 않습니다. (고객사 요청)"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="사번">
          <kw-input v-model="userInfoForSetting.employeeIDNumber" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="대표권한그룹">
          <kw-input v-model="userInfoForSetting.baseRleCd" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="겸직여부">
          <kw-input v-model="userInfoForSetting.ccpsYn" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="재직상택코드">
          <kw-input v-model="userInfoForSetting.irsdSttCd" />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
    <template #action>
      <kw-btn
        primary
        :label="$t('MSG_BTN_SAVE')"
        @click="onClickSave"
      />
    </template>
  </kw-popup>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { http } from '../../plugins/http';
import { notify } from '../../plugins/notify';
import useModal from '../../composables/useModal';
import useMeta from '../../composables/useMeta';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';
import { useSession } from '../../index';

const {
  initSessionImsi,
} = useSession();
const { ok } = useModal();
const userInfoForSetting = ref(cloneDeep(useMeta().getUserInfo()));
userInfoForSetting.value.careerLevelCode = '';
userInfoForSetting.value.careerLevelName = '';

async function onClickSave() {
  const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
  await http.post('/sflex/common/common/set-session-data', userInfoForSetting.value, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  await initSessionImsi();
  ok();
  await notify('세션변경이 완료되었습니다.');
}
</script>
