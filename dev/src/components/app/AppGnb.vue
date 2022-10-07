<template>
  <q-header class="kw-gnb">
    <q-toolbar class="row justify-between">
      <div class="row justify-start items-center item-wrap full-height">
        <div class="item">
          <q-avatar>
            <img
              src="~~@assets/images/logo_redpen.svg"
              alt="KSS빨간펜"
            >
          </q-avatar>
        </div>
        <div class="item full-height">
          <a
            v-for="{key, label} of gnbItems"
            :key="key"
            href="javascript:void(0)"
            class="kw-gnb--link"
            :class="{'kw-gnb--link-active': isSelected(key)}"
            @click="updateSelected(key)"
          >
            {{ label }}
          </a>
        </div>
      </div>
      <div class="row justify-end items-center item-wrap">
        <div class="item">
          <kw-input
            placeholder="메뉴검색"
            class="gnb-search w220"
          />
        </div>
        <div class="item">
          <kw-btn
            icon="search_24"
            class="ml-34"
            size="24px"
            color="translate"
            borderless
          />
        </div>
        <div class="item">
          <kw-btn
            icon="alert_off_24"
            class="ml8"
            size="24px"
            color="translate"
            borderless
          />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useGnb } from '~kw-lib';

const { getRoutes } = useRouter();
const { commit } = useStore();

(function createDevGnbItems() {
  const globImportedRoutes = getRoutes().filter((e) => e.meta.isGlobImport);
  const appKeys = Object.keys(globImportedRoutes.reduce((a, e) => { a[e.path.split('/')[1]] = null; return a; }, {}));
  const gnbItems = appKeys.map((v) => ({ key: v, label: v }));
  commit('app/setGnbItems', gnbItems);
}());

const {
  gnbItems,
  isSelected,
  updateSelected,
} = useGnb();
</script>
