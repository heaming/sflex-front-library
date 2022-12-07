<template>
  <web-layout>
    <template #default>
      <web-router-view />
    </template>
    <template #unauthenticated>
      <web-fallback-login />
    </template>
  </web-layout>
</template>

<script setup>
import {
  useSession,
  WebLayout, WebRouterView, WebFallbackLogin,
} from '~kw-lib';

await useSession().isReady();

</script>
