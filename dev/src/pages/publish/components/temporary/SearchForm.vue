<template>
  <kw-page>
    <kw-search
      :key="formKey"
      ref="formRef"
      :autofocus="autofocus"
      :no-reset-focus="noResetFocus"
      :cols="cols4"
      class="kw-py-2 kw-px-4 kw-ma-4"
    >
      <kw-form-row>
        <kw-form-item label="지점명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
        <kw-form-item
          label="담당자명"
          class="essential"
        >
          <!-- 필수 입력의 경우 essential 클래스 추가-->
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
        <kw-form-item label="지역명">
          <kw-input
            v-model="readonlyValue"
            name="input"
            readonly
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
        <kw-form-item label="권역명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
            disable
          />
        </kw-form-item>
      </kw-form-row>

      <kw-form-row>
        <kw-form-item
          label="선택 샘플"
          class="essential"
        >
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
            placeholder="선택해 주세요."
            name="select"
            rules="required"
          />
        </kw-form-item>
        <kw-form-item label="다중선택 샘플 (readonly)">
          <kw-select
            :model-value="readonlySelect"
            :options="['A', 'B', 'C', 'D']"
            multiple
            name="selectMultiple"
            rules="required"
            readonly
          />
        </kw-form-item>
        <kw-form-item label="다중선택 샘플 (disable)">
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
            multiple
            name="selectMultiple"
            rules="required"
            disable="disable"
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

        <kw-form-item label="OptionGroup (readonly)">
          <kw-option-group
            :model-value="readonlyRadio"
            name="radioOptionGroup"
            rules="required"
            type="radio"
            :options="['김엄마', '김마', '마']"
            disable
          />
        </kw-form-item>
        <kw-form-item label="optiongroup (disable)">
          <kw-option-group
            name="radioOptionGroup"
            rules="required"
            type="radio"
            :options="['김엄마', '김마', '마']"
            disable
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
        <kw-form-item label="OptionGroup (readonly)">
          <kw-option-group
            :model-value="readonlyCheckbox"
            name="checkboxOptionGroup"
            rules="required"
            type="checkbox"
            :options="['A', 'B', 'C', 'D']"
            disable
          />
        </kw-form-item>
        <kw-form-item label="OptionGroup (disable)">
          <kw-option-group
            :model-value="[]"
            name="checkboxOptionGroup"
            rules="required"
            type="checkbox"
            :options="['A', 'B', 'C', 'D']"
            disable
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
      </kw-form-row>

      <kw-form-row>
        <kw-form-item label="DateRangePicker">
          <kw-date-range-picker
            name="dateRangePicker"
            rules="date_range_required|date_range_months:1"
          />
        </kw-form-item>
        <kw-form-item
          label="DateRangePicker"
          cols="2"
        >
          <kw-date-range-picker
            name="dateRangePicker"
            rules="date_range_required|date_range_months:1"
          />
        </kw-form-item>
      </kw-form-row>
    </kw-search>
    <kw-search
      :key="formKey"
      ref="formRef"
      :autofocus="autofocus"
      :no-reset-focus="noResetFocus"
      :cols="cols3"
      class="kw-py-2 kw-px-4 kw-ma-4"
    >
      <kw-form-row>
        <kw-form-item label="지점명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
        <kw-form-item label="담당자명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
        <kw-form-item label="지역명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
      </kw-form-row>

      <kw-form-row>
        <kw-form-item label="Select">
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
            name="select"
            rules="required"
            placeholder="선택해 주세요."
          />
        </kw-form-item>
        <kw-form-item label="Select (Multiple)">
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
            multiple
            name="selectMultiple"
            rules="required"
            placeholder="선택해 주세요."
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
        <kw-form-item
          label="Radio (OptionGroup)"
          cols="2"
        >
          <kw-option-group
            name="radioOptionGroup"
            rules="required"
            type="radio"
            :options="['김엄마', '김마', '김엄마', '김마', '김엄마', '김마']"
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
        <kw-form-item
          label="Checkbox (OptionGroup)"
          cols="2"
        >
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
        <kw-form-item label="DatePicker">
          <kw-date-picker
            name="datePicker"
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
        <kw-form-item
          label="DateRangePicker"
          cols="2"
        >
          <kw-date-range-picker
            name="dateRangePicker"
            rules="date_range_required|date_range_months:1"
          />
        </kw-form-item>
      </kw-form-row>
    </kw-search>
    <kw-search
      :key="formKey"
      ref="formRef"
      :autofocus="autofocus"
      :no-reset-focus="noResetFocus"
      :cols="cols2"
      class="kw-py-2 kw-px-4 kw-ma-4"
    >
      <kw-form-row>
        <kw-form-item label="지점명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
        <kw-form-item label="담당자명">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
      </kw-form-row>

      <kw-form-row>
        <kw-form-item label="Select">
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
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
        <kw-form-item label="Select (Multiple)">
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
            multiple
            name="selectMultiple"
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
        <kw-form-item
          label="Radio (OptionGroup)"
        >
          <kw-option-group
            name="radioOptionGroup"
            rules="required"
            type="radio"
            :options="['김엄2마', '김마', '김엄마', '김마', '김엄마', '김마']"
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
        <kw-form-item label="DatePicker">
          <kw-date-picker
            name="datePicker"
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
    </kw-search>
    <kw-search
      :key="formKey"
      ref="formRef"
      :autofocus="autofocus"
      :no-reset-focus="noResetFocus"
      :cols="cols1"
      class="kw-py-2 kw-px-4 kw-ma-4"
    >
      <kw-form-row>
        <kw-form-item label="인풋입력해주세 인풋입력해주세">
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
          />
        </kw-form-item>
      </kw-form-row>

      <kw-form-row>
        <kw-form-item label="Select">
          <kw-select
            :model-value="[]"
            :options="['A', 'B', 'C', 'D']"
            name="select"
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
      </kw-form-row>

      <kw-form-row>
        <kw-form-item label="DatePicker">
          <kw-date-picker
            name="datePicker"
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
    </kw-search>
  </kw-page>
</template>

<script setup>

const cols1 = ref(1);
const cols2 = ref(2);
const cols3 = ref(3);
const cols4 = ref(4);
const readonlyValue = ref('readonly');
const readonlySelect = ref(['A', 'B']);
const readonlyRadio = ref('김마');
const readonlyCheckbox = ref(['A']);

</script>
