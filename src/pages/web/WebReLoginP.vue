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
// import CryptoJS from 'crypto-js';
// eslint-disable-next-line import/no-cycle
import { http } from '../../plugins/http';
import env from '../../consts/private/env';
import useModal from '../../composables/useModal';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';

const { ok } = useModal();
const password = ref('');

// const reLoginInfo = localStorage.getItem('reLoginInfo');
// const iv = CryptoJS.enc.Hex.parse('');
// const key = CryptoJS.enc.Utf8.parse('KSTATION-ENC-AES-256-2023-195817');
// const byte = CryptoJS.AES.decrypt(reLoginInfo, key, { iv });
//
// const decStr = byte.toString(CryptoJS.enc.Utf8);
// const arr = decStr.split('|');
// const userInfo = {
//   tenantId: arr[0],
//   portalId: arr[1],
//   loginId: arr[2],
// };
const userInfo = localStorage.getItem('reLoginInfo');

async function reLogin() {
  const res = await http.post(`${env.VITE_HTTP_ORIGIN}/certification/re-login`, { ...userInfo, password: password.value })
    .catch(() => {
      localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
      window.location.reload();
    });
  ok(res.data);
}

async function cancelLogin() {
  localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
  window.location.reload();
}
</script>
