<template>
  <kw-page>
    <div>
      {{ value }}
      <scroll-picker
        v-model="value"
        class="w200 h200"
        :items="items"
      />
    </div>
  </kw-page>
</template>

<script setup>

const value = ref(0);
const items = Array.from({ length: 24 }, (v, i) => ({ value: i, label: i }));

</script>
