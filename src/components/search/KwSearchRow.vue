<template>
  <div
    v-show="showing"
    class="kw-form-row"
  >
    <slot />
  </div>
</template>

<script>
import useFormRow from '../../composables/private/useFormRow';
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';

export default {
  name: 'KwSearchRow',

  setup() {
    useFormType(FORM_TYPE.SEARCH);

    return {
      ...useFormRow(),
    };
  },
};
</script>
