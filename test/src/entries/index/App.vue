<template>
  <web-layout>
    <template #default>
      <web-gnb />
      <web-lnb />
      <web-tabs-view />
    </template>
    <template #unauthenticated>
      <web-fallback-login />
    </template>
  </web-layout>
</template>

<script setup>
import {
  useSession,
  WebLayout, WebGnb, WebLnb, WebTabsView, WebFallbackLogin,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
