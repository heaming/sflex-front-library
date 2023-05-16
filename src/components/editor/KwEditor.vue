<template>
  <q-field
    class="kw-field kw-editor"
    v-bind="styleClassAttrs"
    :label="undefined"
    :error="invalid"
    :disable="disable"
    no-error-icon
    outlined
  >
    <template #control>
      <div
        ref="editorRef"
        v-bind="inheritedAttrs"
      />
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      {{ invalidMessage }}
      <kw-tooltip
        anchor="center middle"
        :offset="[0, 3]"
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>
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
    disable: {
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

  setup(props) {
    const editorRef = ref();
    const fieldCtx = useField();
    const { value } = fieldCtx;

    let editor;

    function focus() {
      editor.core.focus();
    }

    function blur() {
      editor.core.blur();
    }

    function getEditor() {
      return editor;
    }

    const isEmptyContents = (contents) => !/^<[^p]>*/.test(contents)
      && editor.util.onlyZeroWidthSpace(editor.getText());

    onMounted(() => {
      editor = createEditor(editorRef.value, {
        value: value.value,
        ...props.options,
      });

      editor.onChange = (contents) => {
        value.value = isEmptyContents(contents) ? '' : contents;
      };

      watch(value, (val) => {
        if (editor.getContents() !== val) {
          editor.setContents(val);
        }
      });

      watch(() => props.disable, (val) => {
        // eslint-disable-next-line no-unused-expressions
        val ? editor.disable() : editor.enable();
      }, { immediate: true });

      watch(() => props.readonly, (val) => {
        editor.readOnly(val);
      }, { immediate: true });
    });

    onBeforeUnmount(() => {
      editor.destroy();
      editor = null;
    });

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      editor,
      editorRef,
      focus,
      blur,
      getEditor,
    };
  },
};
</script>
