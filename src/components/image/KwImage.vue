<template>
  <q-img
    class="kw-image"
    :class="imageClass"
    v-bind="styleClassAttrs"
    :loading="loading"
    :draggable="draggable"
    :no-spinner="noSpinner"
    :no-native-menu="noNativeMenu"
    :no-transition="noTransition"
    :alt="alt"
    :src="imgSrc(src)"
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
  },

  setup(props) {
    const imgCtx = useImage();
    const imageClass = computed(() => [
      props.clickable && 'cursor-pointer',
      props.disable && 'disabled',
    ]);

    const imgSrc = (src) => (imgCtx.getImageSourceUrl(src) ? imgCtx.getImageSourceUrl(src) : src);

    return {
      ...useInheritAttrs(),
      ...useImage,
      imageClass,
      imgSrc,
    };
  },
};

</script>