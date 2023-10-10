<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebDashboardMgtP 홈화면 개인설정 관리 (홈카드)
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC의 메인 홈 화면에 나타낼 홈 카드들을 추가하고, 삭제하고, 위치를 수정하는 기능
- WebDashboardMgtPSelect (왼쪽 선택영역), WebDashboardMgtPDrag (오른쪽 위치조정 영역) 로 이루어져 있음
****************************************************************************************************
--->
<template>
  <kw-popup
    class="web-dashboard-mgt"
    size="4xl"
    :title="$t('MSG_TIT_HOME_MGT')"
    @before-close="onBeforeClose"
  >
    <div class="web-dashboard-mgt__inner">
      <web-dashboard-mgt-p-select
        v-model:user-cards="userCards"
        :auth-cards="authCards"
      />
      <web-dashboard-mgt-p-drag
        ref="dragRef"
        v-model:user-cards="userCards"
      />
    </div>

    <template #action>
      <kw-btn
        secondary
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
import WebDashboardMgtPSelect from './WebDashboardMgtPSelect.vue';
import WebDashboardMgtPDrag from './WebDashboardMgtPDrag.vue';

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
