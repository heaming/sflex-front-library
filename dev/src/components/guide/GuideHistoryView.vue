<template>
  <div class="kw-guide-section guide-history">
    <h3
      id="history"
      class="kw-guide-title"
    >
      History
      <kw-btn
        v-if="items.length > 1"
        class="ml8 guide-history--btn"
        dense
        :label="!openBool?'Full history':'Close history'"
        @click="openBool = !openBool"
      />
    </h3>
    <ul>
      <template
        v-for="(item, i) of items"
        :key="i"
      >
        <li
          v-show="i==0 || openBool"
        >
          <span class="text-left w110">
            {{ item.timestamp }}
          </span>
          <span class="text-center">
            {{ item.text }}
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const openBool = ref(false);
</script>

<style scoped>
.guide-history--btn {
  font-size: 10px !important;
  line-height: 12px !important;
  height: 17px;
  min-height: 17px !important;
  padding: 1px 5px !important;
}
</style>
