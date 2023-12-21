<template>
  <div
    class="kw-form-row"
    :class="{rowClass : true, 'no-show' : !showing }"
  >
    <slot />
  </div>
</template>

<script>
import useFormRow, { useFormRowProps } from '../../composables/private/useFormRow';
import useFormExpanded from '../../composables/private/useFormExpanded';
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';

export default {
  name: 'KwSearchRow',

  props: {
    ...useFormRowProps,
  },

  setup() {
    useFormType(FORM_TYPE.SEARCH);

    return {
      ...useFormRow(),
      ...useFormExpanded(),
    };
  },
};
</script>
