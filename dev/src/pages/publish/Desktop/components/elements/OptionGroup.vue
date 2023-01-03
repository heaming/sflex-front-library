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

const guideHistory = [
  {
    timestamp: '2022.09.07',
    text: 'Add option group multi',
  },
];
</script>
