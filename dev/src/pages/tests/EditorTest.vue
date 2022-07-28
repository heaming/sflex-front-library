<template>
  <q-expansion-item
    icon="star"
    label="Sun Editor Test"
    class="bg-cyan"
    default-opened
  >
    <q-card class="bg-grey-2">
      <q-card-section>
        <kw-editor
          ref="kwEditorRef"
          v-model="testValue"
          label="test"
          rules="required"
          :disabled="disabled"
          :readonly="readonly"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn @click="randomizeText">
          random
        </q-btn>
        <q-btn @click="focus">
          focus
        </q-btn>
        <q-btn @click="toggleDisabled">
          disable
        </q-btn>
        <q-btn @click="toggleReadonly">
          readonly
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'KwWebEditorTest',
  setup() {
    const testValue = ref('');
    const kwEditorRef = ref(null);
    const disabled = ref(false);
    const readonly = ref(false);

    function toggleDisabled() {
      disabled.value = !disabled.value;
    }

    function toggleReadonly() {
      disabled.value = !readonly.value;
    }

    function randomizeText() {
      testValue.value = Math.random().toString();
    }
    function focus() {
      nextTick(() => {
        kwEditorRef.value.focus();
      });
    }
    return {
      kwEditorRef,
      testValue,
      randomizeText,
      focus,
      toggleDisabled,
      toggleReadonly,
      disabled,
    };
  },
};
</script>
