<template>
  <div class="kw-form-row">
    <slot />
  </div>
</template>

<script>
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';

export default {
  name: 'KwFormRow',

  setup() {
    useFormType(FORM_TYPE.FORM);

    return {

    };
  },
};
</script>
