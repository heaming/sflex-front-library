<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Radio + input in form or search-form
    </h2>
    <p class="kw-guide-description">
      Radio + input in form-item in search-form-item together,
      Put <b>kw-select and kw-input</b> in kw-search-item or kw-form-item instead of radio
    </p>
    <guide-history-view :items="historyData" />

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        only Radio in form or search-form
      </h3>
      <p class="kw-guide-description">
        Radio in kw-search-item or kw-form-item, Put it as kw-radio like zeplin's design and planning.
      </p>
      <q-card>
        <img
          src="../../../../../assets/images/onlyRadio.png"
          alt="onlyRadio"
        >
        <guide-code-view
          :code-value="radio"
          lang="vue"
        />
      </q-card>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Radio + input together in search-item and form-item
      </h3>
      <p class="kw-guide-description">
        Radio and input in kw-form-item or kw-search-item in zeplin's planning,
        Put it as <b>Kw-select + kw-input in kw-form-item or kw-search-item </b>.
      </p>
      <q-card>
        <img
          src="../../../../../assets/images/RadioInput.png"
          alt="onlyRadio"
        >
        <guide-code-view
          :code-value="SelectInput"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const radio = `
<kw-form-item label="only Radio in form">
  <kw-option-group
    :model-value="'A'"
    type="radio"
    :options="['A', 'B']"
  />
</kw-form-item>

<kw-search-item label="only Radio in form">
  <kw-option-group
    :model-value="'A'"
    type="radio"
    :options="['A', 'B']"
  />
</kw-search-item>
`;
const SelectInput = `
<!-- Radio in planning -> select in design in search-item. -->
<kw-search-item
  label="SelectInput together"
  required
>
  <kw-select
    :model-value="[]"
    :options="['A', 'B', 'C', 'D']"
  />
  <kw-input
    placeholder="입력해주세요"
    rules="required"
  />
</kw-search-item>

<!-- Radio in planning -> select in design in form-item. -->
<kw-form-item
  label="SelectInput together"
  required
>
  <kw-select
    :model-value="[]"
    :options="['A', 'B', 'C', 'D']"
  />
  <kw-input
    placeholder="입력해주세요"
    rules="required"
  />
</kw-form-item>
`;
const historyData = [
  {
    timestamp: '2022-10-13',
    text: 'Add radio and input together ',
  },
];
</script>
