<template>
  <q-btn
    v-if="!isDestroyed"
    ref="btnRef"
    class="kw-btn"
    :ripple="false"
  >
    <slot />
  </q-btn>
</template>

<script>
import usePermissions from '../../composables/private/usePermissions';

export default {
  name: 'KwBtn',

  setup() {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    return {
      ...usePermissions(),
      btnRef,
      click,
    };
  },
};
</script>
