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

    return children.map((e, i) => {
      const homeCardId = e.getAttribute('data-key');

      return {
        homeCardId,
        rowPosition: i + 1,
        columnPosition: 1,
      };
    });
  },
});
</script>
