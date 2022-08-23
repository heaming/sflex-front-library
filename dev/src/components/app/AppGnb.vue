<template>
  <q-header class="kw-gnb">
    <q-toolbar class="row justify-between">
      <div class="row justify-start items-center item-wrap full-height">
        <div class="item">
          <q-avatar>
            <img
              src="../../../../src/assets/images/logo_redpen.svg"
              alt="KSS빨간펜"
            >
          </q-avatar>
        </div>
        <div class="item full-height">
          <a
            v-for="app of apps"
            :key="app"
            href="javascript:void(0)"
            class="text-uppercase kw-gnb--link full-height"
            @click="updateSelected(app)"
          >
            {{ app }}
          </a>
        </div>
      </div>
      <div class="row justify-end items-center item-wrap">
        <div class="item">
          <kw-input
            name="input"
            placeholder="메뉴검색"
            class="gnb-search w220"
          />
        </div>
        <div class="item">
          <kw-btn
            icon="search_24|0 0 24 24"
            class="kw-btn--icon-only ml-24"
            size="24px"
          />
        </div>
        <div class="item">
          <kw-btn
            icon="alert_24|0 0 24 24"
            class="kw-btn--icon-only ml20"
            size="24px"
          />
        </div>
      </div>

      <!-- <div class="row items-center no-wrap kw-gnb--link-wrap">

      </div> -->
    </q-toolbar>
  </q-header>
</template>

<script setup>

const { dispatch } = useStore();
const { getRoutes } = useRouter();

const apps = Object.keys(
  getRoutes().filter((e) => e.meta.isGlobImport)
    .reduce((a, e) => { a[e.path.split('/')[1]] = null; return a; }, {}),
);

function updateSelected(app) {
  dispatch('app/selectApp', { applicationId: app });
}

updateSelected(apps[0]);
</script>
