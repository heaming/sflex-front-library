<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Button in Search Form
    </h2>
    <p class="kw-guide-description">
      Button vs Toggle
    </p>
    <guide-history-view :items="historyData" />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Data Range Picker Button
      </h3>
      <p class="kw-guide-description">
        It should be added as toggle(radio)
        <router-link to="/Publish/Components/Elements/Button/ButtonNew">
          buttonNew - Toggle(radio)
        </router-link>
        after Date Range Picker
      </p>
      <q-card>
        <kw-search>
          <kw-search-row>
            <kw-search-item
              label="Date Range"
              colspan="2"
            >
              <kw-date-range-picker rules="date_range_months:1" />
              <kw-btn-toggle
                v-model="strModel"
                :label="'label'"
                :options="['오늘', '주간', '월간']"
              />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <guide-code-view
          :code-value="[toggleForm,toggleFormScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Button in search form
      </h3>
      <p class="kw-guide-description">
        It should be added as button
        <router-link to="/Publish/Components/Elements/Button/ButtonNew">
          buttonNew - button(dense) <br>
          no-label and button only in kw-search-item
        </router-link>
      </p>
      <q-card>
        <kw-search>
          <kw-search-row>
            <kw-form-item
              label="label"
              required
            >
              <kw-input rules="required" />
            </kw-form-item>
            <kw-form-item
              label="label"
            >
              <kw-input />
            </kw-form-item>
            <kw-form-item
              no-label
            >
              <kw-btn
                secondary
                dense
                label="button1"
                class="mr8"
              />
              <kw-btn
                secondary
                dense
                label="button2"
              />
            </kw-form-item>
          </kw-search-row>
        </kw-search>
        <guide-code-view
          :code-value="[buttonForm,buttonFormScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const strModel = ref('오늘');

const toggleForm = `
<kw-search
  :key="formKey"
  ref="formRef"
  :autofocus="autofocus"
  :no-reset-focus="noResetFocus"
>
  <kw-search-row>
    <kw-form-item
      label="label"
      required
    >
      <kw-input rules="required" />
    </kw-form-item>
    <kw-search-item
      label="DateRangePicker"
      colspan="2"
    >
      <kw-date-range-picker rules="date_range_months:1" />
      <kw-btn-toggle
        v-model="strModel"
        :label="'label'"
        :options="['오늘', '주간', '월간']"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
const toggleFormScript = `
  const strModel = ref('오늘');
`;
const buttonForm = `
<kw-search>
  <kw-search-row>
    <kw-form-item
      label="label"
      required
    >
      <kw-input rules="required" />
    </kw-form-item>
    <kw-form-item
      label="label"
    >
      <kw-input />
    </kw-form-item>
    <kw-form-item
      no-label
    >
      <kw-btn
        secondary
        dense
        label="button1"
        class="mr8"
      />
      <kw-btn
        secondary
        dense
        label="button2"
      />
    </kw-form-item>
  </kw-search-row>
</kw-search>
`;
const buttonFormScript = `
  const strModel = ref('오늘');
`;
const historyData = [
  {
    timestamp: '2022-09-28',
    text: 'Add button in search form ',
  },
];
</script>
