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
        <kw-form-item label="부서코드">
          <kw-input v-model="userInfoForSetting.departmentId" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="부서명">
          <kw-input v-model="userInfoForSetting.departmentName" />
        </kw-form-item>
      </kw-form-row>
      <!-- 임시로 직급코드, 직급명 비활성화. 임직원들의 직급명, 코드가 나오면 안된다고 함. -->
      <!-- <kw-form-row>
        <kw-form-item label="직급코드">
          <kw-input v-model="userInfoForSetting.careerLevelCode" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="직급명">
          <kw-input v-model="userInfoForSetting.careerLevelName" />
        </kw-form-item>
      </kw-form-row> -->
      <kw-form-row>
        <kw-form-item label="조직유형코드">
          <kw-input v-model="userInfoForSetting.ogTpCd" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="사번">
          <kw-input v-model="userInfoForSetting.employeeIDNumber" />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="기본권한코드">
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
  isReady,
} = useSession();
const { getUserInfo } = useMeta();
const { ok } = useModal();
const userInfoForSetting = ref(cloneDeep(useMeta().getUserInfo()));

async function onClickSave() {
  const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
  await http.post('/sflex/common/common/set-session-data', userInfoForSetting.value, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  await isReady();
  console.log(getUserInfo());
  ok();
  await notify('세션변경이 완료되었습니다.');
}
</script>
