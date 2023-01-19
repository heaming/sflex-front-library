<template>
  <div class="web-dashboard-mgt__drag dashboard-drag">
    <kw-scroll-area>
      <transition-group
        ref="containerRef"
        class="dashboard-drag__item-container"
        tag="div"
        name="dashboard-drag__item-"
      >
        <div
          v-for="card of userCards"
          :key="card.homeCardId"
          :data-key="card.homeCardId"
          :style="getStyle(card)"
          class="dashboard-drag__item"
        >
          <kw-icon
            name="close"
            clickable
            @click.stop="onClickDelete(card)"
          />
          {{ card.homeCardName }}
        </div>
      </transition-group>
    </kw-scroll-area>

    <div class="dashboard-drag__guide">
      점선 위로 한 화면에서 스크롤없이 볼 수 있습니다.
    </div>
  </div>
</template>

<script setup>
import { findIndex } from 'lodash-es';
import Sortable from 'sortablejs';

const props = defineProps({
  userCards: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'update:userCards',
]);

const containerRef = ref();
const getStyle = (card) => {
  const sizeTypeCodeSplited = card.homeCardSizeTypeCode.split('');
  const [row, column] = sizeTypeCodeSplited.map((e) => parseInt(e, 10));

  return {
    width: `${322 * column - 20}px`,
    height: `${322 * row - 20}px`,
    gridRow: `auto/span ${row}`,
    gridColumn: `auto/span ${column}`,
  };
};

function onClickDelete({ homeCardId }) {
  const copyUserCards = [...props.userCards];
  const i = findIndex(copyUserCards, { homeCardId });
  copyUserCards.splice(i, 1);
  emit('update:userCards', copyUserCards);
}

let sortable;
onMounted(() => {
  const el = containerRef.value.$el;

  sortable = new Sortable(el, {
    swapThreshold: 0.65,
    animation: 150,

    onEnd() {
      //
    },
  });
});

onBeforeUnmount(() => {
  sortable?.destroy();
  sortable = undefined;
});

</script>
