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
      <kw-form-row>
        <kw-form-item label="작업대상 조직유형">
          <p>
            <kw-select
              v-model="userInfo.wkOjOgTpCd"
              :options="codes"
              dense
              :disable="selableOgTpCds?.length < 2"
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
import useMeta from '../../composables/useMeta';
import { http } from '../../plugins/http';
import { getCodes } from '../../utils/code';

const { cancel, ok } = useModal();
const { dispatch } = useStore();

const { getUserInfo } = useMeta();

const userInfo = computed(() => cloneDeep(getUserInfo()));
const frmMainRef = ref();

const selableOgTpCds = computed(() => userInfo.value?.selableOgTpCd.split(','));
const codes = ref([]);
await getCodes('OG_TP_CD').then((res) => {
  if (selableOgTpCds.value?.length > 0) {
    codes.value = res.filter((x) => selableOgTpCds.value.includes(x.codeId));
  }
}).catch(() => {});

async function onClickConfirm() {
  if (await frmMainRef.value?.alertIfIsNotModified()) return;
  if (!await frmMainRef.value.validate()) return;

  await http.put('/sflex/common/common/user-basics/update/session', userInfo.value);
  await dispatch('meta/fetchLoginInfo');
  await http.post('/sflex/common/common/set-session-data', userInfo.value);
  ok();
}

onMounted(() => {
  frmMainRef.value.init();
});

</script>
