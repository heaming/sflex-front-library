<template>
  <q-separator
    v-if="!isDestroyed"
    class="kw-separator"
    v-bind="{...styleClassAttrs, ...computedProps}"
  />
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import usePermissions from '../../composables/private/usePermissions';

const availablePresets = {
  default: {
    spaced: '30px',
    vertical: false,
    inset: false,
    size: undefined,
    color: 'gray-5',
  },
  divider: {
    vertical: false,
    size: '8px',
    spaced: false,
    color: 'bg-body',
  },
};

export default {
  name: 'KwSeparator',
  inheritAttrs: false,

  props: {
    divider: { type: Boolean, default: false },

    spaced: { type: [Boolean, String], default: null },
    vertical: { type: Boolean, default: undefined },
    inset: { type: Boolean, default: undefined },
    size: { type: String, default: undefined },
    color: { type: String, default: undefined }, // can be transparent
  },

  setup(props) {
    const stylePreset = computed(() => {
      let preset = availablePresets.default;
      if (props.divider === true) { preset = availablePresets.divider; }
      return preset;
    });

    const computedProps = computed(() => ({
      spaced: props.spaced ?? stylePreset.value.spaced,
      vertical: props.vertical ?? stylePreset.value.vertical,
      inset: props.inset ?? stylePreset.value.inset,
      size: props.size ?? stylePreset.value.size,
      color: props.color ?? stylePreset.value.color,
    }));

    return {
      ...usePermissions(),
      ...useInheritAttrs(),
      computedProps,
    };
  },
};
</script>
