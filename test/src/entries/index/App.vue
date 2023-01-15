<template>
  <web-layout>
    <template #default>
      <web-header>
        <template #logo="{ goToHome }">
          <img
            src="~~@assets/images/kstation_standard.svg"
            alt="K-Station"
            @click="goToHome()"
          >
        </template>
      </web-header>
      <web-footer />
      <web-left-drawer />
      <web-tab-view />
    </template>
    <template #unauthenticated>
      <web-fallback-login />
    </template>
  </web-layout>
</template>

<script setup>
import {
  useSession,
  WebLayout, WebHeader, WebFooter, WebLeftDrawer, WebTabView, WebFallbackLogin,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
