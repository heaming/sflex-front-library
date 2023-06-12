<template>
  <q-drawer
    class="tablet-left-drawer"
    :model-value="true"
    :mini-width="40"
    :width="62"
    side="left"
    behavior="desktop"
    dark
    persistent
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <div class="tablet-left-drawer__content">
      <div class="tablet-left-drawer__content__top">
        <kw-btn
          v-for="(menu, menuIdx) in leftDrawerTopMenus"
          :key="menuIdx"
          borderless
          :icon="menu.icon"
          style="font-size: 24px;"
          class="menu_icon"
          :class="{ 'curr': menu.icon === curr }"
          @click="openMenu(menu)"
        />
      </div>

      <div class="tablet-left-drawer__content__bottom">
        <kw-btn
          v-for="(menu, menuIdx) in leftDrawerBottomMenus"
          :key="menuIdx"
          borderless
          :icon="menu.icon"
          style="font-size: 24px;"
          class="menu_icon"
          :class="{ 'curr': menu.icon === curr }"
          @click="openMenu(menu)"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { modal } from '../../plugins/modal';
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';
import { getGlobalData, removeGlobalData } from '../../utils/private/globalData';
import { GlobalModalVmKey } from '../../consts/private/symbols';

export default {
  name: 'TabletLeftDrawer',
  setup() {
    const curr = ref(0);
    const leftDrawerTopMenus = ref([
      { icon: 'tablet_home' },
    ]);

    const leftDrawerBottomMenus = ref([
      { icon: 'tablet_menu', component: async () => await import('../../pages/tablet/TabletTotalMenuP.vue') },
      { icon: 'tablet_basket' },
      { icon: 'tablet_recently' },
      { icon: 'tablet_task' },
    ]);

    async function openMenu(menu) {
      const globalModals = getGlobalData(GlobalModalVmKey);
      if (globalModals.length > 0) {
        const mainMenuModals = globalModals.filter((globalModal) => globalModal.dialogProps.class === 'main-menu-modal');
        mainMenuModals.forEach((mainMenuModal) => removeGlobalData(mainMenuModal.uid));
        if (curr.value === menu.icon) {
          curr.value = -1;
          return;
        }
      }

      curr.value = menu.icon;

      if (menu.component) {
        await modal({
          component: menu.component,
          dialogProps: { maximized: true, class: 'main-menu-modal' },
        });

        curr.value = -1;
      }
    }

    return {
      ...useLeftDrawerExpand(),
      openMenu,
      leftDrawerTopMenus,
      leftDrawerBottomMenus,
      curr,
    };
  },
};
</script>
