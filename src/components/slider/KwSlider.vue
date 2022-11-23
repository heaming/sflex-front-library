<template>
  <q-slider
    v-bind="styleClassAttrs"
    class="kw-slider"
    :model-value="modelValue"
    :label-value="labelValue"
    :name="name"
    :dark="dark"
    :min="min"
    :max="max"
    :inner-min="innerMin"
    :inner-max="innerMax"
    :step="step"
    :snap="snap"
    :vertical="vertical"
    :reverse="reverse"
    :hide-selection="hideSelection"
    :color="color"
    :marker-labels-class="markerLabelsClass"
    :label="label"
    :label-color="labelColor"
    :label-text-color="labelTextColor"
    :label-always="labelAlways"
    :switch-label-side="switchLabelSide"
    :markers="markers"
    :marker-labels="markerLabels"
    :switch-marker-labels-side="switchMarkerLabelsSide"
    :track-img="trackImg"
    :track-color="trackColor"
    :inner-track-img="innerTrackImg"
    :inner-track-color="innerTrackColor"
    :selection-color="selectionColor"
    :selection-img="selectionImg"
    :thumb-size="thumbSize"
    :track-size="trackSize"
    :disable="disable"
    :readonly="readonly"
    :dense="dense"
    :tabindex="tabindex"
    :thumb-color="thumbColor"
    :thumb-path="thumbPath"
    @pan="$emit('pan', $event)"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  />
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwSlider',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    modelValue: { type: [Number, null], required: true },
    labelValue: { type: [String, Number], default: undefined },
    name: { type: String, default: undefined },
    dark: { type: Boolean, default: undefined },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    innerMin: { type: Number, default: undefined },
    innerMax: { type: Number, default: undefined },
    step: { type: Number, default: 1, validator: (v) => v >= 0 },
    snap: { type: Boolean, default: undefined },
    vertical: { type: Boolean, default: undefined },
    reverse: { type: Boolean, default: false },
    hideSelection: { type: Boolean, default: undefined },
    color: { type: String, default: undefined },
    markerLabelsClass: { type: String, default: undefined },
    label: { type: Boolean, default: undefined },
    labelColor: { type: String, default: undefined },
    labelTextColor: { type: String, default: undefined },
    labelAlways: { type: Boolean, default: undefined },
    switchLabelSide: { type: Boolean, default: undefined },
    markers: { type: [Boolean, Number], default: undefined },
    markerLabels: { type: [Boolean, Array, Object, Function], default: false },
    switchMarkerLabelsSide: { type: Boolean, default: undefined },
    trackImg: { type: String, default: undefined },
    trackColor: { type: String, default: undefined },
    innerTrackImg: { type: String, default: undefined },
    innerTrackColor: { type: String, default: undefined },
    selectionColor: { type: String, default: undefined },
    selectionImg: { type: String, default: undefined },
    thumbSize: { type: String, default: '20px' },
    trackSize: { type: String, default: '4px' },
    disable: { type: Boolean, default: undefined },
    readonly: { type: Boolean, default: undefined },
    dense: { type: Boolean, default: undefined },
    tabindex: { type: [String, Number], default: undefined },
    thumbColor: { type: String, default: undefined },
    thumbPath: {
      type: String,
      default: 'M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
    },
  },
  emits: [
    'pan',
    'update:modelValue',
    'change',
  ],
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      styleClassAttrs,
    };
  },
};
</script>
