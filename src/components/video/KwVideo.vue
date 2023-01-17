<template>
  <video-player
    :src="src"
    :poster="poster"
    controls
    :autoplay="autoplay"
    :loop="loop"
  />
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue';

export default {
  name: 'KwVideo',
  components: {
    VideoPlayer,
  },
  props: {
    src: { type: String, default: undefined },
    poster: { type: String, default: undefined },
    autoplay: { type: Boolean, default: false },
    loop: { type: Boolean, default: false },
  },
};
</script>
