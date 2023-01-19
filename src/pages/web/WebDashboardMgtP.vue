<template>
  <kw-popup
    class="web-dashboard-mgt"
    size="4xl"
    :title="$t('MSG_TIT_HOME_MGT')"
  >
    <div class="web-dashboard-mgt__inner">
      <web-dashboard-mgt-p-select
        v-model:user-cards="userCards"
        :auth-cards="authCards"
      />
      <web-dashboard-mgt-p-drag
        v-model:user-cards="userCards"
      />
    </div>

    <template #action>
      <kw-btn
        negative
        :label="$t('MSG_BTN_RESET')"
        @click="onClickReset"
      />
      <kw-btn
        primary
        :label="$t('MSG_BTN_SAVE')"
        @click="onClickSave"
      />
    </template>
  </kw-popup>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { http } from '../../plugins/http';
import { confirm } from '../../plugins/dialog';

import WebDashboardMgtPSelect from './WebDashboardMgtPSelect.vue';
import WebDashboardMgtPDrag from './WebDashboardMgtPDrag.vue';

const { t } = useI18n();

let initialUserCards;
const userCards = shallowRef([]);
const authCards = shallowRef([]);

async function fetchAuthCards() {
  const response = await http.get('/sflex/common/common/user-homecards/auth');
  authCards.value = response.data;
}

async function fetchUserCards() {
  const response = await http.get('/sflex/common/common/user-homecards');
  userCards.value = response.data;
  initialUserCards = cloneDeep(userCards.value);
}

await Promise.all([
  fetchAuthCards(),
  fetchUserCards(),
]);

async function onClickReset() {
  if (await confirm(t('MSG_ALT_WANT_RESET'))) {
    userCards.value = cloneDeep(initialUserCards);
  }
}

async function onClickSave() {
  //
}

</script>
