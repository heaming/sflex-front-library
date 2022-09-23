<template>
  <template
    v-if="isLoadFailed"
  >
    <slot name="error" />
  </template>
  <suspense
    v-else
    :timeout="0"
    @resolve="onResolve"
  >
    <template #default>
      <slot />
    </template>
    <template #fallback>
      <slot name="fallback" />
    </template>
  </suspense>
</template>

<script>
import { loadSpinner } from '../../plugins/loading';

export default {
  name: 'KwSuspense',

  props: {
    spinner: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const isLoaded = ref(false);
    const isLoadFailed = ref(false);

    function loadSpinnerIfUse(value) {
      if (props.spinner) loadSpinner(value);
    }

    function suspense() {
      isLoaded.value = false;
      isLoadFailed.value = false;

      loadSpinnerIfUse(true);
    }

    suspense();

    function onResolve() {
      loadSpinnerIfUse(false);
      isLoaded.value = true;
    }

    onErrorCaptured(() => {
      if (!isLoaded.value) {
        loadSpinnerIfUse(false);
        isLoadFailed.value = true;
      }
    });

    return {
      isLoaded,
      isLoadFailed,
      suspense,
      onResolve,
    };
  },
};
</script>
