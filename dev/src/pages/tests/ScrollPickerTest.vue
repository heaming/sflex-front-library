<template>
  <kw-page>
    <div>
      {{ value }}
      <kw-scroll-picker
        v-model="value"
        class="w200 h400"
        :items="items"
      />
    </div>
  </kw-page>
</template>

<script setup>

const value = ref(0);
const items = Array.from({ length: 999 }, (v, i) => ({ value: i, label: i }));

</script>
