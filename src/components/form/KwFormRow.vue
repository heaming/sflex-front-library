<template>
  <div
    class="kw-form-row"
    :class="rowClass"
  >
    <slot />
  </div>
</template>

<script>
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';
import useFormRow, { useFormRowProps } from '../../composables/private/useFormRow';

export default {
  name: 'KwFormRow',

  props: {
    ...useFormRowProps,
  },

  setup() {
    useFormType(FORM_TYPE.FORM);

    return {
      ...useFormRow(),
    };
  },
};
</script>
