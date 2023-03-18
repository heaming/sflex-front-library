<template>
  <q-footer
    class="mobile-footer flex items-center"
    bordered
  >
    <kw-btn
      borderless
      icon="tablet_home"
      style="font-size: 24px;"
      class="menu_icon"
    />
    <kw-btn
      borderless
      icon="tablet_task"
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
      icon="tablet_basket"
      style="font-size: 24px;"
      class="menu_icon"
    />
    <kw-btn
      borderless
      icon="tablet_menu"
      style="font-size: 24px;"
      class="menu_icon"
      @click="openTotalMenu"
    />
  </q-footer>
</template>

<script>
import { modal } from '../../plugins/modal';

const showTotalMenu = ref(false);
export default {
  name: 'MobileFooter',

  setup() {
    async function openTotalMenu() {
      if (showTotalMenu.value) return;
      showTotalMenu.value = true;
      await modal({
        component: async () => await import('../../pages/mobile/MobileTotalMenuP.vue'),
      });
      showTotalMenu.value = false;
    }

    return {
      openTotalMenu,
      showTotalMenu,
    };
  },
};

</script>
