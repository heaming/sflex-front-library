<template>
  <q-drawer
    class="tablet-left-drawer"
    :model-value="true"
    :mini-width="40"
    :width="62"
    side="left"
    dark
    persistent
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <div class="tablet-left-drawer__content">
      <div class="tablet-left-drawer__content__top">
        <kw-btn
          borderless
          icon="tablet_home"
          style="font-size: 24px;"
          class="menu_icon"
        />
      </div>

      <div class="tablet-left-drawer__content__bottom">
        <kw-btn
          borderless
          icon="tablet_menu"
          style="font-size: 24px;"
          class="menu_icon curr"
          @click="openTotalMenu"
        />
        <kw-btn
          borderless
          icon="tablet_basket"
          style="font-size: 24px;"
          class="menu_icon"
        />
        <kw-btn
          borderless
          icon="tablet_recently"
          style="font-size: 24px;"
          class="menu_icon"
        />
        <kw-btn
          borderless
          icon="tablet_task"
          style="font-size: 24px;"
          class="menu_icon"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { modal } from '../../plugins/modal';
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

const showTotalMenu = ref(false);
export default {
  name: 'TabletLeftDrawer',
  setup() {
    async function openTotalMenu() {
      if (showTotalMenu.value) return;
      showTotalMenu.value = true;
      await modal({
        component: async () => await import('../../pages/tablet/TabletTotalMenuP.vue'),
        dialogProps: { maximized: true },
      });
      showTotalMenu.value = false;
    }

    return {
      ...useLeftDrawerExpand(),
      openTotalMenu,
      showTotalMenu,
    };
  },
};
</script>
