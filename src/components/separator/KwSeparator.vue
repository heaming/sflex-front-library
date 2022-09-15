<template>
  <q-separator
    class="kw-separator"
    :spaced="angleSpaced"
    :inset="inset"
    :vertical="vertical"
    :size="size"
    :color="color"
  />
</template>

<script>
export default {
  name: 'KwSeparator',

  props: {
    spaced: { type: [Boolean, String], default: '30px' },
    inset: { type: [Boolean, String], default: false },
    vertical: { type: Boolean, default: false },
    size: { type: String, default: undefined },
    color: { type: String, default: 'grey-5' }, // can be transparent
  },

  setup(props) {
    const angleSpaced = props.vertical ? '16px' : '30px';
    return { angleSpaced };
  },
};
</script>
