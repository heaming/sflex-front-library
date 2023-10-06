<template>
  <div class="mobile-dashboard-mgt__drag dashboard-drag">
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
          class="dashboard-drag__item"
        >
          {{ card.homeCardName }}
          <kw-icon
            name="close_24"
            size="24px"
            clickable
            @click.stop="onClickDelete(card)"
          />
        </div>
      </transition-group>
    </kw-scroll-area>
  </div>
</template>

<script setup>
import { find, findIndex } from 'lodash-es';
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
      const children = [...el.children];
      const keys = children.map((e) => e.getAttribute('data-key'));
      const nUserCards = keys.map((homeCardId) => find(props.userCards, { homeCardId }));
      emit('update:userCards', nUserCards);
    },
  });
});

onBeforeUnmount(() => {
  sortable?.destroy();
  sortable = undefined;
});

defineExpose({
  getSaveUserCards() {
    const el = containerRef.value.$el;
    const children = [...el.children];

    const computedStyle = getComputedStyle(el);
    const rowGap = parseInt(computedStyle.rowGap, 10);
    const rowHeight = parseInt(computedStyle.gridTemplateRows, 10);
    const columnGap = parseInt(computedStyle.columnGap, 10);
    const columnWidth = parseInt(computedStyle.gridTemplateColumns, 10);

    const {
      x: baseX,
      y: baseY,
    } = el.getBoundingClientRect();

    return children.map((e) => {
      const homeCardId = e.getAttribute('data-key');
      const { x, y } = e.getBoundingClientRect();
      const rowPosition = Math.round((y - baseY) / (rowHeight + rowGap)) + 1;
      const columnPosition = Math.round((x - baseX) / (columnWidth + columnGap)) + 1;

      return {
        homeCardId,
        rowPosition,
        columnPosition,
      };
    });
  },
});
</script>
