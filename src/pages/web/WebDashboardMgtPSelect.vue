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
            :style="card.imgSrc ? `background: url('${card.imgSrc}') no-repeat center!important;` : ''"
          >
            <!-- <span>
              {{ card.homeCardSizeTypeName }}
            </span> -->
          </div>

          <div class="dashboard-select__item-title">
            <span>
              {{ card.homeCardName + ` (${card.homeCardSizeTypeName})` }}
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
