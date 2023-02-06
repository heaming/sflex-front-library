<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Icon
    </h2>
    <p class="kw-guide-description">
      Icon
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="imageProps"
        title="imageProps"
      />
      <kw-separator />
      <kw-image
        v-bind="bindingProps"
      >
        <div>
          caption
        </div>
      </kw-image>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-icon
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
const imageProps = {
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
  onLoad: {
    type: Function,
    default: () => { console.log('loaded'); },
  },
  onError: {
    type: Function,
    default: () => { console.log('error'); },
  },
};

const bindingProps = ref({
  src: 'block_type1.png',
  width: '750px',
  height: '450px',

  onLoad: () => { console.log('loaded'); },
  onError: () => { console.log('error'); },
});

const defaultCode = `
      <kw-icon
        v-bind="bindingProps"
      />`;
</script>
