<template>
  <div
    class="gallery_area"
  >
    <q-btn
      class="prev-arrow"
      icon="arrow_left_24"
      clickable
      unelevated
      borderless
      :disable="viewer?.index === 0"
      @click="rotateImage(-1)"
    />
    <div
      id="gallery-container"
    >
      <div class="gallery-caption">
        <p @click="showTooltip = !showTooltip">
          {{ imgs[viewer?.index]?.file?.fileName }}
          <kw-tooltip
            v-model="showTooltip"
            show-when-ellipsised
          >
            {{ imgs[viewer?.index]?.file?.fileName }}
          </kw-tooltip>
        </p>
      </div>
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
    <q-btn
      class="next-arrow"
      icon="arrow_right_24"
      clickable
      unelevated
      borderless
      :disable="viewer?.index === imgs.length - 1"
      @click="rotateImage(1)"
    />
  </div>
</template>

<script>
import Viewer from 'viewerjs';
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
    const showTooltip = ref(false);
    async function initImages() {
      const promises = props.images.map(async (image) => {
        const temp = {};
        if (image.fileUid) {
          temp.file = image;
          temp.src = await getImageSrcFromFile(image.fileUid);
        } else {
          temp.file = image;
          temp.src = URL.createObjectURL(image.file.nativeFile);
        }
        imgs.value.push(temp);
      });

      await Promise.all(promises);

      const tempIdx = props.images.map((image) => image.fileUid);
      imgs.value.sort((a, b) => tempIdx.indexOf(a.file.fileUid) - tempIdx.indexOf(b.file.fileUid));
    }

    function rotateImage(number) {
      if (number === 1) viewer?.value?.next(true);
      else viewer?.value?.prev(true);

      emit('update:image-index', { curr: viewer?.value?.index, total: viewer?.value?.images?.length });
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
        toggleOnDblclick: false,
        slideOnTouch: false,
      });

      viewer?.value?.show();
    }

    onMounted(async () => {
      await initImages();
      makeViewer();
    });

    onBeforeUnmount(() => {
      viewer?.value?.destroy();
    });

    function zoomIn() {
      viewer?.value?.zoom(0.1);
    }

    function zoomOut() {
      viewer?.value?.zoom(-0.1);
    }

    function zoomTo(ratio) {
      viewer?.value?.zoomTo(ratio);
    }

    return {
      zoomIn,
      zoomOut,
      zoomTo,
      viewer,
      imgs,
      rotateImage,
      showTooltip,
    };
  },
};
</script>
