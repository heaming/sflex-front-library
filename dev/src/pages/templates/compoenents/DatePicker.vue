<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      DatePicker
    </h2>
    <p class="kw-guide-description">
      DatePicker
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="datePickerProps"
        title="datePickerProps"
      />
      <kw-separator />
      <kw-date-picker
        v-bind="bindingProps"
        :default-view-date="{year: 2021, month: 1, day: 1}"
      />
    </guide-section>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps2"
        :props="dateRangePickerProps"
        title="dateRangePickerProps"
      />
      <kw-separator />
      <kw-date-range-picker
        v-bind="bindingProps2"
        :default-view-date="{year: '2021', month: '1', day: '1'}"
      />
    </guide-section>
    <guide-section
      title="default"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-date-picker
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="range default"
      description="=default"
      :guide-code="defaultCode2"
    >
      <div class="flex">
        <div
          v-if="true"
          class="w700 bg-red-1"
        >
          <kw-date-picker
            v-bind="bindingProps"
            grow
          />
          <kw-date-range-picker
            v-bind="bindingProps2"
            grow
          />
        </div>
        <kw-separator vertical />
        <div
          v-if="true"
          class="w200 bg-red-1"
        >
          <kw-date-picker
            v-bind="bindingProps"
          />
          <kw-date-range-picker
            v-bind="bindingProps2"
          />
        </div>
      </div>

      <div class="flex">
        <div
          v-if="true"
          class="flex w700 bg-orange-1"
        >
          <kw-date-picker
            v-bind="bindingProps"
            grow
          />
          <kw-date-range-picker
            v-bind="bindingProps2"
            grow
          />
        </div>
        <kw-separator vertical />
        <div
          v-if="true"
          class="flex w200 bg-orange-1"
        >
          <kw-date-picker
            v-bind="bindingProps"
          />
          <kw-date-range-picker
            v-bind="bindingProps2"
          />
        </div>
      </div>

      <kw-form
        :cols="0"
        class="bg-yellow-1"
      >
        <kw-form-row>
          <kw-form-item label="폼 아이템">
            <kw-date-range-picker
              v-bind="bindingProps2"
            />
          </kw-form-item>
        </kw-form-row>
        <kw-form-row>
          <kw-form-item label="폼 아이템">
            <kw-date-picker
              v-bind="bindingProps"
            />
          </kw-form-item>
        </kw-form-row>
        <kw-form-row :cols="4">
          <kw-form-item label="폼 아이템">
            <kw-date-range-picker
              v-bind="bindingProps2"
            />
          </kw-form-item>
        </kw-form-row>
        <kw-form-row :cols="4">
          <kw-form-item label="폼 아이템">
            <kw-date-picker
              v-bind="bindingProps"
            />
          </kw-form-item>
        </kw-form-row>
      </kw-form>

      <kw-search
        :cols="0"
        class="bg-green-1"
      >
        <kw-search-row>
          <kw-search-item label="서치 아이템">
            <kw-input />
            <kw-date-range-picker
              v-bind="bindingProps2"
            />
          </kw-search-item>
        </kw-search-row>
        <kw-search-row>
          <kw-search-item label="서치 아이템">
            <kw-date-picker
              v-bind="bindingProps"
            />
          </kw-search-item>
        </kw-search-row>
        <kw-search-row :cols="4">
          <kw-search-item label="서치 아이템">
            <kw-input />
            <kw-date-range-picker
              v-bind="bindingProps2"
            />
          </kw-search-item>
        </kw-search-row>
        <kw-search-row :cols="4">
          <kw-search-item label="서치 아이템">
            <kw-input />
            <kw-date-picker
              v-bind="bindingProps"
            />
          </kw-search-item>
        </kw-search-row>
      </kw-search>
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldStyleProps } from '../../../../../src/composables/private/useFieldStyle';
import i18n from '../../../../../src/i18n';

const datePickerProps = {
  ...useFieldProps,
  ...useFieldStyleProps,

  modelValue: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: 'date',
  },
  unmaskedValue: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: String,
    default: '1000-01-01',
  },
  maxDate: {
    type: String,
    default: '9999-12-31',
  },
  beforeShow: {
    type: Function,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: i18n.t('MSG_TXT_INP_DATE', null, '날짜 입력'),
  },
};

const bindingProps = ref(null);

const defaultCode = `
<kw-date-picker
        v-bind="bindingProps"
      />`;

const dateRangePickerProps = {
  ...useFieldProps,
  ...useFieldStyleProps,

  from: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'date',
  },
  unmaskedValue: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: String,
    default: undefined,
  },
  maxDate: {
    type: String,
    default: undefined,
  },
  fromPlaceholder: {
    type: String,
    default: undefined,
  },
  toPlaceholder: {
    type: String,
    default: undefined,
  },
  beforeShow: {
    type: Function,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
};

const bindingProps2 = ref(null);

const defaultCode2 = `
<kw-date-range-picker
        v-bind="bindingProps"
      />`;
</script>
