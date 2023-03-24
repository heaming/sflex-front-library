<template>
  <kw-popup
    title="테스트 메뉴"
    class="mobile"
    size="full"
  >
    <div
      class="gnb_menu_mobile"
      style="top: 62px;"
    >
      <div class="gnb_menu_mobile--header">
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
          <kw-btn
            borderless
            icon="setting_24"
            style="font-size: 24px;"
            class="ml20"
          /><!-- 클릭시 버텀시트 활성 -->
        </div>
      </div>
      <div class="gnb_menu_mobile--body">
        <nav class="gnb_menu_mobile--nav">
          <ul>
            <li
              v-for="(menu, menuIdx) in depth2Menus"
              :key="menuIdx"
              class="mobile-menu__nav-item"
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
          id="gnb_menu_mobile--ul-depth1"
          class="gnb_menu_mobile--ul-depth1"
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
              class="gnb_menu_mobile--ul-depth2"
              :class="{'sortable-menu': depth3Menu.editable !== undefined }"
            >
              <kw-list
                :items="depth3Menu.menus"
                :dialog-options="options"
                clickable
                use-dialog
                :dialog-title="'다이얼로그 제목'"
                @click-item="openPopup"
              >
                <template #item="{ item }">
                  <kw-item-section>
                    <div
                      class="row justify-between"
                      style="width: 100%;"
                    >
                      <div>
                        <kw-item-label class="text-weight-medium">
                          {{ item.menuName }}
                        </kw-item-label>
                        <div class="row">
                          <kw-item-label
                            class="kw-font-pt14 kw-fc--placeholder"
                          >
                            {{ item.parentMenuName }}
                          </kw-item-label>
                          <kw-separator
                            spaced
                            vertical
                            class="my2"
                          />
                          <kw-item-label
                            class="kw-font-pt14 kw-fc--placeholder"
                          >
                            {{ item.menuUid }}{{ $t('MSG_TXT_GRD_CNT') }}
                          </kw-item-label>
                        </div>
                      </div>
                      <div>
                        <kw-avatar size="24px">
                          <img
                            src="~~dev/assets/images/test_image.png"
                            alt="test"
                          >
                        </kw-avatar>
                      </div>
                    </div>
                    <div class="row justify-end">
                      <zwcm-counter
                        v-model="item.count"
                        label=""
                        :min="0"
                        :max="999"
                      />
                    </div>
                  </kw-item-section>
                </template>
                <template #dialogAction>
                  <kw-btn>
                    test1
                  </kw-btn>
                  <kw-btn>
                    test2
                  </kw-btn>
                  <kw-btn>
                    test3
                  </kw-btn>
                </template>
              </kw-list>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </kw-popup>
</template>

<script setup>
import { get, find, groupBy, sortBy, debounce } from 'lodash-es';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Sortable from 'sortablejs';
import useHeaderApp from '../../composables/private/useHeaderApp';
import useMeta from '../../composables/useMeta';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const userInfo = useMeta().getUserInfo();
const { apps } = useHeaderApp();
const { getters } = useStore();

const openPopup = debounce((item) => {
  console.log('item', item);
});

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
const groupByParentsMenuUid = groupBy(depth3Menus.value, (menu) => menu.parentsMenuUid);
const menuValues = Object.values(groupByParentsMenuUid);

const groupedDepth3Menus = ref(sortBy(menuValues.map((v) => ({
  parentMenuName: get(find(totalMenus.value, (menu) => menu.menuUid === v[0].parentsMenuUid), 'menuName'),
  parentMenu: v[0].parentsMenuUid,
  applicationName: get(find(v, 'applicationName'), 'applicationName'),
  menus: v,
})), ['applicationName', 'parentMenuName']));

groupedDepth3Menus.value.forEach((x) => {
  x.menus.push(...x.menus.map((menu) => ({
    ...menu,
    expansion: true,
  })));
});
console.log(groupedDepth3Menus.value);

const options = ref([
  { label: 'test1', value: 'test1' },
  { label: 'test2', value: 'test2' },
  { label: 'test3', value: 'test3' },
  { label: 'test4', value: 'test4' },
  { label: 'test5', value: 'test5' },
]);

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
    const navLinks = computed(() => gsap.utils.toArray('.mobile-menu__nav-item'));
    makeScroll(navLinks);
    createSortable();
  }, 50);
});

onBeforeUnmount(() => {
  destroySortable();
});

</script>
