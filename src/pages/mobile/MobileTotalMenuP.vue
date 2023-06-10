<template>
  <kw-popup
    title="모바일 전체메뉴"
    no-header
    class="mobile"
    size="full"
  >
    <div class="gnb_menu_mobile">
      <div class="gnb_menu_mobile--header">
        <kw-btn
          borderless
          icon-right="arrow_right_24"
          style="font-size: 20px;"
          :label="`${userInfo.userName}님`"
          class="text-weight-bold"
          @click="openUserInfoPopup"
        />
        <div>
          <kw-btn
            borderless
            icon="alert_off_24"
            style="font-size: 24px;"
            @click="openAlarmListPopup"
          >
            <q-badge
              v-if="alarms?.length > 0"
              rounded
              floating
              color="primary"
              :label="Math.min(alarms?.filter((alarm) => alarm.readYn === 'N').length, 99)"
              class="alert-badge"
            />
          </kw-btn>
          <kw-btn
            borderless
            icon="setting_24"
            style="font-size: 24px;"
            class="ml20"
            @click="openBottomSheet"
          />
        </div>
      </div>
      <div class="gnb_menu_mobile--body">
        <nav class="gnb_menu_mobile--nav">
          <ul>
            <template
              v-for="(depth1Menu, depth1Idx) in totalMenus"
              :key="depth1Idx"
            >
              <li
                v-for="(depth2Menu, depth2Idx) in depth1Menu.children"
                :key="depth2Idx"
                class="mobile-menu__nav-item"
              >
                <a
                  :href="`menu__${depth2Menu.menuUid}`"
                  @click="currIdx = depth2Idx"
                >
                  {{ depth2Menu.menuName }}
                </a>
              </li>
            </template>
          </ul>
        </nav>
        <ul
          id="gnb_menu_mobile--ul-depth1"
          class="gnb_menu_mobile--ul-depth1"
        >
          <template
            v-for="(depth1Menu, depth1Idx) in totalMenus"
            :key="depth1Idx"
          >
            <li
              v-for="(depth2Menu, depth2Idx) in depth1Menu.children"
              :id="`menu__${depth2Menu.menuUid}`"
              :key="depth2Idx"
            >
              <h2>
                {{ depth2Menu.menuName }}
                <kw-btn
                  v-if="depth2Menu.applicationId === 'bookmarks'"
                  dense
                  :label="depth2Menu.editable ? '완료' : '편집'"
                  style="font-size: 12px; padding: 0 8px;"
                  class="h24"
                  border-color="line-line"
                  @click="onClickEditAndComplete(depth2Menu)"
                />
              </h2>
              <ul
                :id="`gnb_menu_mobile--ul-depth2-${depth2Menu.applicationId}`"
                class="gnb_menu_mobile--ul-depth2"
                :class="{'sortable-menu': depth2Menu.editable !== undefined }"
              >
                <li
                  v-for="(depth3Menu, depth3Idx) in depth2Menu.children"
                  :key="depth3Idx"
                  :data-id="depth3Idx"
                >
                  <a
                    href="#"
                    @click.prevent="moveToPage(depth3Menu)"
                  >
                    {{ depth3Menu.menuName }}
                  </a>
                  <kw-checkbox
                    v-if="!depth2Menu.editable && depth3Menu.menuUid && depth3Menu.pageId"
                    :model-value="isBookmarkedPage(depth3Menu.menuUid, depth3Menu.pageId)"
                    :true-value="true"
                    :false-value="false"
                    checked-icon="bookmark_on"
                    unchecked-icon="bookmark_off"
                    @update:model-value="(val) => updateBookmark(val, depth3Menu)"
                  >
                    <kw-tooltip>
                      {{ $t('MSG_TXT_BKMK', null, '즐겨찾기') }}
                    </kw-tooltip>
                  </kw-checkbox>
                  <kw-btn
                    v-else-if="depth2Menu.editable"
                    borderless
                    class="handle"
                    icon="menu_24"
                  />
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </kw-popup>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Sortable from 'sortablejs';
import { http } from '../../plugins/http';
import useMeta from '../../composables/useMeta';
import useModal from '../../composables/useModal';
import useSession from '../../composables/useSession';
import { modal } from '../../plugins/modal';
import { bottomSheet } from '../../plugins/bottomSheet';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const userInfo = useMeta().getUserInfo();
const { getters, dispatch } = useStore();
const { logout } = useSession();

const apps = readonly(getters['meta/getApps']);
const router = useRouter();
const { ok } = useModal();

const alarms = computed(() => getters['meta/getAlarms']);
const currIdx = ref(0);
const sortable = ref([]);
const totalMenus = ref([]);
const menus = getters['meta/getTotalMenus'];

const isBookmarkedPage = computed(() => (
  (menuUid, pageId) => getters['meta/isBookmarked'](menuUid, pageId)
));

function createHierarchyData(appMenus, key) {
  return appMenus
    .filter((v) => (key !== 'ROOT' ? key.endsWith(v.parentsMenuUid) : v.menuLevel === 0))
    .reduce((a, v) => {
      v.key = `${key}.${v.menuUid}`;
      v.children = createHierarchyData(appMenus, v.key);
      a.push(v); return a;
    }, []);
}

const bookmarks = computed(() => ({
  key: 'ROOT',
  portalId: 'bookmarks',
  applicationId: 'bookmarks',
  menuLevel: -1,
  menuName: '즐겨찾기',
  folderYn: 'Y',
  editable: false,
  children: [
    {
      key: 'ROOT',
      portalId: 'bookmarks',
      applicationId: 'bookmarks',
      menuLevel: -1,
      menuName: '즐겨찾기',
      folderYn: 'Y',
      children: getters['meta/getBookmarks'].filter((menu) => menu.folderYn === 'N').map((bookmark) => (
        {
          ...bookmark,
          menuName: bookmark.bookmarkName,
          editable: false,
        })).sort((a, b) => a.arrayalOrder - b.arrayalOrder),
      editable: false,
    },
  ],
}
));

async function fetchMenus() {
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
  totalMenus.value = cloneDeep(arr);
  totalMenus.value.unshift(bookmarks.value);
}

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
  const cloneBookmark = cloneDeep(bookmarks.value.children[0].children);
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
    totalMenus.value.shift();
    totalMenus.value.unshift(bookmarks.value);
  }
}

function moveToPage(menu) {
  ok();
  router.push({ name: menu.menuUid });
}

function setActive(navLinks, link) {
  navLinks.value.forEach((el) => el?.classList.remove('curr'));
  link?.classList.add('curr');
}

function makeScroll(navLinks) {
  navLinks.value.forEach((btn, idx) => {
    const targetElem = document.getElementById(btn.querySelector('a').getAttribute('href'));
    const linkST = ScrollTrigger.create({
      scroller: '#gnb_menu_mobile--ul-depth1',
      trigger: targetElem,
      start: 'top top',
    });

    ScrollTrigger.create({
      scroller: '#gnb_menu_mobile--ul-depth1',
      // markers: true, // 스크롤위치 확인용 마커
      start: 'top 10%+=10',
      trigger: targetElem,
      end: 'bottom 10%-=10',
      toggleClass: 'curr',
      onToggle: (self) => self.isActive && setActive(navLinks, btn),
    });

    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      gsap.to('.gnb_menu_mobile--ul-depth1', {
        duration: 1,
        scrollTo: { y: linkST.start, offsetY: 10 },
      });
    });

    if (navLinks.value.length === idx + 1) {
      targetElem.classList.add('lastTarget');
    }
  });
}

function destroySortable() {
  sortable.value.forEach((e) => { e.destroy(); });
  sortable.value = [];
}

function createSortable() {
  destroySortable();

  const el = document.getElementById('gnb_menu_mobile--ul-depth2-bookmarks');
  const target = el;
  sortable.value.push(
    new Sortable(target, {
      dataIdAttr: 'data-id',
      animation: 150,
      handle: '.handle',
    }),
  );
}

async function onClickEditAndComplete(depth3Menu) {
  if (depth3Menu.editable && sortable.value[0]) { // 현재 editable true = 편집 완료해야 함.
    saveBookmarks(sortable.value[0].toArray());
    destroySortable();
  } else {
    await nextTick(() => {
      createSortable();
    });
  }
  depth3Menu.editable = !depth3Menu.editable;
}

async function openBottomSheet() {
  // modal({
  //   component: () => import('../web/WebSessionSettingP.vue'),
  // });
  // bottomSheet
  const res = await bottomSheet({
    items: [
      { value: 'changePassword', label: '비밀번호 변경' },
      { value: 'homeSetting', label: '개인 홈 설정' },
      { value: 'mobilePrinterInit', label: '모바일프린터 초기화' },
      { value: 'searchLetter', label: '공문조회' },
      { value: 'logout', label: '로그아웃' },
    ],
  });
  if (res?.result) {
    switch (res.payload?.value) {
      case 'logout': logout();
        break;
    }
  }
}

async function openUserInfoPopup() {
  await modal({
    component: () => import('./MobileUserInfoP.vue'),
  });
}

async function openAlarmListPopup() {
  if (alarms.value?.length <= 0) return;
  await modal({
    component: () => import('./MobileAlarmListP.vue'),
  });
}

onMounted(() => {
  setTimeout(async () => {
    await fetchMenus();
    const navLinks = computed(() => gsap.utils.toArray('.mobile-menu__nav-item'));
    makeScroll(navLinks);
  }, 50);
});

onBeforeUnmount(() => {
  destroySortable();
});

</script>
