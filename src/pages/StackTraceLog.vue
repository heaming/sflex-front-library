<template>
  <kw-popup
    size="xl"
    no-close-btn
  >
    <h1 class="mb10 text-center">
      {{ errorMessage }}
    </h1>
    <q-scroll-area>
      <p>
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

<style scoped lang="scss">
.q-scrollarea:deep {
  height: 460px;

  p {
    padding: 10px;
    white-space: pre;
    text-overflow: nowrap;
    background-color: #eee;
  }
}
</style>
