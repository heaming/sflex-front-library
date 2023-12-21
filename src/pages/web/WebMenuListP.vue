<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebMenuListP
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC 화면에서 메뉴들을 검색할 때 검색 결과를 보여주는 모달
****************************************************************************************************
--->
<template>
  <kw-popup
    title="메뉴찾기"
    size="md"
  >
    <div class="sticky-area">
      <kw-input
        v-model="inputText"
        icon="search"
        :on-click-icon="onClickSearch"
      />
      <div class="row items-center mt8 h32">
        <kw-checkbox
          v-model="reSearchInResult"
          :true-value="true"
          :false-value="false"
          label="결과 내 재검색"
        />
        <div
          class="row items-center ml20 recent-keywords__chips"
        >
          <kw-chip
            v-for="(reSearchText, reIdx) in reSearchTexts"
            v-show="reSearchInResult"
            :key="reIdx"
            class="blue-chip"
            removable
            @remove="onClickDeleteReSearchText(reIdx)"
          >
            {{ reSearchText }}
          </kw-chip>
        </div>
      </div>
    </div>
    <div class="row items-center">
      <p class="text-weight-medium">
        최근 메뉴명 검색어
        <span>(<span class="kw-fc--primary">{{ recentKeywords.length }}</span>건)</span>
      </p>
      <kw-icon
        :tooltip="t('MSG_TXT_RECENT_MENU_SRCH_TOOLTIP')"
        name="info"
        class="ml4 kw-font-pt16"
      />
    </div>
    <div class="recent-keywords">
      <div
        v-if="recentKeywords.length"
        class="recent-keywords__chips"
      >
        <kw-chip
          v-for="(recentKeyword, rcntIdx) in recentKeywords"
          :key="rcntIdx"
          class="blue-chip"
          clickable
          removable
          @click="onClickRecentKeyword(recentKeyword)"
          @remove="onClickDeleteRecentKeyword(recentKeyword, rcntIdx)"
        >
          {{ recentKeyword }}
        </kw-chip>
      </div>
      <div
        v-else
        class="recent-keywords__placeholder"
      >
        <p>최근 검색하신 메뉴명이 없습니다</p>
      </div>
    </div>
    <p class="kw-font-pt18 text-weight-medium mt30">
      '<span class="kw-fc--primary">{{ reSearchTexts.join(', ') }}</span>' 검색결과
      총 <span class="kw-fc--primary">{{ totalMenuCount }}</span>건
    </p>
    <div class="result-section">
      <div
        v-if="totalMenuCount"
        class="result-section__results"
      >
        <div
          class="result-section__sort-area"
        >
          <kw-btn-toggle
            ref="btnToggle"
            v-model="currentMenuKey"
            class="result-section__depth-btns"
            :class="{'show-more': showMore}"
            :options="menuGroups"
            option-value="value"
            option-label="label"
            gap="8px"
          />
          <kw-btn
            v-if="showBtnToggle"
            :icon-right="showMore ? 'arrow_up' : 'arrow_down'"
            dense
            borderless
            label="더보기"
            class="kw-fc--black3 kw-font-pt14 self-start h32"
            @click="(val) => showMore = !showMore"
          />
        </div>
        <kw-list
          item-padding="10px 0"
          class="py10"
        >
          <kw-item
            v-for="(filteredMenu, menuKey) in filteredMenus"
            :key="menuKey"
          >
            <kw-item-section
              side
              top
              class="w120 mr12 pr0"
            >
              <kw-item-label
                font="body"
                font-weight="500"
              >
                {{ filteredMenu.menuName }}
                (<span class="kw-fc--primary">{{ filteredMenu.childCount }}</span>건)
              </kw-item-label>
            </kw-item-section>
            <kw-item-section center>
              <ul class="depth-list">
                <template
                  v-for="(childMenu, childIdx) in filteredMenu.children"
                  :key="childIdx"
                >
                  <li
                    v-for="(menu, menuIdx) in childMenu.children"
                    :key="menuIdx"
                    class="depth-list__item"
                  >
                    <div class="bread-crumb">
                      <p class="bread-crumb__depth disable">
                        {{ menu.applicationName }}
                      </p>
                      <p class="bread-crumb__depth disable">
                        {{ menu.parentsMenuName }}
                      </p>
                      <!-- eslint-disable vue/no-v-html -->
                      <a
                        href="javascript:;"
                        class="bread-crumb__depth"
                        :style="menu.hasRole ? 'color: #dedede;cursor: default;' : ''"
                        @click="moveToMenu(menu)"
                        v-html="sanitize(getHighlightedMenuName(menu.menuName))"
                      />
                      <!-- eslint-enable vue/no-v-html -->
                    </div>
                    <kw-checkbox
                      v-if="menu.menuUid && menu.pageId && menu.hasRole"
                      :model-value="isBookmarkedPage(menu.menuUid, menu.pageId)"
                      :true-value="true"
                      :false-value="false"
                      class="ml4"
                      checked-icon="bookmark_on"
                      unchecked-icon="bookmark_outline"
                      @update:model-value="(val) => updateBookmark(val, menu)"
                    >
                      <kw-tooltip>
                        {{ $t('MSG_TXT_BKMK', null, '즐겨찾기') }}
                      </kw-tooltip>
                    </kw-checkbox>
                  </li>
                </template>
              </ul>
            </kw-item-section>
          </kw-item>
        </kw-list>
      </div>
      <div
        v-else
        class="result-section__placeholder"
      >
        <kw-avatar
          size="60px"
          font-size="28px"
          color="line-bg"
          text-color="primary"
          icon="visual_search"
        />
        <p class="mt16 text-center full-width">
          메뉴명 검색결과가 없습니다.<br>
          다시 입력해 주세요.
        </p>
      </div>
    </div>
  </kw-popup>
</template>
<script setup>
import { cloneDeep, indexOf } from 'lodash-es';
import useModal from '../../composables/useModal';
import useGlobal from '../../composables/useGlobal';
import { localStorage } from '../../plugins/storage';
import { sanitize } from '../../plugins/sanitize';
import consts from '../../consts';
import { http } from '../../plugins/http';
import { escapeSpecialCharacters } from '../../utils/string';

const { t } = useI18n();

const { getters, dispatch } = useStore();
const { ok } = useModal();
const { alert, notify } = useGlobal();

const menus = getters['meta/getTotalMenus'];
const apps = readonly(getters['meta/getApps']);

const props = defineProps({
  searchText: { type: String, default: null },
});

const inputText = ref('');
const currInputText = ref('');
const reSearchTexts = ref([]);
if (props.searchText) inputText.value = cloneDeep(props.searchText);

const groupedMenus = ref([]);
const filteredMenus = ref([]);
const recentKeywords = ref([]);
const reSearchInResult = ref(false);
const currentMenuKey = ref('');
const totalMenuCount = ref(10);
const btnToggle = ref();

const showBtnToggle = ref(false);

const showMore = ref(false);
const menuGroups = ref([]);

async function validate(text) {
  if (text.trim().length < 2) {
    await alert('2글자 이상 입력해 주세요.');
    return false;
  }
  if (reSearchInResult.value && reSearchTexts.value.length >= 2) {
    await alert('최대 2회까지 검색 가능합니다.');
    return false;
  }

  return true;
}

function defineShowBtnToggle() {
  if (btnToggle.value?.el?.firstChild?.clientHeight > 32) showBtnToggle.value = true;
  else showBtnToggle.value = false;
}

function getRecentKeywords() {
  const localStorageData = localStorage.getItem(consts.LOCAL_STORAGE_RECENT_KEYWORD);
  recentKeywords.value = cloneDeep(localStorageData.slice(0, 20));
}

function addRecentKeyword() {
  const localStorageData = localStorage.getItem(consts.LOCAL_STORAGE_RECENT_KEYWORD);
  let keywords = [];
  if (localStorageData) {
    const keywordIndex = localStorageData.findIndex((x) => x === inputText.value);
    if (keywordIndex >= 0) localStorageData.splice(keywordIndex, 1);
    localStorageData.unshift(inputText.value);
    keywords = cloneDeep(localStorageData);
  } else keywords.unshift(inputText.value);
  localStorage.set(consts.LOCAL_STORAGE_RECENT_KEYWORD, keywords);
}

function getTotalCount(arr) {
  let count = 0;
  arr.forEach((x) => {
    x.childCount = 0;
    x.children.forEach((m) => {
      count += m.children.length;
      x.childCount += m.children.length;
    });
  });
  return count;
}

function filterMenus() {
  if (currentMenuKey.value.trim().length) {
    filteredMenus.value = cloneDeep(groupedMenus.value.filter((grpMenu) => grpMenu.menuName === currentMenuKey.value));
  } else filteredMenus.value = cloneDeep(groupedMenus.value);
}

function afterSearch(arr) {
  totalMenuCount.value = getTotalCount(arr);
  filterMenus();
}

function beforeSearch() {
  if (reSearchTexts.value.find((x) => x === inputText.value)) return;
  if (!reSearchInResult.value) reSearchTexts.value = [];
  reSearchTexts.value.push(inputText.value);

  currInputText.value = inputText.value;
  currentMenuKey.value = '';
}

function setMenuGroups() {
  const keys = filteredMenus.value.map((menu) => menu.menuName);
  const mapped = keys.map((key) => ({
    label: key, value: key,
  }));
  mapped.unshift({ label: '전체', value: '' });
  menuGroups.value = cloneDeep(mapped);
}

function createHierarchyData(appMenus, key) {
  return appMenus
    .filter((v) => {
      if (key !== 'ROOT') return key.endsWith(v.parentsMenuUid) && reSearchTexts.value.every((text) => v.menuName.toLowerCase().replace(/\s/g, '').indexOf(text.toLowerCase().replace(/\s/g, '')) >= 0);
      return v.menuLevel === 0;
    })
    .reduce((a, v) => {
      v.key = `${key}.${v.menuUid}`;
      v.children = createHierarchyData(appMenus, v.key);
      a.push(v); return a;
    }, []);
}

async function fetchMenus(reFetch = false) {
  const arr = [];
  apps.forEach((app) => {
    const appMenus = menus.data.filter((v) => v.applicationId === app.applicationId);
    const hierarchyData = {
      key: 'ROOT',
      portalId: app.portalId,
      applicationId: app.applicationId,
      menuLevel: -1,
      menuName: app.applicationName,
      folderYn: 'Y',
      children: createHierarchyData(appMenus, 'ROOT'),
    };
    arr.push(cloneDeep(hierarchyData));
  });
  getTotalCount(arr);
  groupedMenus.value = cloneDeep(arr.filter((x) => x.childCount > 0));

  afterSearch(groupedMenus.value);
  if (!reFetch) {
    addRecentKeyword();
    getRecentKeywords();
  }
  setMenuGroups();
}

watch(currentMenuKey, () => {
  filterMenus();
});

function getHighlightedMenuName(menuName) {
  let highlightedMenuName = menuName;
  reSearchTexts.value.forEach((text) => {
    const withoutSpaceText = text.replace(/\s/g, '');
    const withoutSpace = highlightedMenuName.replace(/\s/g, '');

    const isExist = withoutSpace.indexOf(withoutSpaceText);
    if (isExist >= 0) {
      const startIndex = highlightedMenuName.indexOf(text.substr(0, 1));
      const endIndex = highlightedMenuName.lastIndexOf(text.substr(-1));
      let newStartIndex;
      let newEndIndex;
      let testString;
      let flag = false;
      for (let i = startIndex; i < highlightedMenuName.length; i += 1) {
        for (let j = endIndex + 1; j >= i; j -= 1) {
          testString = highlightedMenuName.substring(i, j);
          testString = testString.replace(/\s/g, '');
          if (testString === withoutSpaceText) {
            newStartIndex = i;
            newEndIndex = j;
            flag = true;
            break;
          }
        }
        if (flag) break;
      }
      let target = highlightedMenuName.substring(newStartIndex, newEndIndex);

      target = escapeSpecialCharacters(target);

      const regExp = new RegExp(target, 'gi');
      const matched = highlightedMenuName.match(regExp);

      highlightedMenuName = highlightedMenuName.replace(regExp, `<span class="kw-fc--primary">${matched[0]}</span>`);
    }
  });
  return highlightedMenuName;
}

function onClickDeleteRecentKeyword(keyword, fromIndex) {
  const index = indexOf(recentKeywords.value, keyword, fromIndex);
  const localStorageData = localStorage.getItem(consts.LOCAL_STORAGE_RECENT_KEYWORD);
  localStorageData.splice(index, 1);
  localStorage.set(consts.LOCAL_STORAGE_RECENT_KEYWORD, localStorageData);
  getRecentKeywords();
}

async function onClickRecentKeyword(keyword) {
  reSearchInResult.value = false;
  inputText.value = keyword;
  if (!await validate(keyword)) return;
  beforeSearch();
  fetchMenus();
}

function moveToMenu(menu) {
  if (menu.hasRole) {
    ok(menu);
  } else {
    alert(t('MSG_ALT_NO_AUTH'));
  }
}

async function onClickSearch() {
  if (!await validate(inputText.value)) return;

  beforeSearch();
  await fetchMenus(reSearchInResult.value);
  defineShowBtnToggle();
}

function onClickDeleteReSearchText(index) {
  if (reSearchTexts.value.length >= 2) {
    reSearchTexts.value.splice(index, 1);
    reSearchInResult.value = false;
    inputText.value = reSearchTexts.value[0];
    onClickSearch();
  }
}

const isBookmarkedPage = computed(() => (
  (menuUid, pageId) => getters['meta/isBookmarked'](menuUid, pageId)
));

async function createBookmark(menu) {
  const { menuUid, pageId, menuName: bookmarkName } = menu;
  await http.post('/sflex/common/common/bookmarks', { menuUid, pageId, bookmarkName });
  await dispatch('meta/fetchBookmarks');
}

async function deleteBookmark(menu) {
  const { menuUid, pageId } = menu;
  const params = { menuUid, pageId };
  await http.delete('/sflex/common/common/bookmarks', { params });
  await dispatch('meta/fetchBookmarks');
}

const isAuthenticated = getters['meta/isAuthenticated'];

async function updateBookmark(isCreate, menu) {
  if (isAuthenticated) {
    if (isCreate) {
      await createBookmark(menu);
      notify(`${menu.menuName}이 즐겨찾기에 추가되었습니다.`);
    } else {
      await deleteBookmark(menu);
      notify(`${menu.menuName}이 즐겨찾기에서 해제되었습니다.`);
    }
  }
}

onMounted(async () => {
  beforeSearch();
  await fetchMenus();
  defineShowBtnToggle();
});

</script>
