<template>
  <kw-popup
    class="web-dashboard-mgt"
    size="4xl"
    :title="$t('MSG_TIT_HOME_MGT')"
  >
    <div class="web-dashboard-mgt__inner">
      <div class="web-dashboard-mgt__select dashboard-select">
        <kw-scroll-area>
          <div class="dashboard-select__item-container">
            <div
              v-for="card of homeCards"
              :key="card.homeCardId"
              class="dashboard-select__item"
            >
              <div class="dashboard-select__item-content">
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
                  @click="onClickAdd(card)"
                />
              </div>
            </div>
          </div>
        </kw-scroll-area>
      </div>

      <div class="web-dashboard-mgt__drag dashboard-drag">
        <kw-scroll-area>
          <div
            ref="dashboardContainerRef"
            class="dashboard-drag__item-container"
          >
            <div
              v-for="card of dashboardCards"
              :key="card.homeCardId"
              class="dashboard-drag__item"
              :style="getDashboardCardStyle(card)"
              :data-key="card.homeCardId"
              :data-row="card.rowPosition"
              :data-col="card.columnPosition"
            >
              <kw-icon
                name="close"
                clickable
              />
              {{ card.homeCardName }}
            </div>
          </div>
        </kw-scroll-area>

        <div class="dashboard-drag__guide">
          점선 위로 한 화면에서 스크롤없이 볼 수 있습니다.
        </div>
      </div>
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
import Sortable from 'sortablejs';
import { cloneDeep } from 'lodash-es';
import { http } from '../../plugins/http';
import { confirm } from '../../plugins/dialog';

const { t } = useI18n();

const dashboardContainerRef = ref();
const homeCards = shallowRef([]);
const userCards = shallowRef([]);
let initialUserCards;

const sizeTypes = computed(() => homeCards.value.reduce((a, e) => {
  const k = e.homeCardSizeTypeCode;
  a[k] ||= k.split('').map((v) => parseInt(v, 10));
  return a;
}, {}));

const dashboardCards = computed(() => {
  const normalized = [];
  const checkedPositions = {};
  const currentPosition = [0, 0];

  const isPlaceable = (e) => {
    const size = sizeTypes.value[e.homeCardSizeTypeCode];
    const checked = {};

    for (let i = 0; i < size[0]; i += 1) {
      for (let j = 0; j < size[1]; j += 1) {
        const x = currentPosition[0] + i;
        const y = currentPosition[1] + j;
        const z = `${x}${y}`;

        if (y >= 4 || checkedPositions[z] === true) {
          return false;
        }

        checked[z] = true;
      }
    }

    Object.assign(checkedPositions, checked);

    return true;
  };

  userCards.value.forEach((e) => {
    while (isPlaceable(e) === false) {
      currentPosition[1] += 1;

      if (currentPosition[1] >= 4) {
        currentPosition[0] += 1;
        currentPosition[1] = 0;
      }
    }

    const rowPosition = currentPosition[0] + 1;
    const columnPosition = currentPosition[1] + 1;

    normalized.push({
      ...e,
      rowPosition,
      columnPosition,
    });
  });

  return normalized;
});

const getDashboardCardStyle = (card) => {
  const size = sizeTypes.value[card.homeCardSizeTypeCode];
  const gridRow = `${card.rowPosition} / span ${size[0]}`;
  const gridColumn = `${card.columnPosition} / span ${size[1]}`;
  return { gridRow, gridColumn };
};

async function fetchHomeCards() {
  const response = await http.get('/sflex/common/common/user-homecards/auth');
  homeCards.value = response.data;
}

async function fetchUserCards() {
  const response = await http.get('/sflex/common/common/user-homecards');
  userCards.value = response.data;
  initialUserCards = cloneDeep(userCards.value);
}

await Promise.all([
  fetchHomeCards(),
  fetchUserCards(),
]);

let sortableInstance;
function destroySortable() {
  sortableInstance?.destroy();
  sortableInstance = undefined;
}

function createSortable() {
  destroySortable();

  const el = dashboardContainerRef.value;
  sortableInstance = new Sortable(el, {
    swapThreshold: 0.5,
    animation: 150,

    onMove() {

    },

    onEnd() {
      //
    },
  });
}

onMounted(() => {
  watch(dashboardCards, async () => {
    await nextTick();
    createSortable();
  }, { immediate: true });
});

onBeforeUnmount(() => {
  destroySortable();
});

function onClickAdd(card) {
  userCards.value = [
    ...userCards.value, { ...card },
  ];
}

async function onClickReset() {
  if (await confirm(t('MSG_ALT_WANT_RESET'))) {
    userCards.value = cloneDeep(initialUserCards);
  }
}

async function onClickSave() {
  //
}

</script>
