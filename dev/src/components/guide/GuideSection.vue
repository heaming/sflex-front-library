<template>
  <div class="kw-guide-section">
    <h3
      v-if="title"
      :id="title"
      class="kw-guide-title"
    >
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="kw-guide-description"
    >
      {{ description }}
    </p>
    <q-card>
      <div class="kw-guide-example">
        <slot />
      </div>
      <guide-code-view
        v-if="guideCode"
        :code-value="guideCode"
        lang="vue"
      />
    </q-card>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: { type: String, default: undefined },
  description: { type: String, default: undefined },
  guideCode: { type: String, default: undefined },
});
</script>

<style lang="scss" scoped>
.kw-guide-code {
  display: none;

  &.active {
    display: block;
  }
}
</style>
