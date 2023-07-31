<template>
  <div
    id="gnb_menu"
    ref="gnbRef"
    class="gnb_menu"
  >
    <div class="gnb_menu--header scrollpanels">
      <h1>전체메뉴</h1>
      <nav>
        <ul class="">
          <template
            v-for="(menu, idx) in totalMenu"
            :key="idx"
          >
            <li class="nav-item curr">
              <a :href="`#info${idx+1}`">{{ menu.menuName }}</a>
            </li>
          </template>
        </ul>
      </nav>
      <kw-btn
        icon="close_24"
        style="font-size: 34px;"
        class="gnb_menu--closer"
        borderless
        @click="onClickClose"
      />
    </div>
    <ul class="gnb_menu--ul-depth1 scrollpanels-content">
      <template
        v-for="(app, idx) in totalMenu"
        :key="idx"
      >
        <li
          :id="`info${idx+1}`"
          class="section panel"
        >
          <h2>{{ app.menuName }}</h2>
          <ul class="gnb_menu--ul-depth2">
            <li
              v-for="(folder, f_idx) in app.children"
              :key="f_idx"
            >
              <h3>{{ folder.menuName }}</h3>
              <ul class="gnb_menu--ul-depth3">
                <li
                  v-for="(menu, m_idx) in folder.children"
                  :key="m_idx"
                >
                  <a
                    v-if="!!menu.hasRole"
                    href="javascript:;"
                    class="ellipsis"
                    @click="handleUpdateSelected(menu.menuUid)"
                  >{{ menu.menuName }}
                    <kw-tooltip
                      show-when-ellipsised
                      :offset="[-20, 7]"
                      anchor="bottom start"
                      self="center start"
                      class="tab_tooltip"
                    >
                      {{ menu.menuName }}
                    </kw-tooltip>
                  </a>
                  <a
                    v-if="!menu.hasRole"
                    href="javascript:;"
                    style="color: #dedede;cursor: default;"
                    class="ellipsis"
                  >{{ menu.menuName }}
                    <kw-tooltip
                      show-when-ellipsised
                      :offset="[-20, 7]"
                      anchor="bottom start"
                      self="center start"
                      class="tab_tooltip"
                    >
                      {{ menu.menuName }}
                    </kw-tooltip>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { isNavigationFailure } from 'vue-router';
import { alert } from '../../plugins/dialog';

const { getters, commit } = useStore();
const { push } = useRouter();
const { t } = useI18n();

const totalMenu = ref([]);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const emit = defineEmits([
  'closeTot',
]);
async function onClickClose() {
  emit('closeTot');
}

function createHierarchyData(menus, key) {
  return menus
    .filter((v) => (key !== 'ROOT' ? key.endsWith(v.parentsMenuUid) : v.menuLevel === 0))
    .reduce((a, v) => {
      v.key = `${key}.${v.menuUid}`;
      v.children = createHierarchyData(menus, v.key);
      a.push(v); return a;
    }, []);
}

async function handleUpdateSelected(menuUid) {
  try {
    await push({ name: menuUid });
    commit('app/setSelectedGlobalMenuKey', menuUid || null);
    commit('app/setLeftExist', true);
    emit('closeTot');
  } catch (e) {
    if (isNavigationFailure(e, 1)) { // matcher not found..
      await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
    } else {
      throw e;
    }
  }
}

async function fetchMenus() {
  const apps = getters['meta/getApps'];
  const menuPageRes = getters['meta/getTotalMenus'];
  // const menuPageRes = await http.get('/sflex/common/common/portal/menus-without-auth');

  apps.forEach((app) => {
    const menus = menuPageRes.data.filter((v) => v.applicationId === app.applicationId);
    const hierarchyData = {
      key: 'ROOT',
      portalId: app.portalId,
      applicationId: app.applicationId,
      menuLevel: -1,
      menuName: app.applicationName,
      folderYn: 'Y',
      children: createHierarchyData(menus, 'ROOT'),
    };
    totalMenu.value.push(hierarchyData);
  });
}
await fetchMenus();
const gnbRef = ref();
onMounted(async () => {
  const navLinks = gsap.utils.toArray('.nav-item');
  function setActive(link) {
    navLinks.forEach((el) => el.classList.remove('active'));
    link.classList.add('active');
  }
  navLinks.forEach((btn, idx) => {
    const targetElem = document.querySelector(btn.querySelector('a').getAttribute('href'));
    const linkST = ScrollTrigger.create({
      scroller: '#gnb_menu',
      trigger: targetElem,
      start: 'top top',
    });
    ScrollTrigger.create({
      scroller: '#gnb_menu',
      // markers: true, //스크롤위치 확인용 마커
      trigger: targetElem,
      start: 'top 10%+=170',
      end: 'bottom 10%+=170',
      toggleClass: 'active',
      onToggle: (self) => self.isActive && setActive(btn),
    });
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      gsap.to('.gnb_menu', {
        duration: 1,
        scrollTo: { y: linkST.start, offsetY: 170 },
        // scrollTo: { y: `#info${index + 1}`, offsetY: 170 },
      });
    });

    if (navLinks.length === idx + 1) {
      targetElem.classList.add('lastTarget');
    }
  });
});
</script>
