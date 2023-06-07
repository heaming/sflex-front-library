<template>
  <div v-if="!isPrd">
    <div :class="`${devEnv.toLowerCase()}-env-area`">
      <div :class="`${devEnv.toLowerCase()}-env-area__text`">
        <div :class="`${devEnv.toLowerCase()}-env-area__text-area`">
          {{ isLocal ? 'LOCAL' : mode.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DevEnvSign',
  props: {
    mode: { type: String, default: 'LOCAL' },
  },
  setup(props) {
    const isPrd = props.mode.toLowerCase() === 'prd' || props.mode.toLowerCase() === 'production';
    const isLocal = window.location.host.startsWith('localhost:');
    const devEnv = computed(() => (isLocal ? 'LOCAL' : props.mode.toUpperCase()));
    return {
      isPrd,
      isLocal,
      devEnv,
    };
  },
};
</script>
