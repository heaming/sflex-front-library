<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebDashboardMgtPDrag 홈화면 개인설정 관리 (홈카드) - 홈카드 정렬
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC의 메인 홈 화면에 나타낼 홈 카드들의 레이아웃을 설정하는 영역
****************************************************************************************************
--->
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
            name="close_24"
            size="24px"
            clickable
            @click.stop="onClickDelete(card)"
          />
          <img
            v-if="card.imgSrc"
            :src="card.imgSrc"
            :alt="card.homeCardName"
            style="width: 100%; height: 100%;"
          >
        </div>
      </transition-group>
      <div class="dashboard-drag__guide">
        {{ $t('MSG_TXT_HCARD_GUIDE') }}
      </div>
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
const getStyle = (card) => {
  const sizeTypeCodeSplited = card.homeCardSizeTypeCode.split('');
  const [column, row] = sizeTypeCodeSplited.map((e) => parseInt(e, 10));
  return {
    width: `${302 * column + 20 * (column - 1)}px`,
    height: `${251 * row + 20 * (row - 1)}px`,
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
