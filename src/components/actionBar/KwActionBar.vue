<template>
  <div class="kw-action-bar row">
    <div class="col row justify-start items-center">
      <slot name="left" />
    </div>
    <div class="col row justify-end items-center">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'KwActionBar',
};
</script>
