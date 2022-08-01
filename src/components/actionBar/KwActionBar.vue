<template>
  <div class="kw-action-bar row">
    <div class="col row justify-start">
      <slot name="left" />
    </div>
    <div class="col row justify-end">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'KwActionBar',
};
</script>
