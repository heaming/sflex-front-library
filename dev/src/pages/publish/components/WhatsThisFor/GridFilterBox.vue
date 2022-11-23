<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Filter box
    </h2>
    <p class="kw-guide-description">
      It's located in grid top area
    </p>
    <guide-history-view :items="historyData" />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        do not use kw-form and please use <b>dense prop</b> in each form item(ex.kw-date-picer, kw-option-group etc..)
      </p>
      <q-card>
        <div class="temp">
          <ul class="filter-box">
            <li class="filter-box__item">
              <p class="filter-box__item-label">
                가지급금 생성일자
              </p>
              <kw-date-picker dense />
            </li>
            <li class="filter-box__item">
              <p class="filter-box__item-label">
                구분
              </p>
              <kw-select dense />
            </li>

            <li class="filter-box__item">
              <p class="filter-box__item-label">
                구분
              </p>
              <kw-option-group
                dense
                :model-value="'A'"
                type="radio"
                :options="['A', 'B', 'C', 'D']"
              />
            </li>
          </ul>
        </div>
        <guide-code-view
          :code-value="exampleCode"
          :lang="'vue'"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Example
      </h3>
      <p class="kw-guide-description">
        case 01
      </p>
      <q-card>
        <div class="temp">
          <ul class="filter-box">
            <li class="filter-box__item">
              <p class="filter-box__item-label">
                가지급금 생성일자
              </p>
              <kw-date-picker dense />
            </li>
          </ul>
        </div>
        <guide-code-view
          :code-value="exampleCode1"
          :lang="'vue'"
        />
      </q-card>
      <p class="kw-guide-description">
        case 02
      </p>
      <q-card>
        <div class="temp">
          <ul class="filter-box">
            <li class="filter-box__item">
              <p class="filter-box__item-label">
                구분
              </p>
              <kw-option-group
                dense
                :model-value="'A'"
                type="radio"
                :options="['A', 'B', 'C', 'D']"
              />
            </li>
          </ul>
        </div>
        <guide-code-view
          :code-value="exampleCode2"
          :lang="'vue'"
        />
      </q-card>
      <p class="kw-guide-description">
        case 04
      </p>
      <q-card>
        <div class="temp">
          <div class="filter-box justify-between py16">
            <div class="filter-box__item">
              <kw-icon
                name="pdf_24"
                size="24px"
              />
              <p class="kw-font-body ml10">
                EDU 非정도영업 조치규정_개정안(22년02월)
              </p>
            </div>
            <kw-btn
              borderless
              icon="download"
              style="font-size: 24px;"
            />
          </div>
        </div>
        <guide-code-view
          :code-value="exampleCode3"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const exampleCode = `
<ul class="filter-box">
  <li class="filter-box__item">
    <p class="filter-box__item-label">
      가지급금 생성일자
    </p>
    <kw-date-picker dense />
  </li>
  <li class="filter-box__item">
    <p class="filter-box__item-label">
      구분
    </p>
    <kw-select dense />
  </li>

  <li class="filter-box__item">
    <p class="filter-box__item-label">
      구분
    </p>
    <kw-option-group
      dense
      :model-value="'A'"
      type="radio"
      :options="['A', 'B', 'C', 'D']"
    />
  </li>
</ul>`;
const exampleCode1 = `
<ul class="filter-box">
  <li class="filter-box__item">
    <p class="filter-box__item-label">
      가지급금 생성일자
    </p>
    <kw-date-picker dense />
  </li>
</ul>`;
const exampleCode2 = `
<ul class="filter-box">
  <li class="filter-box__item">
    <p class="filter-box__item-label">
      구분
    </p>
    <kw-option-group
      dense
      :model-value="'A'"
      type="radio"
      :options="['A', 'B', 'C', 'D']"
    />
  </li>
</ul>`;
const exampleCode3 = `
<div class="filter-box justify-between py16">
  <div class="filter-box__item">
    <kw-icon
      name="pdf_24"
      size="24px"
    />
    <p class="kw-font-body ml10">
      EDU 非정도영업 조치규정_개정안(22년02월)
    </p>
  </div>
  <kw-btn
    borderless
    icon="download"
    style="font-size: 24px;"
  />
</div>;
`;

const historyData = [
  {
    timestamp: '2022.11.11',
    text: 'Add this guide page',
  },
];

</script>
