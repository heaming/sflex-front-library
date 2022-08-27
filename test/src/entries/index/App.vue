<template>
  <q-layout view="lHh Lpr lFf">
    <app-gnb />

    <app-lnb />

    <app-router-view />
  </q-layout>
</template>

<script setup>
import { useSession } from '~kw-lib';
import AppLnb from '~test/components/app/AppLnb.vue';
import AppGnb from '~test/components/app/AppGnb.vue';
import AppRouterView from '~test/components/app/AppRouterView.vue';

await useSession().isReady();
</script>
