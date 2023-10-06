<template>
  <div class="mobile-dashboard-mgt__select dashboard-select">
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
