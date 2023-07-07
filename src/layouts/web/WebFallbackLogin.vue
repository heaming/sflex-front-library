<template>
  <div
    v-if="useBackdoorLogin"
    class="window-height row justify-center items-center bg-blue-grey-1"
  >
    <q-card
      style="min-width: 400px;"
      bordered
      flat
    >
      <kw-form @submit="onSubmit">
        <q-card-section>
          <kw-input
            model-value="admin.base"
            type="text"
            name="loginId"
            label="ID"
            rules="required"
            clearable
          />
          <br>
          <kw-input
            model-value="testtest"
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
import { alert } from '../../plugins/dialog';
import useSession from '../../composables/useSession';
import env from '../../consts/private/env';

export default {
  name: 'WebFallbackLogin',
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
    let useBackdoorLogin = !env.VITE_LOGIN_URL || env.DEV || env.MODE === 'dev' || env.LOCAL;
    axios.get(env.VITE_SSO_HEALTH_CHECK_URL).then((res) => {
      if (!res?.data) {
        useBackdoorLogin = true;
      }
    }).catch(() => {
      console.log('sso 에러로 백도어페이지 보여줌.');
      // 에러일 경우는 true
      useBackdoorLogin = true;
    });
    const tenantId = toRaw(props.tenantId);
    const portalId = toRaw(props.portalId);

    const { login } = useSession();

    async function onSubmit(formValues) {
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
