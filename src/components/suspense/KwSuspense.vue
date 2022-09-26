<template>
  <template
    v-if="isLoadFailed"
  >
    <slot name="error" />
  </template>
  <suspense
    v-else
    :timeout="0"
    @resolve="onResolveSuspense"
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
    onResolve: {
      type: Function,
      default: undefined,
    },
    onError: {
      type: Function,
      default: undefined,
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

    function onResolveSuspense() {
      loadSpinnerIfUse(false);
      isLoaded.value = true;
      props.onResolve?.();
    }

    onErrorCaptured((e) => {
      if (!isLoaded.value) {
        isLoadFailed.value = true;
        loadSpinnerIfUse(false);
        props.onError?.(e);
      }
    });

    return {
      isLoaded,
      isLoadFailed,
      suspense,
      onResolveSuspense,
    };
  },
};
</script>
