<template>
  <div v-if="!isPrd">
    <div class="dev-env-area">
      <div class="dev-env-text-area">
        <div class="dev-env-text">
          {{ isLocal ? 'LOCAL' : MODE.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DevEnvSign',

  setup() {
    const { MODE } = import.meta.env;
    const isPrd = MODE === 'prd' || MODE === 'production';
    const isLocal = window.location.host.startsWith('localhost:');
    return {
      isPrd,
      isLocal,
      MODE,
    };
  },
};
</script>
