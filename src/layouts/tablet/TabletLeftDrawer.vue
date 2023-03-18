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
<style scoped lang="scss">
.tablet-left-drawer__content > div {
  height: 50% !important;
}

.tablet-left-drawer__content__top {
  display: flex;
  flex-direction: column;
  align-items: center;

  .menu_icon {
    margin-top: 32px;
  }
}

.tablet-left-drawer__content__bottom {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  .menu_icon {
    margin-top: 24px;

    &:first-child {
      margin-bottom: 32px;
    }
  }
}

.menu_icon {
  width: 40px;
  height: 40px;

  &.curr {
    background: $primary;
    border-radius: 4px;
  }
}

.tablet-left-drawer__content:has(.curr) {
  .menu_icon {
    ::v-deep(.q-icon) {
      opacity: 0.8;
    }

    &.curr {
      ::v-deep(.q-icon) {
        opacity: 1;
      }
    }
  }
}
</style>
