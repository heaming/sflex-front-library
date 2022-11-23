<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      slider
    </h2>
    <p class="kw-guide-description">
      slider
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="sliderProps"
        title="sliderProps"
      />
      <kw-separator />
      <kw-slider
        v-model="model"
        v-bind="bindingProps"
      />
      <div>
        <span>modelValue: {{ model }}</span>
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-slider
        v-model="model"
        v-bind="bindingProps"
      />

      <div>
        <span>modelValue: {{ model }}</span>
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
const sliderProps = {
  labelValue: { type: [String, Number], default: undefined },
  name: { type: String, default: undefined },
  dark: { type: Boolean, default: undefined },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  innerMin: { type: Number, default: undefined },
  innerMax: { type: Number, default: undefined },
  step: { type: Number, default: 1 },
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
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-slider
        v-model="model"
        v-bind="bindingProps"
      />
      <div>
        <span>modelValue: {{ model }}</span>
      </div>`;

const model = ref(0);
</script>
