<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebReLoginP
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC 화면에서 일정 시간동안 작업이 없을 경우 나타나는, 세션 만료 표시 및 재로그인 모달
****************************************************************************************************
--->
<template>
  <kw-popup
    size="sm"
    title="로그인 연장"
    no-close-btn
  >
    <!-- rev:230626 no-close-btn 추가 -->
    <ul class="kw-notification">
      <li>
        안전한 서비스 이용을 위하여 30분동안 사용이 없으실 경우
        비밀번호 재입력 후 이용이 가능합니다.
      </li>
    </ul>

    <kw-form
      cols="1"
      class="mt20"
    >
      <kw-form-row>
        <kw-form-item label="비밀번호 재입력">
          <kw-input
            v-model="password"
            type="password"
            name="password"
            label="Password"
            rules="required"
            clearable
            @keydown.enter="reLogin"
          />
        </kw-form-item>
      </kw-form-row>
    </kw-form>

    <template #action>
      <kw-btn
        negative
        label="취소"
        @click="cancelLogin"
      />
      <kw-btn
        primary
        label="로그인"
        @click="reLogin"
      />
    </template>
  </kw-popup>
</template>

<script setup>
import CryptoJS from 'crypto-js';
// eslint-disable-next-line import/no-cycle
import { http } from '../../plugins/http';
import env from '../../consts/private/env';
import useModal from '../../composables/useModal';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';

const { ok } = useModal();
const password = ref('');

const reLoginInfo = localStorage.getItem('reLoginInfo');
const iv = CryptoJS.enc.Hex.parse('');
const key = CryptoJS.enc.Utf8.parse(consts.CRYPT_AES_ENC_KEY);
const byte = CryptoJS.AES.decrypt(reLoginInfo, key, { iv });

const decStr = byte.toString(CryptoJS.enc.Utf8);
const arr = decStr.split('|');

if (arr[2] === 'anonymous') {
  localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
  window.location.href = window.location.origin;
}
const userInfo = {
  tenantId: arr[0],
  portalId: arr[1],
  loginId: arr[2],
};
// const userInfo = localStorage.getItem('reLoginInfo');
const errorCount = ref(0);

async function cancelLogin() {
  localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
  window.location.reload();
}

async function reLogin() {
  const passwordEnc = CryptoJS.AES.encrypt(password.value, key, { iv });
  const res = await http.post(`${env.VITE_HTTP_ORIGIN}/certification/re-login`, { ...userInfo, password: passwordEnc.toString() })
    .catch(() => {
      errorCount.value += 1;
      if (errorCount.value === 5) {
        cancelLogin();
      }
    });
  ok(res.data);
  errorCount.value = 0;
}
</script>
