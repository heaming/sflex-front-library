<template>
  <q-field
    class="kw-editor"
    v-bind="styleClassAttrs"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    no-error-icon
  >
    <div
      ref="editorRef"
      v-bind="inheritedAttrs"
    />
  </q-field>
</template>

<script>
import createEditor from './private/createEditor';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwEditor',
  inheritAttrs: false,

  props: {
    ...useFieldProps,

    modelValue: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    fixedHeight: {
      type: String,
      default: undefined,
    }, // todo 나중에 한다.
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const fieldCtx = useField();
    const { value } = fieldCtx;
    const editorRef = ref(null);
    const editor = ref(null);

    function focus() {
      editor.value.core.focus();
    }

    function blur() {
      editor.value.core.blur();
    }

    function enable() {
      editor.value.enable();
    }

    function disable() {
      console.log('disable');
      editor.value.disable();
    }

    const isEmptyContents = (contents) => !/^<[^p]>*/.test(contents)
      && editor.value.util.onlyZeroWidthSpace(editor.value.getText());

    onMounted(() => {
      editor.value = createEditor(editorRef.value, {
        value: value.value,
        ...props.options,
      });

      editor.onChange = (contents) => {
        emit('update:modelValue', isEmptyContents(contents) ? '' : contents);
      };

      watch(() => props.disabled, (disabled) => {
        if (disabled) {
          disable();
        } else {
          enable();
        }
      }, { immediate: true });

      watch(() => props.readonly, (newVal) => {
        editor.value.readOnly(newVal);
      });

      watch(() => props.modelValue, (val) => {
        if (editor.value.getContents() !== val) {
          editor.value.setContents(val);
        }
      });
    });

    onBeforeUnmount(() => {
      editor.value.destroy();
      editor.value = null;
    });

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      editor,
      editorRef,
      focus,
      blur,
      disable,
    };
  },
};
</script>
