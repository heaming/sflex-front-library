<template>
  <div class="web-left-drawer__bookmark drawer-bookmark">
    <web-left-drawer-title
      title="즐겨찾기"
    />
    <kw-scroll-area>
      <div class="drawer-bookmark__action">
        <kw-btn
          dense
          icon="plus"
          no-wrap
          :label="$t('MSG_BTN_ALL_SPREAD')"
        />
        <kw-btn
          dense
          icon="minus"
          no-wrap
          :label="$t('MSG_BTN_ALL_FOLD')"
        />
        <kw-btn
          dense
          icon="write"
          no-wrap
          :label="$t('MSG_BTN_EDIT')"
        />
      </div>

      <!-- <kw-tree
        ref="treeRef"
        :key="selectedGlobalAppKey"
        class="drawer-bookmark__tree"
        :nodes="treeNodes"
        :expanded="expandedKeys"
        :selected="selectedGlobalMenuKey"
        select-leaf-only
        @update:expanded="onUpdateExpanded"
        @update:selected="onUpdateSelected"
      /> -->
    </kw-scroll-area>
  </div>
</template>

<script>
import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';
import useLeftDrawerMenu from '../../composables/private/useLeftDrawerMenu';

export default {
  name: 'WebLeftDrawerBookmark',
  components: {
    WebLeftDrawerTitle,
  },

  setup() {
    return {
      ...useLeftDrawerMenu(),
    };
  },
};
</script>
