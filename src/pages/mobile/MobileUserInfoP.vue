<template>
  <kw-popup title="사용자정보">
    <div class="pa20">
      <kw-form
        ref="frmMainRef"
        :cols="1"
      >
        <kw-form-item label="로그인 계정">
          <p>{{ `${userInfo.departmentName}(${userInfo.careerLevelName})` }}</p>
        </kw-form-item>
        <kw-form-item label="이름">
          <p>{{ userInfo.userName }}</p>
        </kw-form-item>
        <kw-form-item label="회사">
          <p>{{ userInfo.companyName }}</p>
        </kw-form-item>
        <kw-form-item label="부서">
          <p>{{ userInfo.departmentName }}</p>
        </kw-form-item>
        <kw-form-item label="직책">
          <p>{{ userInfo.careerLevelName }}</p>
        </kw-form-item>
        <kw-form-item label="이메일">
          <p>{{ userInfo.email }}</p>
        </kw-form-item>
        <kw-input
          v-model="userInfo.cellphone"
          v-model:telNo0="userInfo.cellPhoneLocataTelNumber"
          v-model:telNo1="userInfo.mexnoGbencr"
          v-model:telNo2="userInfo.cellPhoneIndividualTelNumber"
          label="휴대전화번호"
          mask="telephone"
          dense
          rules="required|telephone"
          class="mt12"
        />
      </kw-form>
      <ul class="kw-notification mt20">
        <li>접속 중인 로그인 계정을 변경하실 경우, 확인 중인 화면이 새고로침 됩니다.</li>
      </ul>
    </div>

    <template #action>
      <kw-btn
        filled
        negative
        label="취소"
        @click="cancel"
      />
      <kw-btn
        filled
        primary
        label="저장"
        @click="onClickConfirm"
      />
    </template>
  </kw-popup>
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
