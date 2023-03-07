<template>
  <kw-popup
    title="메뉴찾기"
    size="xl"
  >
    <div class="row q-gutter-x-sm">
      <div class="column no-wrap col">
        <h3 class="mt0">
          <span class="kw-fc--primary">‘현황’</span>에 대한 검색결과 (총<span class="ml3">337</span>건)
        </h3>
        <kw-scroll-area
          visible
          min-height="300px"
          max-height="500px"
          class="border-box pa0 mt20"
        >
          <ul class="keyword-result">
            <li
              v-for="(menu, menuIndex) in filteredMenus"
              :key="menuIndex"
              class="keyword-result__item"
            >
              <p class="kw-fc--black3">
                {{ `${menu.menuPath.split(menu.menuName)[0]} ` }}
              </p>
              <p class="text-underline kw-fc--black1 cursor-pointer">
                법인(사업자) 고객
                <span class="keyword-result__keyword">현황</span>
              </p>
            </li>
          </ul>
        </kw-scroll-area>
      </div>
      <div class="w320 column no-wrap col">
        <h3 class="mt0">
          최근검색어
        </h3>
        <kw-scroll-area
          visible
          class="border-box pa0 mt20 kw-scroll-area--auto-height"
        >
          <ul class="recent-search">
            <li
              v-for="i in 20"
              :key="i"
              class="recent-search__item"
            >
              <p class="kw-fc--black1">
                계약
              </p>
              <kw-btn
                borderless
                dense
                icon="delete"
              />
            </li>
          </ul>
        </kw-scroll-area>
      </div>
    </div>
  </kw-popup>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';

const { getters } = useStore();
const menus = getters['meta/getMenus'];
const props = defineProps({
  searchText: { type: String, default: null },
});

const filteredMenus = ref([]);
const regExp = new RegExp(props.searchText, 'gi');

async function getMenus() {
  filteredMenus.value = cloneDeep(menus.filter((x) => {
    const isMatched = x.menuName.match(regExp);
    return isMatched !== null && x.menuLevel >= 1;
  }));
}

onMounted(() => {
  getMenus();
});

</script>

<style scoped lang="scss">
.keyword-result {
  padding: 20px;

  &__item {
    display: flex;
    height: 20px;

    p {
      font-size: 14px;
      line-height: 1.43;

      &.kw-fc--black1 {
        font-weight: 500;
      }
    }

    &:not(:first-child) {
      margin-top: 12px;
    }
  }

  &__keyword {
    color: #2f8af3;
  }
}

.recent-search {
  padding: 20px;

  &__item {
    display: flex;
    justify-content: space-between;
    height: 20px;

    &:not(:first-child) {
      margin-top: 12px;
    }
  }
}
</style>
