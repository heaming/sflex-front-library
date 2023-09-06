<template>
  <video-player
    ref="playerRef"
    :src="src"
    :poster="poster"
    controls
    :autoplay="autoplay"
    @ready="initVideo($event)"
  />
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue';

import videojs from 'video.js';
import 'videojs-landscape-fullscreen';

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
  setup() {
    return {
      initVideo(event) {
        const player = videojs.getPlayer(event.target);
        player.landscapeFullscreen();
      },
    };
  },
};
</script>
