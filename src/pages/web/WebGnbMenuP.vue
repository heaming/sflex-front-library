<template>
  <div
    class="gnb_depth_menu"
  >
    <ul>
      <li
        v-for="(folder, idx) in appMenu.children"
        :key="idx"
      >
        <h3>{{ folder.menuName }}</h3>
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

const { getters, commit } = useStore();
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
      a.push(v); return a;
    }, []);
}

async function fetchMenus() {
  const apps = getters['meta/getApps'];
  const app = apps.find((a) => a.applicationId === props.appKey);
  const menuPageRes = getters['meta/getTotalMenus'];

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
  appMenu.value = hierarchyData;
}
await fetchMenus();

async function handleUpdateSelected(menuKey) {
  try {
    await push({ name: menuKey });
    commit('app/setSelectedGlobalMenuKey', menuKey);
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