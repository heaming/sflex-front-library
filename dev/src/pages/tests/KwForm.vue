<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <kw-page class="q-pa-md">
    <button @click="$refs.formRef.init()">
      Init
    </button>
    <button @click="$refs.formRef.reset()">
      Reset
    </button>
    <button @click="$refs.formRef.resetValidation()">
      Reset Validation
    </button>
    <button @click="$g.alert($refs.formRef.isModified())">
      isModified
    </button>
    <button @click="async () => $g.alert(await $refs.formRef.validate())">
      Valiadte
    </button>
    <kw-search
      ref="formRef"
      class="q-gutter-md"
      dense
      :cols="formCols"
    >
      <kw-search-row>
        <kw-search-item
          label="Input"
        >
          <kw-input
            v-model="formData.input"
            name="input"
            label="Input"
            rules="required"
          />
        </kw-search-item>
        <kw-search-item label="Select">
          <kw-select
            v-model="formData.select"
            :options="options"
            name="select"
            label="Select"
            rules="required"
            multiple
          />
        </kw-search-item>
      </kw-search-row>

      <div class="row">
        <div class="col">
          <div class="row kw-input">
            <span class="kw-form-title">인풋</span>
            <kw-input
              v-model="formData.input"
              name="input"
              label="Input"
              rules="required"
            />
          </div>
        </div>
        <div class="col">
          <div class="row kw-select">
            <span class="kw-form-title">셀렉트</span>
            <kw-select
              v-model="formData.select"
              :options="options"
              name="select"
              label="Select"
              rules="required"
              multiple
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="row kw-input">
            <span class="kw-form-title">인풋</span>
            <kw-input
              v-model="formData.input"
              name="input"
              label="Input"
              rules="required"
            />
          </div>
        </div>
        <div class="col">
          <div class="row kw-select">
            <span class="kw-form-title">셀렉트</span>
            <kw-select
              v-model="formData.select"
              :options="options"
              name="select"
              label="Select"
              rules="required"
              multiple
            />
          </div>
        </div>
        <div class="col">
          <div class="row kw-input">
            <span class="kw-form-title">인풋</span>
            <kw-input
              v-model="formData.input"
              name="input"
              label="Input"
              rules="required"
            />
          </div>
        </div>
        <div class="col">
          <div class="row kw-select">
            <span class="kw-form-title">셀렉트</span>
            <kw-select
              v-model="formData.select"
              :options="options"
              name="select"
              label="Select"
              rules="required"
              multiple
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="row kw-checkbox">
            <span class="kw-form-title">DatePicker</span>
            <kw-date-picker
              v-model="formData.datePicker"
              name="datePicker"
              label="datePicker"
              rules="required"
            />
          </div>
        </div>
      </div>
    </kw-search>
  </kw-page>
</template>

<script>

export default {
  setup() {
    const formRef = ref(null);
    const formData = ref({
      optionGroup: [],
    });

    return {
      formRef,
      formData,

      formCols: ref(3),

      options: [
        '', 'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
      ],
      options2: [{ label: 'Option 1', value: 'op1' }, { label: 'Option 2', value: 'op2' }, { label: 'Option 3', value: '' }],
    };
  },
};
</script>
