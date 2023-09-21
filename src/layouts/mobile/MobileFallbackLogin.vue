<template>
  <div
    v-if="useBackdoorLogin"
    class="window-height row justify-center items-center bg-blue-grey-1"
  >
    <q-card
      style="width: 320px; padding: 20px 40px 30px;"
      bordered
      flat
    >
      <kw-form @submit="onSubmit">
        <q-card-section>
          <kw-input
            model-value=""
            type="text"
            name="loginId"
            label="ID"
            rules="required"
            clearable
          />
          <br>
          <kw-input
            model-value=""
            type="password"
            name="password"
            label="Password"
            rules="required"
            clearable
          />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            color="primary"
            class="full-width"
            size="lg"
            unelevated
            label="Login"
          />
        </q-card-actions>
      </kw-form>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { alert } from '../../plugins/dialog';
import useSession from '../../composables/useSession';
import env from '../../consts/private/env';
import consts from '../../consts';

export default {
  name: 'MobileFallbackLogin',
  props: {
    tenantId: {
      type: String,
      default: undefined,
    },
    portalId: {
      type: String,
      default: undefined,
    },
  },

  setup(props) {
    const useBackdoorLogin = ref(!env.VITE_LOGIN_URL || env.LOCAL);

    axios.get(`${env.VITE_SSO_HEALTH_CHECK_URL}`).then((res) => {
      if (!res?.data) {
        useBackdoorLogin.value = true;
      }
    }).catch(() => {
      console.log('sso 에러로 백도어페이지 보여줌.');
      // 에러일 경우는 true
      useBackdoorLogin.value = true;
    });
    const tenantId = toRaw(props.tenantId);
    const portalId = toRaw(props.portalId);

    const { login } = useSession();

    async function onSubmit(formValues) {
      const iv = CryptoJS.enc.Hex.parse('');
      const key = CryptoJS.enc.Utf8.parse(consts.CRYPT_AES_ENC_KEY);
      const cipher = CryptoJS.AES.encrypt(formValues.password, key, { iv });
      formValues.password = cipher.toString();
      try {
        await login({
          tenantId,
          portalId,
          ...formValues,
        });
      } catch (e) {
        if (e.response) {
          const errorMessage = e.response.data;
          await alert(errorMessage);
        }
      }
    }

    return {
      onSubmit,
      useBackdoorLogin,
    };
  },
};

</script>
