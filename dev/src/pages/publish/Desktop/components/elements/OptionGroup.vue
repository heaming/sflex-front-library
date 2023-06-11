<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      OptionGroup(radio,checkbox)
    </h2>
    <p class="kw-guide-description">
      OptionGroup's reference pages go to 'publish/components/Elements/ Checkbox'.
    </p>
    <guide-history-view :items="guideHistory" />
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        option group (multi line)
      </h3>
      <p class="kw-guide-description">
        If the popup size is too small to put all options
        and make the letter are broken, Make sure to use class of multi line. <br>
        The option will be line break automatically
        <a href="https://zpl.io/09WdD9R">popup page to use multi-line</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <p class="my15">
            cols="3"
          </p>
          <kw-form :cols="3">
            <kw-form-row>
              <kw-form-item label="계약유형">
                <kw-option-group
                  class="kw-option-group--multi-line"
                  :model-value="'렌탈 / 환경리스'"
                  type="radio"
                  :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="계약유형">
                <kw-option-group
                  class="kw-option-group--multi-line"
                  :model-value="[]"
                  type="checkbox"
                  :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
          <p class="my15">
            cols="2"
          </p>
          <kw-form :cols="2">
            <kw-form-row>
              <kw-form-item label="계약유형">
                <kw-option-group
                  class="kw-option-group--multi-line"
                  :model-value="'렌탈 / 환경리스'"
                  type="radio"
                  :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="계약유형">
                <kw-option-group
                  class="kw-option-group--multi-line"
                  :model-value="[]"
                  type="checkbox"
                  :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
          <p class="my15">
            cols="1"
          </p>
          <kw-form :cols="1">
            <kw-form-row>
              <kw-form-item label="계약유형">
                <kw-option-group
                  class="kw-option-group--multi-line"
                  :model-value="'렌탈 / 환경리스'"
                  type="radio"
                  :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="계약유형">
                <kw-option-group
                  class="kw-option-group--multi-line"
                  :model-value="[]"
                  type="checkbox"
                  :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        kw-option-group--vertical
      </h3>
      <p class="kw-guide-description">
        위아래 간격 20px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="border-box">
            <kw-option-group
              :model-value="[]"
              type="checkbox"
              class="kw-option-group--vertical"
              :options="[
                '이솝극장 철학동화(450,000원)',
                '이솝극장 철학동화(250,000원)',
                '이솝극장 철학동화(100,000원)',
                '이솝극장 철학동화(0원)',
              ]"
            />
          </div>
          <div class="border-box mt20">
            <kw-option-group
              :model-value="[]"
              type="radio"
              class="kw-option-group--vertical"
              :options="[
                '이솝극장 철학동화(450,000원)',
                '이솝극장 철학동화(250,000원)',
                '이솝극장 철학동화(100,000원)',
                '이솝극장 철학동화(0원)',
              ]"
            />
          </div>
        </div>
        <guide-code-view
          :code-value="testCode02"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>

const testCode = `
<p class="my15">
  cols="3"
</p>
<kw-form :cols="3">
  <kw-form-row>
    <kw-form-item label="계약유형">
      <kw-option-group
        class="kw-option-group--multi-line"
        :model-value="'렌탈 / 환경리스'"
        type="radio"
        :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="계약유형">
      <kw-option-group
        class="kw-option-group--multi-line"
        :model-value="[]"
        type="checkbox"
        :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
<p class="my15">
  cols="2"
</p>
<kw-form :cols="2">
  <kw-form-row>
    <kw-form-item label="계약유형">
      <kw-option-group
        class="kw-option-group--multi-line"
        :model-value="'렌탈 / 환경리스'"
        type="radio"
        :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="계약유형">
      <kw-option-group
        class="kw-option-group--multi-line"
        :model-value="[]"
        type="checkbox"
        :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
<p class="my15">
  cols="1"
</p>
<kw-form :cols="1">
  <kw-form-row>
    <kw-form-item label="계약유형">
      <kw-option-group
        class="kw-option-group--multi-line"
        :model-value="'렌탈 / 환경리스'"
        type="radio"
        :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="계약유형">
      <kw-option-group
        class="kw-option-group--multi-line"
        :model-value="[]"
        type="checkbox"
        :options="['렌탈 / 환경리스', '리스','일시불','정기배송', '멤버십','캡슐']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
const testCode02 = `
<div class="border-box">
  <kw-option-group
    :model-value="[]"
    type="checkbox"
    class="kw-option-group--vertical"
    :options="[
      '이솝극장 철학동화(450,000원)',
      '이솝극장 철학동화(250,000원)',
      '이솝극장 철학동화(100,000원)',
      '이솝극장 철학동화(0원)',
    ]"
  />
</div>
<div class="border-box mt20">
  <kw-option-group
    :model-value="[]"
    type="radio"
    class="kw-option-group--vertical"
    :options="[
      '이솝극장 철학동화(450,000원)',
      '이솝극장 철학동화(250,000원)',
      '이솝극장 철학동화(100,000원)',
      '이솝극장 철학동화(0원)',
    ]"
  />
</div>
`;

const guideHistory = [
  {
    timestamp: '2022.09.07',
    text: 'Add option group multi',
  },
  {
    timestamp: '2023.06.01',
    text: 'kw-option-group--vertical',
  },
];
</script>
