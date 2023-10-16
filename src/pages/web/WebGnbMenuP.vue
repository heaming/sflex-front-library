<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebGnbMenuP
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC 화면의 최상단에 있는 메뉴들의 하위 메뉴들을 보여주는 영역
****************************************************************************************************
--->
<template>
  <div
    class="gnb_depth_menu"
  >
    <ul>
      <li
        v-for="(folder, idx) in appMenu.children"
        :key="idx"
      >
        <h3>
          {{ folder.menuName }}
          <kw-tooltip
            show-when-ellipsised
            :offset="[-20, 7]"
            anchor="bottom start"
            self="center start"
            class="tab_tooltip"
          >
            {{ folder.menuName }}
          </kw-tooltip>
        </h3>
        <ul>
          <li
            v-for="(menu, idx2) in folder.children"
            :key="idx2"
          >
            <a
              href="javascript:;"
              @click.stop="handleUpdateSelected(menu.menuUid)"
            >
              {{ menu.menuName }}
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
  </div>
</template>

<script setup>
import { isNavigationFailure } from 'vue-router';
import { alert } from '../../plugins/dialog';
import env from '../../consts/private/env';

const { getters } = useStore();
const { push } = useRouter();
const { t } = useI18n();

const props = defineProps({
  appKey: {
    type: String,
    default: '',
  },
});

const appMenu = ref({});
const emit = defineEmits([
  'closeGnbMenu',
]);

function createHierarchyData(menus, key) {
  return menus
    .filter((v) => (key !== 'ROOT' ? key.endsWith(v.parentsMenuUid) : v.menuLevel === 0))
    .reduce((a, v) => {
      v.key = `${key}.${v.menuUid}`;
      v.children = createHierarchyData(menus, v.key);
      if (env.MODE === 'dev' || env.DEV) {
        if (v.folderYn === 'Y' && v.children.length === 0) {
        // do something
        } else {
          a.push(v);
        }
      } else {
        a.push(v);
      }
      return a;
    }, []);
}

async function fetchMenus() {
  const apps = getters['meta/getApps'];
  const app = apps.find((a) => a.applicationId === props.appKey);
  const menuPageRes = getters['meta/getMenus'];

  const menus = menuPageRes.filter((v) => v.applicationId === app.applicationId);
  const hierarchyData = {
    key: 'ROOT',
    portalId: app.portalId,
    applicationId: app.applicationId,
    menuLevel: -1,
    menuName: app.applicationName,
    folderYn: 'Y',
    children: createHierarchyData(menus, 'ROOT'),
  };
  appMenu.value = hierarchyData;
}
await fetchMenus();

async function handleUpdateSelected(menuUid) {
  try {
    await push({ name: menuUid });
    emit('closeGnbMenu');
  } catch (e) {
    if (isNavigationFailure(e, 1)) { // matcher not found..
      await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
    } else {
      throw e;
    }
  }
}

watch(props, async () => {
  await fetchMenus();
}, { deep: true });
</script>
