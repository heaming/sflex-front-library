<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="store.dispatch('app/toggleLnb')"
      />

      <q-toolbar-title>
        <div class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
          <a
            v-for="app of apps"
            :key="app.applicationId"
            href="javascript:void(0)"
            class="text-white"
            @click="store.dispatch('app/selectApp', app)"
          >
            {{ app.applicationName }}
          </a>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup>

const store = useStore();
const apps = store.getters['meta/getApps'];

if (apps.length) {
  store.dispatch('app/selectApp', apps[0]);
}
</script>
