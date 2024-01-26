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
import dummyImg from './img_dummy.png';
import { getImageSrcFromFile } from '../../utils/file';
import useGlobal from '../../composables/useGlobal';

export default {
  name: 'KwImagePreview',
  props: {
    images: { type: Array, default: () => [] },
    currIdx: { type: Number, default: 0 },
  },
  emits: ['update:image-index'],
  setup(props, { emit }) {
    const viewer = ref();
    const imgs = ref([]);
    const showTooltip = ref(false);
    const errorImgCnt = ref(0);
    const { alert } = useGlobal();
    async function initImages() {
      errorImgCnt.value = 0;
      const promises = props.images.map(async (image) => {
        const temp = {};
        if (image.fileUid) {
          temp.file = image;
          const res = await getImageSrcFromFile(image.fileUid, true);
          if (res === false) {
            errorImgCnt.value++;
            temp.src = dummyImg;
          } else temp.src = res;
        } else {
          temp.file = image;
          temp.src = URL.createObjectURL(image.file.nativeFile);
        }
        imgs.value.push(temp);
      });

      await Promise.all(promises);

      const tempIdx = props.images.map((image) => image.fileUid);
      imgs.value.sort((a, b) => tempIdx.indexOf(a.file.fileUid) - tempIdx.indexOf(b.file.fileUid));

      if (errorImgCnt.value > 0) {
        alert('일부 파일이 존재하지 않아,\n기본 이미지 파일로 대체되었습니다.');
      }
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
        initialCoverage: 1,
        className: 'mt40',
      });

      viewer?.value?.show();
      viewer?.value?.view(props.currIdx);
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
