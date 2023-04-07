<template>
  <mobile-layout>
    <template #default>
      <mobile-footer />
      <mobile-stack-view />
    </template>
    <template #unauthenticated>
      <mobile-fallback-login
        tenant-id="TNT_WELLS"
        portal-id="MBL_DEF"
      />
    </template>
  </mobile-layout>
</template>

<script setup>
import {
  useSession,
  MobileLayout, MobileFooter, MobileStackView, MobileFallbackLogin,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
