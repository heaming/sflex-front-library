<template>
  <img
    v-if="fileUid"
    :alt="fileUid"
    :src="imgSrcByFileUid"
    :width="width"
    :height="height"
  >
  <q-img
    v-else
    class="kw-image"
    :class="imageClass"
    v-bind="styleClassAttrs"
    :loading="loading"
    :draggable="draggable"
    :no-spinner="noSpinner"
    :no-native-menu="noNativeMenu"
    :no-transition="noTransition"
    :alt="alt"
    :src="computedImgSrc"
    :srcset="srcset"
    :sizes="sizes"
    :placeholder-src="placeholderSrc"
    :ratio="ratio"
    :initial-ratio="initialRatio"
    :width="width"
    :height="height"
    :fit="fit"
    :position="position"
    :img-class="imgClass"
    :img-style="imgStyle"
    :spinner-color="spinnerColor"
    :spinner-size="spinnerSize"
    @load="onLoad"
    @error="onError"
  >
    <slot />
    <slot name="loading" />
    <slot name="error" />
  </q-img>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useImage from '../../composables/private/useImage';
import { getImageSrcFromFile } from '../../utils/file';

export default {
  name: 'KwImage',
  inheritAttrs: false,

  props: {
    loading: {
      type: String,
      default: 'lazy',
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    noSpinner: {
      type: Boolean,
      default: false,
    },
    noNativeMenu: {
      type: Boolean,
      default: false,
    },
    noTransition: {
      type: Boolean,
      default: true,
    },
    alt: {
      type: String,
      default: undefined,
    },
    src: {
      type: String,
      default: undefined,
    },
    srcset: {
      type: String,
      default: undefined,
    },
    sizes: {
      type: String,
      default: undefined,
    },
    placeholderSrc: {
      type: String,
      default: undefined,
    },
    onLoad: {
      type: Function,
      default: undefined,
    },
    onError: {
      type: Function,
      default: undefined,
    },
    ratio: {
      type: [String, Number],
      default: undefined,
    },
    initialRatio: {
      type: [String, Number],
      default: undefined,
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    fit: {
      type: String,
      default: 'cover',
    },
    position: {
      type: String,
      default: '50% 50%',
    },
    imgClass: {
      type: String,
      default: undefined,
    },
    imgStyle: {
      type: String,
      default: undefined,
    },
    spinnerColor: {
      type: String,
      default: 'primary',
    },
    spinnerSize: {
      type: String,
      default: '16px',
    },
    fileUid: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const imgCtx = useImage();
    const imageClass = computed(() => [
      props.clickable && 'cursor-pointer',
      props.disable && 'disabled',
    ]);

    const computedImgSrc = computed(() => {
      if (props.src) return imgCtx.getImageSourceUrl(props.src) ? imgCtx.getImageSourceUrl(props.src) : props.src;
      return null;
    });

    const imgSrcByFileUid = ref();

    watch(props, async () => {
      if (props.fileUid) {
        const src = await getImageSrcFromFile(props.fileUid);
        imgSrcByFileUid.value = src;
      }
    }, { deep: true, immediate: true });

    return {
      ...useInheritAttrs(),
      ...useImage,
      imageClass,
      computedImgSrc,
      imgSrcByFileUid,
    };
  },
};

</script>
