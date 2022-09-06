<template>
  <div
    v-show="showing"
    class="kw-form-row"
    :class="rowClass"
  >
    <slot />
  </div>
</template>

<script>
import useFormRow from '../../composables/private/useFormRow';
import useFormExpanded from '../../composables/private/useFormExpanded';
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';

export default {
  name: 'KwSearchRow',

  props: {
    cols: { type: Number, default: undefined },
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
