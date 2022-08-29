<template>
  <div class="kw-guide-section guide-history">
    <h3
      id="history"
      class="kw-guide-title"
    >
      History
      <kw-btn
        v-if="items.length > 1"
        class="kw-btn--line-gray kw-btn--h24 ml8"
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
