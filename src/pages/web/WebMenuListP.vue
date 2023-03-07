<!-- eslint-disable vue/no-v-html -->
<template>
  <kw-popup
    title="메뉴찾기"
    size="xl"
  >
    <div class="row q-gutter-x-sm">
      <div class="column no-wrap col">
        <h3 class="mt0">
          <span class="kw-fc--primary">{{ `‘${props.searchText}’` }}</span>
          에 대한 검색결과 (총
          <span class="ml3">{{ mappedMenus.length }}</span>
          건)
        </h3>
        <kw-scroll-area
          visible
          min-height="300px"
          max-height="500px"
          class="border-box pa0 mt20"
        >
          <ul class="keyword-result">
            <li
              v-for="(menu, menuIndex) in mappedMenus"
              :key="menuIndex"
              class="keyword-result__item"
            >
              <p class="kw-fc--black3">
                {{ menu.parentsMenuPath }}&nbsp;
              </p>
              <p
                class="text-underline kw-fc--black1 cursor-pointer"
                @click="moveToMenu(menu)"
                v-html="sanitize(getHighlightedMenuName(menu.menuName))"
              />
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
              v-for="(keyword, keywordIndex) in recentKeywords"
              :key="keywordIndex"
              class="recent-search__item"
            >
              <p class="kw-fc--black1">
                {{ keyword }}
              </p>
              <kw-btn
                borderless
                dense
                icon="delete"
                :on-click="() => onClickDeleteRecentKeyword(keyword, keywordIndex)"
              />
            </li>
          </ul>
        </kw-scroll-area>
      </div>
    </div>
  </kw-popup>
</template>
<script setup>
import { useModal } from '~kw-lib';
import { cloneDeep, indexOf } from 'lodash-es';
import { localStorage } from '../../plugins/storage';
import { sanitize } from '../../plugins/sanitize';
import consts from '../../consts';

const { getters } = useStore();
const { ok } = useModal();

const menus = getters['meta/getMenus'];
const props = defineProps({
  searchText: { type: String, default: null },
});

const mappedMenus = ref([]);
const recentKeywords = ref([]);
const regExp = new RegExp(props.searchText, 'gi');

function getRecentKeywords() {
  const localStorageData = localStorage.getItem(consts.LOCAL_STORAGE_RECENT_KEYWORD);
  recentKeywords.value = cloneDeep(localStorageData);
}

async function getMenus() {
  const filteredMenus = cloneDeep(menus.filter((x) => {
    const isMatched = x.menuName.match(regExp);
    return isMatched !== null && x.menuLevel >= 1 && x.pageUseCode !== 'S';
  }));

  mappedMenus.value = filteredMenus.map((menu) => {
    const menuNameIndex = menu.menuPath.lastIndexOf(menu.menuName);
    const parentsMenuPath = menu.menuPath.slice(0, menuNameIndex);
    return { ...menu, parentsMenuPath };
  });

  getRecentKeywords();
}

function getHighlightedMenuName(menuName) {
  const highlightedMenuName = menuName.replace(regExp, `<span class="keyword-result__keyword">${props.searchText}</span>`);
  return highlightedMenuName;
}

function onClickDeleteRecentKeyword(keyword, fromIndex) {
  const index = indexOf(recentKeywords.value, keyword, fromIndex);
  const localStorageData = localStorage.getItem(consts.LOCAL_STORAGE_RECENT_KEYWORD);
  localStorageData.splice(index, 1);
  localStorage.set(consts.LOCAL_STORAGE_RECENT_KEYWORD, localStorageData);
  getRecentKeywords();
}

function moveToMenu(menu) {
  ok(menu);
}

onMounted(() => {
  getMenus();
});

</script>

<style lang="scss">
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
