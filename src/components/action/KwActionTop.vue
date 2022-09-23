<template>
  <kw-action class="kw-action--top">
    <template
      v-if="$slots.left"
      #left
    >
      <slot name="left" />
    </template>
    <template
      v-if="$slots.default"
      #default
    >
      <slot />
    </template>
  </kw-action>
</template>

<script>
export default {
  name: 'KwActionTop',
};
</script>
