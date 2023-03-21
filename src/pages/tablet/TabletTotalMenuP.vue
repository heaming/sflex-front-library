<template>
  <kw-popup
    title="태블릿 전체메뉴"
    no-header
    class="tablet"
    size="full"
  >
    <div
      id="gnb_menu_tablet"
      class="gnb_menu_tablet"
    >
      <div class="gnb_menu_tablet--header">
        <kw-btn
          borderless
          icon-right="arrow_right_24"
          style="font-size: 20px;"
          :label="`${userInfo.userName}님`"
          class="text-weight-bold"
        />
        <div>
          <kw-btn
            borderless
            icon="alert_off_24"
            style="font-size: 24px;"
            class="alert_on"
          /><!-- 아이콘명은 그대로 두고 알림이 있을 시 클래스 : alert_on, 없을 시 클래스 : alert_off -->
          <span>
            <kw-btn
              borderless
              icon="setting_24"
              style="font-size: 24px;"
              class="ml20"
            />
            <kw-menu
              class="mb10 w154 py8 px16"
              anchor="bottom left"
              self="top middle"
              :offset="[30, 5]"
            >
              <kw-btn
                borderless
                label="비밀번호 변경"
                class="block kw-font-pt14 mt2 mb2 pt2 pb2"
              />
              <kw-btn
                borderless
                label="개인 홈 설정"
                class="block kw-font-pt14 mt2 mb2 pt2 pb2"
              />
              <kw-btn
                borderless
                label="모바일프린터 초기화"
                class="block kw-font-pt14 mt2 mb2 pt2 pb2"
              />
              <kw-btn
                borderless
                label="공문조회"
                class="block kw-font-pt14 mt2 mb2 pt2 pb2"
              />
              <kw-btn
                borderless
                label="로그아웃"
                class="block kw-font-pt14 mt2 mb2 pt2 pb2"
              />
            </kw-menu>
          </span>
        </div>
      </div>
      <div class="gnb_menu_tablet--body">
        <nav class="gnb_menu_tablet--nav">
          <ul>
            <li
              v-for="(menu, menuIdx) in depth2Menus"
              :key="menuIdx"
              class="tablet-menu__nav-item"
            >
              <a
                :href="`menu__${menuIdx}`"
                @click="currIdx = menuIdx"
              >
                {{ menu.menuName }}
              </a>
            </li>
          </ul>
        </nav>
        <ul
          id="gnb_menu_tablet--ul-depth1"
          class="gnb_menu_tablet--ul-depth1"
        >
          <li
            v-for="(depth3Menu, menuIdx) in groupedDepth3Menus"
            :id="`menu__${menuIdx}`"
            :key="menuIdx"
          >
            <h2>
              {{ depth3Menu.parentMenuName }}
              <kw-btn
                v-if="depth3Menu.parentMenu === 'bookmarks'"
                dense
                :label="depth3Menu.editable ? '완료' : '편집'"
                style="font-size: 12px; padding: 0 8px;"
                class="h24"
                border-color="line-line"
                @click="onClickEditAndComplete(depth3Menu)"
              />
            </h2>
            <ul
              :ref="depth3Menu.editable !== undefined ? 'sortableUl' : 'nonSortableUl'"
              class="gnb_menu_tablet--ul-depth2"
              :class="{'sortable-menu': depth3Menu.editable !== undefined }"
            >
              <li
                v-for="(depth3SubMenu, subIdx) in depth3Menu.menus"
                :key="subIdx"
                :data-id="subIdx"
              >
                <a
                  href="#"
                  @click.prevent="moveToPage(depth3SubMenu)"
                >
                  {{ depth3SubMenu.menuName }}
                </a>
                <kw-checkbox
                  v-if="!depth3Menu.editable"
                  :model-value="isBookmarkedPage(depth3SubMenu.menuUid, depth3SubMenu.pageId)"
                  :true-value="true"
                  :false-value="false"
                  checked-icon="bookmark_on"
                  unchecked-icon="bookmark_off"
                  @update:model-value="(val) => updateBookmark(val, depth3SubMenu)"
                >
                  <kw-tooltip>
                    {{ $t('MSG_TXT_BKMK', null, '즐겨찾기') }}
                  </kw-tooltip>
                </kw-checkbox>
                <kw-btn
                  v-else
                  borderless
                  class="handle"
                  icon="menu_24"
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </kw-popup>
</template>

<script setup>
import { find, get, sortBy, cloneDeep } from 'lodash-es';
import chain from 'lodash/chain';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Sortable from 'sortablejs';
import { http } from '../../plugins/http';
import useHeaderApp from '../../composables/private/useHeaderApp';
import useMeta from '../../composables/useMeta';
import useModal from '../../composables/useModal';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const userInfo = useMeta().getUserInfo();
const { apps } = useHeaderApp();
const { getters, dispatch } = useStore();
const router = useRouter();
const { ok } = useModal();

const currIdx = ref(0);
const sortable = ref([]);
const totalMenus = ref(getters['meta/getMenus']);
const depth2Menus = ref(sortBy(
  totalMenus.value.filter((menu) => menu.menuLevel === 0 && apps.map((app) => app.key).includes(menu.applicationId)),
  ['applicationName', 'menuName'],
));
const depth3Menus = ref(sortBy(
  totalMenus.value.filter((menu) => menu.menuLevel === 1 && apps.map((app) => app.key).includes(menu.applicationId)),
));

depth2Menus.value.unshift({ menuName: '즐겨찾기', menuUid: 'bookmarks' });

const groupedDepth3Menus = ref(sortBy(chain(depth3Menus.value).groupBy('parentsMenuUid').map((v, i) => ({
  parentMenuName: get(find(totalMenus.value, (menu) => menu.menuUid === i), 'menuName'),
  parentMenu: i,
  applicationName: get(find(v, 'applicationName'), 'applicationName'),
  menus: chain(v).groupBy('menuUid').map((val, ind) => ({
    menuName: get(find(val, 'menuName'), 'menuName'),
    menuUid: ind,
    pageId: get(find(val, 'pageId'), 'pageId'),
  })).value(),
})).value(), ['applicationName', 'parentMenuName']));

const bookmarks = computed(() => ({
  parentMenuName: '즐겨찾기',
  parentMenu: 'bookmarks',
  applicationName: 'bookmarks',
  editable: false,
  menus: getters['meta/getBookmarks'].filter((menu) => menu.folderYn === 'N').map((bookmark) => (
    {
      ...bookmark,
      menuName: bookmark.bookmarkName,
    })).sort((a, b) => a.arrayalOrder - b.arrayalOrder),
}));

groupedDepth3Menus.value.unshift(bookmarks.value);

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

async function saveBookmarks(order) {
  const cloneBookmark = cloneDeep(bookmarks.value.menus);
  const saveParams = cloneBookmark.map((bookmark, idx) => ({
    ...bookmark,
    arrayalOrder: order.findIndex((ord) => Number(ord) === idx),
  }));
  await http.put('/sflex/common/common/bookmarks', saveParams);
  await dispatch('meta/fetchBookmarks');
}

const isAuthenticated = getters['meta/isAuthenticated'];

async function updateBookmark(isCreate, menu) {
  if (isAuthenticated) {
    if (isCreate) {
      await createBookmark(menu);
    } else {
      await deleteBookmark(menu);
    }
    groupedDepth3Menus.value.shift();
    groupedDepth3Menus.value.unshift(bookmarks.value);
  }
}

function onClickEditAndComplete(depth3Menu) {
  if (depth3Menu.editable) { // 현재 editable true = 편집 완료해야 함.
    saveBookmarks(sortable.value[0].toArray());
  }
  depth3Menu.editable = !depth3Menu.editable;
}

function moveToPage(menu) {
  router.push({ name: menu.menuUid });
  ok();
}

function setActive(navLinks, link) {
  navLinks.value.forEach((el) => el?.classList.remove('curr'));
  link?.classList.add('curr');
}

function makeScroll(navLinks) {
  navLinks.value.forEach((btn, idx) => {
    const targetElem = document.getElementById(btn.querySelector('a').getAttribute('href'));

    const linkST = ScrollTrigger.create({
      scroller: '#gnb_menu_tablet--ul-depth1',
      trigger: targetElem,
      start: 'top top',
    });

    ScrollTrigger.create({
      scroller: '#gnb_menu_tablet--ul-depth1',
      // markers: true, // 스크롤위치 확인용 마커
      start: 'top 10%+=10',
      trigger: targetElem,
      end: 'bottom 10%+=10',
      toggleClass: 'curr',
      onToggle: (self) => self.isActive && setActive(navLinks, btn),
    });

    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      gsap.to('.gnb_menu_tablet--ul-depth1', {
        duration: 1,
        scrollTo: { y: linkST.start, offsetY: 10 },
      });
    });

    if (navLinks.value.length === idx + 1) {
      targetElem.classList.add('lastTarget');
    }
  });
}

const sortableUl = ref();

function destroySortable() {
  sortable.value.forEach((e) => { e.destroy(); });
  sortable.value = [];
}

function createSortable() {
  destroySortable();

  const el = sortableUl.value;
  const targets = el;

  // let updateCustomEvt;
  targets.forEach((e) => {
    sortable.value.push(
      new Sortable(e, {
        group: 'nested',
        dataIdAttr: 'data-id',
        swapThreshold: 0.5,
        animation: 150,
        handle: '.handle',
      }),
    );
  });
}

onMounted(() => {
  setTimeout(() => {
    const navLinks = computed(() => gsap.utils.toArray('.tablet-menu__nav-item'));
    makeScroll(navLinks);
    createSortable();
  }, 50);
});

onBeforeUnmount(() => {
  destroySortable();
});
</script>
