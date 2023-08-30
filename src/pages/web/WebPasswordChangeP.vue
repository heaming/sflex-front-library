<template>
  <kw-popup
    class="kw-popup--sm "
    title="비밀번호 변경"
  >
    <kw-form
      :cols="1"
    >
      <kw-form-row>
        <kw-form-item :label="$t('MSG_TXT_CURRENT_PW')">
          <kw-input
            v-model="passwordInfo.currentPassword"
            type="password"
            name="password"
            :label="$t('MSG_TXT_CURRENT_PW')"
            rules="required"
            clearable
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="$t('MSG_TXT_NEW_PW')">
          <kw-input
            v-model="passwordInfo.newPassword"
            type="password"
            name="password"
            :label="$t('MSG_TXT_NEW_PW')"
            :rules="validateNewPassword"
            clearable
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="$t('MSG_TXT_NEW_PW_CHECK')">
          <kw-input
            v-model="passwordInfo.newPasswordConfirm"
            type="password"
            name="password"
            :label="$t('MSG_TXT_NEW_PW_CHECK')"
            :rules="validateNewPasswordConfirm"
            clearable
          />
        </kw-form-item>
      </kw-form-row>
    </kw-form>

    <template #action>
      <kw-btn
        negative
        label="취소"
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
import { http } from '../../plugins/http';
import useModal from '../../composables/useModal';
import { alert } from '../../plugins/dialog';
import { validate } from '../../index';

const { ok } = useModal();
const { t } = useI18n();

const passwordPolicy = ref(null);

const passwordInfo = ref({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',

});

console.log(ok);

async function getPasswordPolicy() {
  const res = await http.get('/sflex/common/common/password/policy');
  console.log(res);
  passwordPolicy.value = res.data;
}
const validateNewPassword = async (val, options) => {
  const errors = [];
  errors.push(
    ...(await validate(val, 'required', options)).errors,
  );
  console.log(errors);

  console.log(passwordPolicy.value);
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
    errors.push('비번이 똑같아야지!');
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
    alert('비번이 똑같아야지!');
    return;
  }

  const res = await http.post('/sflex/common/common/password/change', { ...passwordInfo.value });
  if (res.result) {
    console.log(res.data);
  }
}

onMounted(async () => {
  getPasswordPolicy();
});

</script>
