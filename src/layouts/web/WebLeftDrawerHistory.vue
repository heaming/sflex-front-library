<template>
  <div class="web-left-drawer__history">
    <web-left-drawer-title
      title="최근링크"
    />
  </div>
</template>

<script>
import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';

export default {
  name: 'WebLeftDrawerHistory',
  components: {
    WebLeftDrawerTitle,
  },

  setup() {
    return {

    };
  },
};
</script>
