<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        aria-label="Menu"
        @click="dispatch('app/toggleLnb')"
      />

      <q-toolbar-title>
        <div class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
          <a
            v-for="app of apps"
            :key="app"
            href="javascript:void(0)"
            class="text-white text-uppercase"
            @click="updateSelected(app)"
          >
            {{ app }}
          </a>
        </div>
      </q-toolbar-title>
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
