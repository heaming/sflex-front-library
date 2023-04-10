<template>
  <tablet-layout v-if="$g.platform.is.tablet">
    <template #default>
      <tablet-left-drawer />
      <tablet-stack-view />
    </template>
    <template #unauthenticated>
      <tablet-fallback-login />
    </template>
  </tablet-layout>
  <mobile-layout v-if="$g.platform.is.mobile">
    <template #default>
      <mobile-footer />
      <mobile-stack-view />
    </template>
    <template #unauthenticated>
      <mobile-fallback-login />
    </template>
  </mobile-layout>
  <web-layout v-if="$g.platform.is.desktop">
    <template #custdomain>
      <cust-doamin-error />
    </template>
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
  TabletLayout, TabletLeftDrawer, TabletStackView, TabletFallbackLogin,
  MobileLayout, MobileFooter, MobileStackView, MobileFallbackLogin,
  WebLayout, WebHeader, WebLeftDrawer, WebTabView, WebFallbackLogin, CustDoaminError,
} from '~kw-lib';

const {
  isReady,
} = useSession();

await isReady();
</script>
