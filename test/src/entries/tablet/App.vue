<template>
  <tablet-layout>
    <template #default>
      <tablet-footer />
      <tablet-left-drawer />
      <tablet-stack-view />
    </template>
    <template #unauthenticated>
      <tablet-fallback-login
        tenant-id="TNT_WELLS"
        portal-id="MBL_DEF"
      />
    </template>
  </tablet-layout>
</template>

<script setup>
import {
  useSession,
  TabletLayout, TabletFooter, TabletLeftDrawer, TabletStackView, TabletFallbackLogin,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
