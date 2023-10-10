<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebDashboardMgtPSelect 홈화면 개인설정 관리 (홈카드) - 홈카드 선택
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC의 메인 홈 화면에 나타낼 홈 카드들을 추가하는 영역
****************************************************************************************************
--->
<template>
  <div class="web-dashboard-mgt__select dashboard-select">
    <kw-scroll-area>
      <div class="dashboard-select__item-container">
        <div
          v-for="card of authCards"
          :key="card.homeCardId"
          :class="getClass(card)"
        >
          <div
            class="dashboard-select__item-content"
          >
            <q-img
              v-if="card.imgSrc"
              :src="card.imgSrc"
              :alt="card.homeCardName"
              style="width: 100%; height: 100%;"
              fit="contain"
              :ratio="16/9"
            />
            <span>
              {{ card.homeCardSizeTypeName }}
            </span>
          </div>

          <div class="dashboard-select__item-title">
            <span>
              {{ card.homeCardName }}
            </span>
            <kw-btn
              dense
              :label="$t('MSG_BTN_ADD')"
              :disable="isSelected(card)"
              @click="onClickAdd(card)"
            />
          </div>
        </div>
      </div>
    </kw-scroll-area>
  </div>
</template>

<script setup>
import { some } from 'lodash-es';

const props = defineProps({
  authCards: {
    type: Array,
    default: () => [],
  },
  userCards: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'update:userCards',
]);

const isSelected = ({ homeCardId }) => some(props.userCards, { homeCardId });
const getClass = (card) => ({
  'dashboard-select__item': true,
  'dashboard-select__item--selected': isSelected(card),
});

function onClickAdd(card) {
  emit(
    'update:userCards',
    [...props.userCards, card],
  );
}
</script>
