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
import { alert } from '../../plugins/dialog';
import useSession from '../../composables/useSession';
import env from '../../consts/private/env';

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
    // VITE_LOGIN_URL 이 있고, healthCheck 해서 결과가 안좋으면 backdoorLogin 사용.
    const useBackdoorLogin = !env.VITE_LOGIN_URL;
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
