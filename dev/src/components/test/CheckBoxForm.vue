<template>
  <kw-form ref="formRef">
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="QUASAR">
        <q-checkbox
          v-model="trueModel"
        />
        <q-checkbox
          v-model="falseModel"
        />
        <q-checkbox
          v-model="indeterminateModel"
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
        />
      </kw-form-item>
      <kw-form-item label="QUASAR dense">
        <q-checkbox
          v-model="trueModel"
          dense
        />
        <q-checkbox
          v-model="falseModel"
          dense
        />
        <q-checkbox
          v-model="indeterminateModel"
          dense
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- quasar dense font-size-->
    <kw-form-row>
      <kw-form-item label="QUASAR 22px">
        <q-checkbox
          v-model="trueModel"
          size="22px"
        />
        <q-checkbox
          v-model="falseModel"
          size="22px"
        />
        <q-checkbox
          v-model="indeterminateModel"
          size="22px"
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          size="22px"
        />
      </kw-form-item>
      <kw-form-item label="QUASAR 22px dense">
        <q-checkbox
          v-model="trueModel"
          dense
          size="22px"
        />
        <q-checkbox
          v-model="falseModel"
          dense
          size="22px"
        />
        <q-checkbox
          v-model="indeterminateModel"
          dense
          size="22px"
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          dense
          size="22px"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- old-->
    <kw-form-row>
      <kw-form-item label="old">
        <q-checkbox
          v-model="trueModel"
          class="kw-checkbox--old"
        />
        <q-checkbox
          v-model="falseModel"
          class="kw-checkbox--old"
        />
        <q-checkbox
          v-model="indeterminateModel"
          class="kw-checkbox--old"
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          class="kw-checkbox--old"
        />
      </kw-form-item>
      <kw-form-item label="old dense">
        <q-checkbox
          v-model="trueModel"
          dense
          class="kw-checkbox--old"
        />
        <q-checkbox
          v-model="falseModel"
          dense
          class="kw-checkbox--old"
        />
        <q-checkbox
          v-model="indeterminateModel"
          dense
          class="kw-checkbox--old"
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          class="kw-checkbox--old"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="old disable">
        <q-checkbox
          v-model="trueModel"
          class="kw-checkbox--old"
          disable
        />
        <q-checkbox
          v-model="falseModel"
          class="kw-checkbox--old"
          disable
        />
        <q-checkbox
          v-model="indeterminateModel"
          class="kw-checkbox--old"
          disable
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          class="kw-checkbox--old"
          disable
        />
      </kw-form-item>
      <kw-form-item label="old dense disable">
        <q-checkbox
          v-model="trueModel"
          dense
          class="kw-checkbox--old"
          disable
        />
        <q-checkbox
          v-model="falseModel"
          dense
          class="kw-checkbox--old"
          disable
        />
        <q-checkbox
          v-model="indeterminateModel"
          dense
          class="kw-checkbox--old"
          disable
        />
        <q-checkbox
          v-model="boolModel"
          :label="boolLabel"
          class="kw-checkbox--old"
          dense
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-checkbox
          v-model="yModel"
        />
        <kw-checkbox
          v-model="nModel"
        />
        <kw-checkbox
          v-model="indeterminateModel"
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
        />
      </kw-form-item>
      <kw-form-item label="dense">
        <kw-checkbox
          v-model="yModel"
          dense
        />
        <kw-checkbox
          v-model="nModel"
          dense
        />
        <kw-checkbox
          v-model="indeterminateModel"
          dense
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- disable -->
    <kw-form-row>
      <kw-form-item label="disable">
        <kw-checkbox
          v-model="yModel"
          disable
        />
        <kw-checkbox
          v-model="nModel"
          disable
        />
        <kw-checkbox
          v-model="indeterminateModel"
          disable
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          disable
        />
      </kw-form-item>
      <kw-form-item label="disable dense">
        <kw-checkbox
          v-model="yModel"
          dense
          disable
        />
        <kw-checkbox
          v-model="nModel"
          dense
          disable
        />
        <kw-checkbox
          v-model="indeterminateModel"
          dense
          disable
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          dense
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- icon -->
    <kw-form-row>
      <kw-form-item label="icon">
        <kw-checkbox
          v-model="yModel"
          checked-icon="arrow_up"
          unchecked-icon="arrow_down"
          indeterminate-icon="close"
        />
        <kw-checkbox
          v-model="nModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
        <kw-checkbox
          v-model="indeterminateModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
      </kw-form-item>
      <kw-form-item label="icon dense">
        <kw-checkbox
          v-model="yModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
        <kw-checkbox
          v-model="nModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
        <kw-checkbox
          v-model="indeterminateModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- icon disable -->
    <kw-form-row>
      <kw-form-item label="icon disable">
        <kw-checkbox
          v-model="yModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="nModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="indeterminateModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
      </kw-form-item>
      <kw-form-item label="icon dense disable">
        <kw-checkbox
          v-model="yModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="nModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="indeterminateModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          dense
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item
        :colspan="2"
        label="icon disable"
      >
        <kw-checkbox
          v-model="yModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="nModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="indeterminateModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
        <kw-checkbox
          v-model="ynModel"
          :label="ynModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
          indeterminate-icon="close_24"
          disable
        />
      </kw-form-item>
    </kw-form-row>

    <kw-form-row>
      <kw-form-item
        :colspan="2"
        label="icon disable"
      >
        <kw-option-group
          :model-value="['A']"
          type="checkbox"
          :options="['A', 'B', 'C', 'D']"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { ref } from 'vue';
import { KwCheckbox } from '../../../../src/components';

const indeterminateModel = ref(undefined);
const trueModel = ref(true);
const falseModel = ref(false);
const boolModel = ref(true);
const boolLabel = computed(() => String(boolModel.value));
const yModel = ref('Y');
const nModel = ref('N');
const ynModel = ref('Y');

</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #eee;
  }
}
</style>
