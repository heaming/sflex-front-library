<template>
  <q-field
    class="kw-field"
    :error="invalid"
    :error-message="invalidMessage"
    no-error-icon
  >
    <template #control>
      <slot />
    </template>
  </q-field>
</template>

<script>
import useFieldStateWrap from '../../composables/private/useFieldStateWrap';

export default {
  name: 'KwFieldWrap',

  setup() {
    return {
      ...useFieldStateWrap(),
    };
  },
};
</script>
