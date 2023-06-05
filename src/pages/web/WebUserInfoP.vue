<template>
  <!-- rev:230517 전면수정 -->
  <kw-popup
    size="md"
    title="사용자정보"
  >
    <kw-form
      ref="frmMainRef"
      :cols="1"
      dense
    >
      <kw-form-row>
        <kw-form-item label="로그인 계정">
          <p>{{ `${userInfo.loginId}` }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="이름">
          <p>{{ userInfo.userName }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="회사">
          <p>{{ userInfo.companyName }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="부서">
          <p>{{ userInfo.departmentName }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="이메일">
          <p>{{ userInfo.email }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="휴대전화번호">
          <p>
            <kw-input
              v-model="userInfo.cellphone"
              v-model:telNo0="userInfo.cellPhoneLocataTelNumber"
              v-model:telNo1="userInfo.mexnoGbencr"
              v-model:telNo2="userInfo.cellPhoneIndividualTelNumber"
              label="휴대전화번호"
              mask="telephone"
              dense
              rules="required|telephone"
            />
          </p>
        </kw-form-item>
      </kw-form-row>
    </kw-form>
    <ul class="kw-notification mt20">
      <li>접속 중인 로그인 계정을 변경하실 경우, 확인 중인 업무화면 탭이 모두 종료됩니다.</li>
    </ul>
    <template #action>
      <kw-btn
        negative
        label="취소"
        @click="cancel"
      />
      <kw-btn
        primary
        label="확인"
        @click="onClickConfirm"
      />
    </template>
  </kw-popup>
  <!-- //rev:230517 전면수정 -->
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import useModal from '../../composables/useModal';
import { http } from '../../plugins/http';

const { cancel, ok } = useModal();
const { getters, dispatch } = useStore();

const user = getters['meta/getUserInfo'];
const userInfo = cloneDeep(user);
const frmMainRef = ref();

async function onClickConfirm() {
  if (await !frmMainRef.value?.isModified) {
    ok();
    return;
  }
  if (!await frmMainRef.value.validate()) return;
  await http.put('/sflex/common/common/user-basics/update-cellphone', userInfo);
  await dispatch('meta/fetchLoginInfo');
  ok();
}

onMounted(() => {
  frmMainRef.value.init();
});

</script>
