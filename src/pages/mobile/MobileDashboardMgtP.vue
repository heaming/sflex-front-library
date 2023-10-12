<template>
  <kw-popup
    class="mobile-dashboard-mgt"
    size="4xl"
    :title="$t('MSG_TIT_HOME_MGT')"
    @before-close="onBeforeClose"
  >
    <div class="mobile-dashboard-mgt__inner">
      <mobile-dashboard-mgt-p-select
        v-model:user-cards="userCards"
        :auth-cards="authCards"
      />
      <mobile-dashboard-mgt-p-drag
        ref="dragRef"
        v-model:user-cards="userCards"
      />
    </div>

    <template #action>
      <kw-btn
        negative
        :label="$t('MSG_BTN_INTL')"
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
import { cloneDeep, isEqual } from 'lodash-es';
import { http } from '../../plugins/http';
import { alert, confirm } from '../../plugins/dialog';
import { notify } from '../../plugins/notify';
import useModal from '../../composables/useModal';
import useMeta from '../../composables/useMeta';

import MobileDashboardMgtPSelect from './MobileDashboardMgtPSelect.vue';
import MobileDashboardMgtPDrag from './MobileDashboardMgtPDrag.vue';

const { t } = useI18n();
const { ok } = useModal();

const dragRef = ref();

let initialUserCards;
const userCards = shallowRef([]);
const authCards = shallowRef([]);

const { getUserInfo } = useMeta();
const userInfo = computed(() => getUserInfo());

const shouldAddKportalComponent = computed(() => {
  if (userInfo.value.tenantId === 'TNT_EDU' && userInfo.value.baseRleCd?.startsWith('E')) return 'EDU';
  if (userInfo.value.tenantId === 'TNT_WELLS' && userInfo.value.baseRleCd?.startsWith('W2')) return 'WELLS';
  if (userInfo.value.tenantId === 'TNT_WELLS' && !userInfo.value.baseRleCd?.startsWith('W2') && userInfo.value.baseRleCd?.startsWith('W')) return 'WELLS';
  return null;
});

function filterCard(cards) {
  if (!cards || cards.length < 1) return cards;
  if (shouldAddKportalComponent.value === 'WELLS') {
    const newCards = cards.filter((x) => x.pageId !== 'HCD_EDU_MATERIALS');
    return newCards;
  }
  if (!shouldAddKportalComponent.value) {
    const newCards = cards.filter((x) => x.pageId !== 'HCD_EDU_MATERIALS' && x.pageId !== 'HCD_NOTICE');
    return newCards;
  }

  return cards;
}

async function fetchAuthCards() {
  const response = await http.get('/sflex/common/common/user-homecards/auth');
  const filteredCards = filterCard(response.data);
  authCards.value = filteredCards;
}

async function fetchUserCards() {
  const response = await http.get('/sflex/common/common/user-homecards');

  userCards.value = response.data.sort((a, b) => (a.rowPosition === b.rowPosition
    ? (a.columnPosition - b.columnPosition) : (a.rowPosition - b.rowPosition)));

  initialUserCards = cloneDeep(userCards.value);
}

await Promise.all([
  fetchAuthCards(),
  fetchUserCards(),
]);

function onBeforeClose(result) {
  return result
    || isEqual(userCards.value, initialUserCards)
    || confirm(t('MSG_ALT_CHG_CNTN'));
}

async function onClickReset() {
  if (await confirm(t('MSG_ALT_WANT_RESET'))) {
    userCards.value = cloneDeep(initialUserCards);
  }
}

async function onClickSave() {
  if (isEqual(userCards.value, initialUserCards)) {
    await alert(t('MSG_ALT_NO_CHG_CNTN'));
    return;
  }

  const saveUserCards = dragRef.value.getSaveUserCards();
  await http.post('/sflex/common/common/user-homecards', saveUserCards);

  ok();
  notify(t('MSG_ALT_SAVE_DATA'));
}

</script>
