<template>
  <kw-page>
    <div class="result-area">
      <kw-action-top>
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
      </kw-action-top>

      <kw-form
        :key="formKey"
        ref="formRef"
        :autofocus="autofocus"
        :no-reset-focus="noResetFocus"
        :cols="cols"
        @submit="onSubmit"
        @reset="onReset"
      >
        <kw-form-row>
          <kw-form-item label="Input">
            <kw-input
              name="input"
              :rules="validateTest"
              placeholder="입력해주세요"
              :custom-messages="{ validateTest: '테스트', 'required': 'required' }"
            />
          </kw-form-item>
          <kw-form-item label="Input (TextArea)">
            <kw-input
              name="textarea"
              type="textarea"
              autogrow
              placeholder="입력해주세요"
              rules="required"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="Select">
            <kw-select
              :model-value="[]"
              :options="Array.from({length: 99}, (v, i) => String(i))"
              name="select"
              rules="required"
            />
          </kw-form-item>
          <kw-form-item label="Select (Multiple)">
            <kw-select
              :model-value="[]"
              :options="['A', 'B', 'C', 'D']"
              multiple
              name="selectMultiple"
              rules="required"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="Radio">
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
          </kw-form-item>
          <kw-form-item label="Radio (OptionGroup)">
            <kw-option-group
              name="radioOptionGroup"
              rules="required"
              type="radio"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="Checkbox">
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
          </kw-form-item>
          <kw-form-item label="Checkbox (OptionGroup)">
            <kw-option-group
              :model-value="[]"
              name="checkboxOptionGroup"
              rules="required"
              type="checkbox"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="Toggle">
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
          </kw-form-item>
          <kw-form-item label="Toggle (OptionGroup)">
            <kw-option-group
              :model-value="[]"
              name="toggleOptionGroup"
              rules="required"
              type="toggle"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="BtnToggle">
            <kw-btn-toggle
              name="btnToggle"
              rules="required"
              :options="['A', 'B', 'C', 'D']"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="DatePicker">
            <kw-date-picker
              name="datePicker"
              rules="required"
            />
          </kw-form-item>
          <kw-form-item label="TimePicker">
            <kw-time-picker
              name="timePicker"
              rules="required"
            />
          </kw-form-item>
        </kw-form-row>

        <kw-form-row>
          <kw-form-item label="DateRangePicker">
            <kw-date-range-picker
              name="dateRangePicker"
              rules="date_range_required|date_range_months:1"
            />
          </kw-form-item>
        </kw-form-row>

        <div class="row justify-end q-gutter-sm">
          <kw-btn
            class="text-capitalize"
            color="primary"
            outline
            size="md"
            label="Save"
            type="submit"
          />
          <kw-btn
            class="text-capitalize"
            color="secondary"
            outline
            size="md"
            label="Reset"
            type="reset"
          />
        </div>
      </kw-form>
    </div>
  </kw-page>
</template>

<script setup>
import { alert } from '~kw-lib';
import { http } from '../../../../src/plugins/http';

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
const cols = ref(4);

async function validateTest() {
  const res = await http.get('http://localhost:8080/api/v1/anonymous/sflex/common/common/health-check');
  return res.data !== 'OK';
}

function onSubmit(values) {
  console.log('onSubmit', values);
}

function onReset() {
  console.log('onReset');
}

</script>
