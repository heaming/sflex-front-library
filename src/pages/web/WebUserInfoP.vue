<template>
  <!-- rev:230517 전면수정 -->
  <kw-popup
    size="sm"
    title="사용자정보"
  >
    <kw-form
      ref="frmMainRef"
      :cols="1"
    >
      <kw-form-row>
        <kw-form-item label="로그인 계정">
          <p>{{ `${userInfo.loginId}` }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="성명">
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
        <kw-form-item label="직책">
          <p>{{ userInfo.rsbNm }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="이메일">
          <p>{{ userInfo.email }}</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="휴대전화번호">
          <telephone-number
            v-model:tel-no1="telephone.telNo1"
            v-model:tel-no2="telephone.telNo2"
            v-model:tel-no3="telephone.telNo3"
            label="휴대전화번호"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="작업대상 조직유형">
          <kw-select
            v-model="userInfo.wkOjOgTpCd"
            :options="codes"
            :disable="codes?.length < 2"
          />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
    <template #action>
      <kw-btn
        negative
        label="취소"
        @click="cancel"
      />
      <kw-btn
        primary
        label="저장"
        @click="onClickConfirm"
      />
    </template>
  </kw-popup>
  <!-- //rev:230517 전면수정 -->
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import TelephoneNumber from '../component/TelephoneNumber.vue';
import useModal from '../../composables/useModal';
import useMeta from '../../composables/useMeta';
import { http } from '../../plugins/http';
import { getCodes } from '../../utils/code';

const { cancel, ok } = useModal();
const { dispatch } = useStore();

const { getUserInfo } = useMeta();

const userInfo = computed(() => cloneDeep(getUserInfo()));
const frmMainRef = ref();
const userInfoPhone = computed(() => userInfo.value.cellphone.split('-'));
const telephone = ref({
  telNo1: userInfoPhone.value[0],
  telNo2: userInfoPhone.value[1],
  telNo3: userInfoPhone.value[2],
});
const selableOgTpCds = computed(() => userInfo.value?.selableOgTpCd?.split(','));
const codes = ref([]);
await getCodes('OG_TP_CD').then((res) => {
  if (selableOgTpCds.value?.length > 0) {
    codes.value = res.filter((x) => selableOgTpCds.value.includes(x.codeId));
  }
}).catch(() => {});

async function onClickConfirm() {
  if (await frmMainRef.value?.alertIfIsNotModified()) return;
  if (!await frmMainRef.value.validate()) return;

  userInfo.value.cellPhoneLocataTelNumber = telephone.value.telNo1;
  userInfo.value.mexnoGbencr = telephone.value.telNo2;
  userInfo.value.cellPhoneIndividualTelNumber = telephone.value.telNo3;
  await http.put('/sflex/common/common/user-basics/update/session', userInfo.value);
  await dispatch('meta/fetchLoginInfo');
  await http.post('/sflex/common/common/set-session-data', userInfo.value);
  ok();
}

onMounted(() => {
  frmMainRef.value.init();
});

</script>
