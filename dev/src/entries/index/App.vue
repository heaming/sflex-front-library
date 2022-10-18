<template>
  <q-layout view="hHh LpR fFf">
    <app-gnb />

    <app-lnb />

    <app-router-view />
  </q-layout>
</template>

<script setup>
import AppGnb from '~dev/components/app/AppGnb.vue';
import AppLnb from '~dev/components/app/AppLnb.vue';

import {
  AppRouterView,
} from '~kw-lib';

</script>
