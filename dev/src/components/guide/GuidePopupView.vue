<template>
  <q-dialog
    :model-value="true"
    :transition-duration="0"
    persistent
    seamless
    square
    no-shake
    no-refocus
  >
    <kw-popup-container>
      <slot />
    </kw-popup-container>
  </q-dialog>
</template>

<script setup>
//
</script>
