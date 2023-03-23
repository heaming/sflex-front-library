<template>
  <q-footer
    class="mobile-footer flex items-center"
    bordered
  >
    <!-- 버튼 활성화 될 경우 .curr -->
    <kw-btn
      borderless
      icon="mob_home"
      style="font-size: 24px;"
      class="menu_icon curr"
      label="홈"
    />
    <kw-btn
      borderless
      icon="mob_task"
      style="font-size: 24px;"
      class="menu_icon"
      label="작업목록"
    />
    <kw-btn
      borderless
      icon="mob_recently"
      style="font-size: 24px;"
      class="menu_icon"
      label="최근작업"
    />
    <kw-btn
      borderless
      icon="mob_basket"
      style="font-size: 24px;"
      class="menu_icon"
      label="결제바구니"
    />
    <kw-btn
      borderless
      icon="mob_menu"
      style="font-size: 24px;"
      class="menu_icon"
      label="전체보기"
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
        dialogProps: { maximized: true },
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
