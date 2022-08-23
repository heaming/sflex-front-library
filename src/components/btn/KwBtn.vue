<template>
  <q-btn
    ref="btnRef"
    class="kw-btn"
    :ripple="false"
  >
    <slot />
  </q-btn>
</template>

<script>

export default {
  name: 'KwBtn',

  setup() {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    return {
      btnRef,
      click,
    };
  },
};
</script>
