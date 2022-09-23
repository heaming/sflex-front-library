<template>
  <div class="kw-action">
    <div class="kw-action__left">
      <slot name="left" />
    </div>
    <div class="kw-action__contents">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'KwAction',
};
</script>
