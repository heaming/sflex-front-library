<template>
  <div class="window-height row justify-center items-center bg-blue-grey-1">
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

<script setup>
import { useSession, alert } from '~kw-lib';

const { login } = useSession();
const { locale } = useI18n();

async function onSubmit(formValues) {
  try {
    await login({
      tenantId: 'TNT_BASE',
      portalId: 'WEB_ADM',
      languageId: locale.value,
      ...formValues,
    });
  } catch (e) {
    if (e.response) {
      const errorMessage = e.response.data;
      await alert(errorMessage);
    }
  }
}
</script>
