<template>
  <div class="kw-guide-section">
    <h3
      id="history"
      class="kw-guide-title"
    >
      History
    </h3>
    <q-markup-table class="kw-guide-table">
      <tbody>
        <tr
          v-for="(item, i) of items"
          :key="i"
        >
          <td class="text-left">
            {{ item.text }}
          </td>
          <td class="text-center">
            {{ item.timestamp }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
