<template>
  <q-layout view="hHh LpR fFf">
    <app-gnb />

    <app-lnb />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppGnb from '@/components/app/AppGnb.vue';
import AppLnb from '@/components/app/AppLnb.vue';

</script>
