<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-file
          v-model="arrayValue"
          :label="'label'"
        >
          default
        </q-file>
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-file
          v-model="arrayValue"
          :label="'default'"
        >
          default
          <template #file="{file}">
            {{ file.name }}
          </template>
        </kw-file>
      </kw-form-item>
    </kw-form-row>
    <!-- multiple -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-file
          v-model="arrayValue"
          multiple
          :label="'default'"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwFile } from '../../../../src/components';

const arrayValue = ref([]);

</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #fff;
  }
}
</style>
