<template>
  <div
    class="gallery_area"
  >
    <kw-icon
      name="arrow_left"
      clickable
      @click="rotateImage(1)"
    />
    <div
      id="gallery-container"
    >
      <div id="gallery">
        <ul class="pictures">
          <li
            v-for="(img, imgIdx) in imgs"
            :key="imgIdx"
          >
            <img
              v-show="false"
              :src="img.src"
              :data-original="img.src"
              alt=""
            >
          </li>
        </ul>
      </div>
    </div>
    <kw-icon
      name="arrow_right"
      clickable
      @click="rotateImage(-1)"
    />
  </div>
</template>

<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { getImageSrcFromFile } from '../../utils/file';

export default {
  name: 'KwImagePreview',
  props: {
    images: { type: Array, default: () => [] },
  },
  emits: ['update:image-index'],
  setup(props, { emit }) {
    const viewer = ref();
    const imgs = ref([]);

    async function initImages() {
      const promises = props.images.map(async (image) => {
        const temp = {};
        temp.file = image;
        temp.src = await getImageSrcFromFile(image);
        imgs.value.push(temp);
      });

      await Promise.all(promises);
    }

    function rotateImage(number) {
      if (number === 1) viewer?.value.next(true);
      else viewer?.value.prev(true);

      emit('update:image-index', { curr: viewer?.value.index, total: viewer?.value.images?.length });
    }

    function makeViewer() {
      const gallery = document.getElementById('gallery');
      viewer.value = new Viewer(gallery, {
        inline: true,
        toolbar: false,
        backdrop: false,
        navbar: false,
        title: false,
        button: false,
        transition: false,
        container: '#gallery_container',
        fullscreen: false,
      });

      viewer?.value.show();
    }

    onMounted(async () => {
      await initImages();
      makeViewer();
    });

    onBeforeUnmount(() => {
      viewer?.value.destroy();
    });

    function zoomIn() {
      viewer?.value.zoom(0.5);
    }

    function zoomOut() {
      viewer?.value.zoom(-0.5);
    }

    return {
      zoomIn,
      zoomOut,
      viewer,
      imgs,
      rotateImage,
    };
  },
};
</script>
