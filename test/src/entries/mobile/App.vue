<template>
  <mobile-layout>
    <template #default>
      <mobile-footer />
      <mobile-left-drawer />
      <mobile-stack-view />
    </template>
    <template #unauthenticated>
      <mobile-fallback-login />
    </template>
  </mobile-layout>
</template>

<script setup>
import {
  useSession,
  MobileLayout, MobileFooter, MobileLeftDrawer, MobileStackView, MobileFallbackLogin,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
