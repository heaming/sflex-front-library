<template>
  <q-drawer
    class="tablet-left-drawer"
    :model-value="true"
    :mini-width="40"
    :width="80"
    side="left"
    dark
    persistent
    show-if-above
    bordered
    @update:model-value="setExpanded"
  >
    <div class="tablet-left-drawer__content">
      <div class="tablet-left-drawer__content__top">
        <q-icon
          class="mt25 mb30"
          size="35px"
          name="user_24"
        />
        <q-icon
          class="mt25 mb30"
          size="35px"
          name="user_24"
        />
      </div>

      <div class="tablet-left-drawer__content__bottom">
        <!-- 아이콘은 flex-direction이 column-reverse 라서 역순으로 나온다. -->
        <q-icon
          class="mt25 mb30"
          size="35px"
          name="gnb_menu"
          @click.stop="openMenuPopup"
        />
        <q-icon
          class="mt25 mb30"
          size="35px"
          name="user_24"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

export default {
  name: 'TabletLeftDrawer',
  components: {
  },

  setup() {
    function openMenuPopup() {
      console.log('test');
    }

    return {
      ...useLeftDrawerExpand(),
      openMenuPopup,
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
}

.tablet-left-drawer__content__bottom {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

</style>
