<template>
  <q-rating
    ref="inputRef"
    class="kw-rating"
    :model-value="value"
    :size="size"
    :max="max"
    :icon="icon"
    :icon-half="iconHalf"
    :icon-selected="iconSelected"
    :color="color"
    :color-half="colorHalf"
    :color-selected="colorSelected"
    :no-reset="noReset"
    :no-dimming="noDimming"
    :readonly="readonly"
    :disable="disable"
    @update:model-value="onUpdateModelValue"
  >
    <template
      v-for="n in max"
      #[`tip-${n}`]="scoped"
    >
      <slot
        :name="`tip-${n}`"
        v-bind="scoped || {}"
      >
        <kw-tooltip v-if="normalizedTooltip[n-1]">
          {{ normalizedTooltip[n-1] }}
        </kw-tooltip>
      </slot>
    </template>
  </q-rating>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwRating',
  inheritAttrs: false,
  props: {
    // customize props
    ...useFieldProps,
    tooltip: { type: [String, Array], default: undefined },

    // fall through props
    modelValue: { type: Number, required: true },
    size: { type: String, default: undefined },
    max: { type: [String, Number], default: 5 },
    icon: { type: [String, Array], default: 'bookmark_off' },
    iconHalf: { type: [String, Array], default: undefined },
    iconSelected: { type: [String, Array], default: 'bookmark_on' },
    color: { type: [String, Array], default: undefined },
    colorHalf: { type: [String, Array], default: undefined },
    colorSelected: { type: [String, Array], default: undefined },
    noReset: { type: Boolean, default: undefined },
    noDimming: { type: Boolean, default: undefined },
    readonly: { type: Boolean, default: undefined },
    disable: { type: Boolean, default: undefined },
  },
  setup(props) {
    const fieldCtx = useField();
    const { value } = fieldCtx;
    const { styleClassAttrs } = useInheritAttrs();
    const onUpdateModelValue = (val) => {
      value.value = val;
    };
    const normalizedTooltip = computed(() => {
      if (!props.tooltip) {
        return [];
      }
      if (Array.isArray(props.tooltip)) {
        return props.tooltip;
      }
      return Array(props.max).fill(props.tooltip);
    });

    return {
      ...fieldCtx,
      styleClassAttrs,
      onUpdateModelValue,
      normalizedTooltip,
    };
  },
};
</script>
