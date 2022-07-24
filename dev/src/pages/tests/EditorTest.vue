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
        />
      </q-card-section>
      <q-card-actions>
        <q-btn @click="randomizeText">
          random
        </q-btn>
        <q-btn @click="focus">
          focus
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-expansion-item>

  <div style="width: 100%;">
    <div
      class="row"
      style="flex-wrap: nowrap; height: 10px;"
    >
      <div
        class="bg-cyan-1 col-3"
        style="flex-shrink: 1;"
      />
      <div
        class="bg-cyan-2"
        style="width: 50px;"
      />
      <div
        class="bg-cyan-3"
        style="width: 50px;"
      />
      <div
        class="bg-cyan-4"
        style="width: 50px;"
      />
      <div
        class="bg-cyan-5"
        style="width: 50px;"
      />
      <div
        class="bg-cyan-6"
        style="width: 50px;"
      />
      <div
        class="bg-cyan-7 col-3"
        style="flex: 1 1 auto;"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KwWebEditorTest',
  setup() {
    const testValue = ref('');
    const kwEditorRef = ref(null);
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
    };
  },
};
</script>
