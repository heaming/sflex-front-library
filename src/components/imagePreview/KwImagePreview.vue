<template>
  <div class="gallery_area">
    <kw-icon
      name="arrow_left"
      clickable
      @click="rotateImage(1)"
    />
    <div
      id="gallery_container"
    >
      <div id="gallery">
        <ul class="pictures">
          <li
            v-for="(image, imageIdx) in props.images"
            :key="imageIdx"
          >
            <img
              v-show="false"
              :src="image.src"
              :data-original="image.src"
              alt="test"
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

<script setup>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const props = defineProps({
  images: { type: Array, default: () => [] },
});

const viewer = ref();

function rotateImage(number) {
  if (number === 1) viewer?.value.next(true);
  else viewer?.value.prev(true);
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
  console.log(viewer.value);
}

onMounted(() => {
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

defineExpose({
  zoomIn,
  zoomOut,
});
</script>
