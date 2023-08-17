<template>
  <vue-drawing-canvas
    ref="drawingCanvas"
    :image="image"
    :canvas-id="canvasId"
    :width="width"
    :height="height"
    :stroke-type="strokeType"
    :fill-shape="fillShape"
    :eraser="eraser"
    :color="color"
    :line-width="lineWidth"
    :line-cap="lineCap"
    :line-join="lineJoin"
    :lock="lock"
    :background-color="backgroundColor"
    :background-image="backgroundImage"
    :initial-image="initialImage"
    :additional-images="additionalImages"
    :classes="classes"
    :styles="styles"
    :watermark="watermark"
    :save-as="saveAs"
    :output-width="outputWidth"
    :output-height="outputHeight"
    @mousemove="$emit('mousemove', $event)"
  />
</template>

<script>
import VueDrawingCanvas from 'vue-drawing-canvas';

export default {
  name: 'KwDrawingCanvas',
  components: { VueDrawingCanvas },
  props: {
    canvasId: { type: String, default: 'VueDrawingCanvas' },
    width: { type: [String, Number], default: 600 },
    height: { type: [String, Number], default: 400 },
    image: { type: String, default: undefined },
    strokeType: { type: String, default: 'dash' },
    fillShape: { type: Boolean, default: false },
    eraser: { type: Boolean, default: false },
    color: { type: String, default: '#000000' },
    lineWidth: { type: Number, default: 5 },
    lineCap: { type: String, default: 'round' },
    lineJoin: { type: String, default: 'miter' },
    lock: { type: Boolean, default: false },
    backgroundColor: { type: String, default: '#FFFFFF' },
    backgroundImage: { type: String, default: undefined },
    initialImage: { type: Array, default: () => [] },
    additionalImages: { type: Array, default: () => [] },
    classes: { type: [Array, String, Object], default: undefined },
    styles: { type: [Array, String, Object], default: undefined },
    watermark: { type: Object, default: undefined },
    saveAs: { type: String, default: 'png' },
    outputWidth: { type: Number, default: undefined },
    outputHeight: { type: Number, default: undefined },
  },
  emits: ['mousemove'],
  setup() {
    const drawingCanvas = ref();
    function getCanvas() {
      return drawingCanvas.value;
    }
    return {
      drawingCanvas,
      getCanvas,
    };
  },
};
</script>
