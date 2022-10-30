<template>
  <kw-popup
    class="stack-trace-log"
    size="xl"
    no-close-btn
  >
    <h1 class="stack-trace-log__title">
      {{ errorMessage }}
    </h1>
    <q-scroll-area>
      <p class="stack-trace-log__content">
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

<script setup>
import useModal from '../composables/useModal';

const { cancel } = useModal();

defineProps({
  errorMessage: {
    type: String,
    default: undefined,
  },
  errorDetailMessage: {
    type: String,
    default: undefined,
  },
});
</script>

<style lang="scss">
.stack-trace-log {
  &__title {
    font-size: 18px;
    font-weight: 700;
    color: $black1;
    text-align: center;
  }

  &__content {
    padding: 10px;
    white-space: pre;
    text-overflow: nowrap;
    background-color: #eee;
  }

  .q-scrollarea {
    height: 400px;
    margin-top: 10px;
  }
}
</style>
