<template>
  <kw-popup
    class="kw-popup--sm "
    title="비밀번호 확인"
  >
    <kw-form
      :cols="1"
    >
      <kw-form-row>
        <template v-if="!$g.platform.is.mobile">
          <kw-form-item
            :label="$t('MSG_TXT_CURRENT_PW')"
          >
            <kw-input
              v-model="passwordInfo.password"
              type="password"
              name="password"
              :label="$t('MSG_TXT_CURRENT_PW')"
              rules="required"
              clearable
            />
          </kw-form-item>
        </template>
        <template v-else>
          <kw-input
            v-model="passwordInfo.password"
            type="password"
            name="password"
            :label="$t('MSG_TXT_CURRENT_PW')"
            rules="required"
            clearable
          />
        </template>
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
        label="확인"
        @click="onClickConfirm"
      />
    </template>
  </kw-popup>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { isEmpty } from 'lodash-es';
import CryptoJS from 'crypto-js';
import { http } from '../../plugins/http';
import useModal from '../../composables/useModal';
import { alert } from '../../plugins/dialog';
import consts from '../../consts';

const { ok, cancel } = useModal();
const { t } = useI18n();

const passwordInfo = ref({
  password: '',
});

async function onClickConfirm() {
  if (isEmpty(passwordInfo.value.password)) {
    alert(t('MSG_TXT_CURR_PW_REQ'));
    return;
  }

  const iv = CryptoJS.enc.Hex.parse('');
  const key = CryptoJS.enc.Utf8.parse(consts.CRYPT_AES_ENC_KEY);
  const cipher = CryptoJS.AES.encrypt(passwordInfo.value.password, key, { iv });
  const params = { password: cipher.toString() };
  const res = await http.post('/sflex/common/common/password/check', { ...params });
  if (res) {
    ok();
  }
}

</script>
