<template>
  <kw-popup title="비밀번호 변경">
    <div class="pa20">
      <kw-input
        v-model="passwordInfo.currentPassword"
        type="password"
        name="password"
        :label="$t('MSG_TXT_CURRENT_PW')"
        rules="required"
        clearable
      />
      <kw-input
        v-model="passwordInfo.newPassword"
        class="pt20 kw-field--required"
        type="password"
        name="password"
        :label="$t('MSG_TXT_NEW_PW')"
        :rules="validateNewPassword"
        clearable
      />
      <kw-input
        v-model="passwordInfo.newPasswordConfirm"
        class="pt20 kw-field--required"
        type="password"
        name="password"
        :label="$t('MSG_TXT_NEW_PW_CHECK')"
        :rules="validateNewPasswordConfirm"
        clearable
      />
    </div>
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
</template>
<script setup>
// eslint-disable-next-line import/no-cycle
import { useI18n } from 'vue-i18n';
import { isEmpty } from 'lodash-es';
import CryptoJS from 'crypto-js';
import { http } from '../../plugins/http';
import useModal from '../../composables/useModal';
import { alert } from '../../plugins/dialog';
import { notify } from '../../plugins/notify';
import { validate } from '../../index';
import consts from '../../consts';

const { ok, cancel } = useModal();
const { t } = useI18n();

const passwordPolicy = ref(null);

const passwordInfo = ref({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',

});

async function getPasswordPolicy() {
  const res = await http.get('/sflex/common/common/password/policy');
  passwordPolicy.value = res.data;
}
const validateNewPassword = async (val, options) => {
  const errors = [];
  errors.push(
    ...(await validate(val, 'required', options)).errors,
  );

  // 비밀번호 길이제한 체크
  if (passwordPolicy.value.pwSizeYn === 'Y') {
    if (Number(passwordPolicy.value.pwSizeMax) < Number(passwordInfo.value.newPassword)) {
      errors.push(`비밀번호 길이가 너무큽니다. ${passwordPolicy.value.pwSizeMax}자 이하 가능합니다.`);
    } if (Number(passwordPolicy.value.pwSizeMin) > Number(passwordInfo.value.newPassword)) {
      errors.push(`비밀번호 길이가 너무 작습니다. ${passwordPolicy.value.pwSizeMin}자 이상 가능합니다.`);
    }
  }
  return errors[0] || true;
};
const validateNewPasswordConfirm = async (val, options) => {
  const errors = [];
  errors.push(
    ...(await validate(val, 'required', options)).errors,
  );
  if (passwordInfo.value.newPassword !== passwordInfo.value.newPasswordConfirm) {
    errors.push('비밀번호를 다시 확인하세요.');
  }

  return errors[0] || true;
};
async function onClickConfirm() {
  // 현재 비번이 없을때
  if (isEmpty(passwordInfo.value.currentPassword)) {
    alert(t('MSG_TXT_CURR_PW_REQ'));
    return;
  } if (isEmpty(passwordInfo.value.newPassword) || isEmpty(passwordInfo.value.newPasswordConfirm)) {
    alert(t('MSG_ALT_INP_NEW_PW'));
    return;
  } if (passwordInfo.value.newPassword !== passwordInfo.value.newPasswordConfirm) {
    alert('비밀번호를 다시 확인하세요.');
    return;
  }

  const iv = CryptoJS.enc.Hex.parse('');
  const key = CryptoJS.enc.Utf8.parse(consts.CRYPT_AES_ENC_KEY);
  const currentPasswordCipher = CryptoJS.AES.encrypt(passwordInfo.value.currentPassword, key, { iv });
  const newPasswordCipher = CryptoJS.AES.encrypt(passwordInfo.value.newPassword, key, { iv });
  const newPasswordConfirmCipher = CryptoJS.AES.encrypt(passwordInfo.value.newPasswordConfirm, key, { iv });

  const encryptedPasswordInfo = {
    currentPassword: currentPasswordCipher.toString(),
    newPassword: newPasswordCipher.toString(),
    newPasswordConfirm: newPasswordConfirmCipher.toString(),
  };

  const res = await http.post('/sflex/common/common/password/change', { ...encryptedPasswordInfo });
  if (res) {
    ok();
    notify('비밀번호 변경이 완료되었습니다.');
  }
}

onMounted(async () => {
  getPasswordPolicy();
});

</script>
