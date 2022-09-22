<template>
  <app-layout>
    <app-gnb />

    <app-lnb />

    <app-tabs-view />
  </app-layout>
</template>

<script setup>
import {
  useSession,
  AppLayout, AppGnb, AppLnb, AppTabsView,
} from '~kw-lib';

await useSession().isReady();
</script>
