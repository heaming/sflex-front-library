<template>
  <kw-page class="q-pa-lg q-gutter-md">
    <div class="row justify-end q-gutter-sm">
      <kw-toggle
        v-model="autofocus"
        label="autofocus"
        :true-value="true"
        :false-value="false"
      />
      <kw-toggle
        v-model="noResetFocus"
        label="noResetFocus"
        :true-value="true"
        :false-value="false"
      />

      <span class="q-ml-lg self-center"> cols:</span>
      <kw-option-group
        v-model="cols"
        type="radio"
        label="cols"
        size="xs"
        :options="[1, 2, 3, 4, 5]"
      />

      <q-space />
      <kw-btn
        class="text-capitalize"
        outline
        size="md"
        label="init"
        @click="onClickInit"
      />
      <kw-btn
        class="text-capitalize"
        outline
        size="md"
        label="validate"
        @click="onClickValidate"
      />
      <kw-btn
        class="text-capitalize"
        outline
        size="md"
        label="isModified"
        @click="onClickIsModified"
      />
      <kw-btn
        class="text-capitalize"
        outline
        size="md"
        label="reset"
        @click="onClickReset"
      />
      <kw-btn
        class="text-capitalize"
        outline
        size="md"
        label="resetValidation"
        @click="onClickResetValidation"
      />
    </div>

    <q-card class="q-pa-md">
      <kw-search
        :key="formKey"
        ref="formRef"
        :autofocus="autofocus"
        :no-reset-focus="noResetFocus"
        :cols="cols"
        @search="onSearch"
        @reset="onReset"
      >
        <kw-search-row>
          <kw-search-item label="Input">
            <kw-input
              name="input"
              rules="required"
            />
          </kw-search-item>
          <kw-search-item label="Input (TextArea)">
            <kw-input
              name="textarea"
              type="textarea"
              autogrow
              rules="required"
            />
          </kw-search-item>
        </kw-search-row>

        <kw-search-row>
          <kw-search-item label="Select">
            <kw-select
              :model-value="[]"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-search-item>
          <kw-search-item label="Select (Multiple)">
            <kw-select
              :model-value="[]"
              :options="['A', 'B', 'C', 'D']"
              multiple
            />
          </kw-search-item>
        </kw-search-row>

        <kw-search-row>
          <kw-search-item label="Radio">
            <kw-field
              name="radio"
              rules="required"
            >
              <template #default="{ field }">
                <kw-radio
                  v-for="(item, i) of ['A', 'B', 'C', 'D']"
                  :key="i"
                  v-bind="field"
                  :val="item"
                />
              </template>
            </kw-field>
          </kw-search-item>
          <kw-search-item label="Radio (OptionGroup)">
            <kw-option-group
              name="radioOptionGroup"
              rules="required"
              type="radio"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-search-item>
        </kw-search-row>

        <kw-search-row>
          <kw-search-item label="Checkbox">
            <kw-field
              :model-value="[]"
              name="checkbox"
              rules="required"
            >
              <template #default="{ field }">
                <kw-checkbox
                  v-for="(item, i) of ['A', 'B', 'C', 'D']"
                  :key="i"
                  v-bind="field"
                  :val="item"
                />
              </template>
            </kw-field>
          </kw-search-item>
          <kw-search-item label="Checkbox (OptionGroup)">
            <kw-option-group
              :model-value="[]"
              name="checkboxOptionGroup"
              rules="required"
              type="checkbox"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-search-item>
        </kw-search-row>

        <kw-search-row>
          <kw-search-item label="Toggle">
            <kw-field
              :model-value="[]"
              name="radio"
              rules="required"
            >
              <template #default="{ field }">
                <kw-toggle
                  v-for="(item, i) of ['A', 'B', 'C', 'D']"
                  :key="i"
                  v-bind="field"
                  :val="item"
                />
              </template>
            </kw-field>
          </kw-search-item>
          <kw-search-item label="Toggle (OptionGroup)">
            <kw-option-group
              :model-value="[]"
              name="toggleOptionGroup"
              rules="required"
              type="toggle"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-search-item>
        </kw-search-row>

        <kw-search-row>
          <kw-search-item label="BtnToggle">
            <kw-btn-toggle
              name="btnToggle"
              rules="required"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-search-item>
        </kw-search-row>

        <kw-search-row>
          <kw-search-item label="DatePicker">
            <kw-date-picker
              name="datePicker"
              rules="required"
            />
          </kw-search-item>
          <kw-search-item label="TimePicker">
            <kw-time-picker
              name="timePicker"
              rules="required"
            />
          </kw-search-item>
        </kw-search-row>
      </kw-search>

      <kw-search
        :key="formKey"
        one-row
        @search="onSearch"
        @reset="onReset"
      >
        <kw-search-row>
          <kw-search-item label="Input">
            <kw-input
              name="input"
              rules="required"
            />
          </kw-search-item>
          <kw-search-item label="Input (TextArea)">
            <kw-input
              name="textarea"
              type="textarea"
              autogrow
              rules="required"
            />
          </kw-search-item>
        </kw-search-row>
      </kw-search>
    </q-card>
  </kw-page>
</template>

<script setup>
import { alert } from '~kw-lib';

const formKey = ref(0);
const formRef = ref();

function onClickInit() {
  formRef.value.init();
}

async function onClickValidate() {
  alert(await formRef.value.validate());
}

function onClickIsModified() {
  alert(formRef.value.isModified());
}

async function onClickReset() {
  await formRef.value.reset();
}

function onClickResetValidation() {
  formRef.value.resetValidation();
}

const autofocus = ref(false);

watch(autofocus, () => {
  formKey.value += 1;
});

const noResetFocus = ref(true);
const cols = ref(3);

function onSearch(values) {
  console.log('onSearch', values);
}

function onReset() {
  console.log('onReset');
}

</script>
