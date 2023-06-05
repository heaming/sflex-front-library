<template>
  <div v-if="!isPrd">
    <div class="dev-env-area">
      <div class="dev-env-text-area">
        <div class="dev-env-text">
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
    return {
      isPrd,
      isLocal,
    };
  },
};
</script>
