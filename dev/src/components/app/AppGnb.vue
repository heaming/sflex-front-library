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
            v-for="{key, label} of gnbs"
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
            class="kw-btn--icon-only ml-24"
            size="24px"
          />
        </div>
        <div class="item">
          <kw-btn
            icon="alert_24"
            class="kw-btn--icon-only ml20"
            size="24px"
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

(function createDevGnbs() {
  const globImportedRoutes = getRoutes().filter((e) => e.meta.isGlobImport);
  const appKeys = Object.keys(globImportedRoutes.reduce((a, e) => { a[e.path.split('/')[1]] = null; return a; }, {}));
  const gnbs = appKeys.map((v) => ({ key: v, label: v }));
  commit('app/setGnbs', gnbs);
}());

const {
  gnbs,
  isSelected,
  updateSelected,
} = useGnb();
</script>
