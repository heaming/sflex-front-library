<template>
  <kw-popup
    class="dialog-with__backdrop"
    size="md"
    title="세션이 잠금처리되었습니다. 재 로그인 해주세요 비번 testtest"
  >
    <kw-form
      ref="frmMainRef"
      :cols="1"
    >
      <kw-form-row>
        <kw-form-item label="비밀번호">
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
        primary
        :label="$t('로그인하기')"
        @click="reLogin"
      />
    </template>
  </kw-popup>
</template>

<script setup>
// eslint-disable-next-line import/no-cycle
import { http } from '../../plugins/http';
import env from '../../consts/private/env';
import useModal from '../../composables/useModal';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';

const { ok } = useModal();
const password = ref('');
const userInfo = localStorage.getItem('userInfo');
console.log(userInfo);
async function reLogin() {
  const res = await http.post(`${env.VITE_HTTP_ORIGIN}/certification/re-login`, { ...userInfo, password: password.value })
    .catch(() => {
      localStorage.remove(consts.LOCAL_STORAGE_ACCESS_TOKEN);
      window.location.reload();
    });
  ok(res.data);
}
</script>
