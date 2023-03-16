<template>
  <tablet-layout v-if="$g.platform.is.tablet">
    <template #default>
      <tablet-left-drawer />
      <tablet-right-drawer />
      <tablet-stack-view />
      <tablet-footer />
    </template>
    <template #unauthenticated>
      <tablet-fallback-login />
    </template>
  </tablet-layout>
  <mobile-layout v-if="$g.platform.is.mobile">
    <template #default>
      <mobile-footer />
      <mobile-left-drawer />
      <mobile-stack-view />
    </template>
    <template #unauthenticated>
      <mobile-fallback-login />
    </template>
  </mobile-layout>
  <web-layout v-if="$g.platform.is.desktop">
    <template #default>
      <web-header>
        <template #logo="{ goToHome }">
          <img
            :src="tenantLogoUrl"
            :alt="tenantLogoAlt"
            @click="goToHome()"
          >
        </template>
      </web-header>
      <web-left-drawer />
      <web-tab-view />
    </template>
    <template #unauthenticated>
      <web-fallback-login
        :tenant-id="tenantId"
      />
    </template>
  </web-layout>
</template>

<script setup>
import {
  useSession,
  TabletLayout, TabletFooter, TabletLeftDrawer, TabletStackView, TabletFallbackLogin, TabletRightDrawer,
  MobileLayout, MobileFooter, MobileLeftDrawer, MobileStackView, MobileFallbackLogin,
  WebLayout, WebHeader, WebLeftDrawer, WebTabView, WebFallbackLogin,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
