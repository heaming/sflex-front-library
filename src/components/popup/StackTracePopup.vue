<template>
  <kw-popup
    class="stack-trace-popup"
    size="xl"
    :title="false"
    no-close-btn
  >
    <h1 class="stack-trace-popup__title">
      {{ errorMessage }}
    </h1>
    <q-scroll-area class="legacy-scroll-area">
      <p class="stack-trace-popup__content">
        {{ errorDetailMessage }}
      </p>
    </q-scroll-area>

    <template #action>
      <kw-btn
        negative
        :label="$t('MSG_BTN_CLOSE')"
        @click="cancel"
      />
    </template>
  </kw-popup>
</template>

<script>
import useModal from '../../composables/useModal';

export default {
  name: 'StackTracePopup',
  props: {
    errorMessage: {
      type: String,
      default: undefined,
    },
    errorDetailMessage: {
      type: String,
      default: undefined,
    },
  },

  setup() {
    const { cancel } = useModal();

    return {
      cancel,
    };
  },
};
</script>
