<template>
  <kw-popup
    title="로그인 연장"
    no-close-btn
  >
    <!-- rev:230626 no-close-btn 추가 -->
    <div class="pa20 pb40">
      <ul class="kw-notification">
        <li>
          안전한 서비스 이용을 위하여 30분동안 사용이 없으실 경우
          비밀번호 재입력 후 이용이 가능합니다.
        </li>
      </ul>
      <kw-input
        v-model="password"
        type="password"
        name="password"
        label="비밀번호 재입력"
        rules="required"
        clearable
        class="pt20"
        @keydown.enter="reLogin"
      />
    </div>

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
import { http } from '../../plugins/http';
import env from '../../consts/private/env';
import useModal from '../../composables/useModal';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';

const { ok } = useModal();
const password = ref('');

const userInfo = localStorage.getItem('reLoginInfo');

console.log(userInfo);

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
