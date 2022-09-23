<template>
  <div class="kw-action-bar">
    <div class="kw-action-bar__left">
      <slot name="left" />
    </div>
    <div class="kw-action-bar__contents">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'KwActionBar',
};
</script>
