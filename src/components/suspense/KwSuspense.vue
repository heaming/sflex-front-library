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
    const isLoading = ref(false);
    const isLoadFailed = ref(false);

    function loadSpinnerIfUse(value) {
      if (props.spinner) loadSpinner(value);
    }

    function suspense() {
      loadSpinnerIfUse(true);
      isLoading.value = true;
      isLoadFailed.value = false;
    }

    suspense();

    function onResolveSuspense() {
      loadSpinnerIfUse(false);
      isLoading.value = false;
      isLoadFailed.value = false;
      props.onResolve?.();
    }

    onErrorCaptured((e) => {
      if (isLoading.value) {
        loadSpinnerIfUse(false);
        isLoading.value = false;
        isLoadFailed.value = true;
        props.onError?.(e);
      }
    });

    onBeforeUnmount(() => {
      if (isLoading.value) loadSpinnerIfUse(false);
    });

    return {
      isLoadFailed,
      suspense,
      onResolveSuspense,
    };
  },
};
</script>
