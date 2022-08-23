<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Form
    </h2>
    <p class="kw-guide-description">
      kw-form > kw-form-row > kw-form-item > the elements (CheckBox, Input, Radio , Select)<br>
      - This is the sequence to be wrapped<br>
      it is necessary to be wrapped for using the element's tags from kw-form to the element.<br>
      it is only for "Form". Search form is diffrent with form. Go to the reference page for search <br>
      (The roots for the Search form: components/collections/Search)
    </p>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        1column/ width:1212px
      </h3>
      <p class="kw-guide-description">
        Add the column's value as <b>cols="2"</b> in the tag of <b>kw-form</b>.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="1">
            <kw-form-row>
              <kw-form-item label="colspan">
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
              <kw-form-item label="input">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  :model-value="'A'"
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="OptionGroup">
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
              <kw-form-item
                label="DatePicker"
                class="essential"
              >
                <kw-date-picker
                  name="datePicker"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="oneColumns"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        2column/ width:1536px
      </h3>
      <p class="kw-guide-description">
        Add the column's value as <b>cols="2"</b> in the tag of <b> kw-form.</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="2">
            <kw-form-row>
              <kw-form-item label="colspan">
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
              <kw-form-item label="colspan">
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
              <kw-form-item label="input">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
              <kw-form-item label="input2">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input2">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
              <kw-form-item label="input2">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  :model-value="'A'"
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  :model-value="'A'"
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="OptionGroup">
                <kw-option-group
                  :model-value="[]"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item label="OptionGroup">
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
              <kw-form-item
                label="DatePicker"
                class="essential"
              >
                <kw-date-picker
                  name="datePicker"
                  rules="required"
                />
              </kw-form-item>
              <kw-form-item
                label="DatePicker"
                class="essential"
              >
                <kw-date-picker
                  name="datePicker"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
          <guide-code-view
            :code-value="twoColumns"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const oneColumns = `
<!-- Add the column's value as cols="1" in the tag of kw-form -->
<kw-form cols="1">
  <kw-form-row>
    <kw-form-item label="colspan">
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
    <kw-form-item label="input">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        :model-value="'A'"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="OptionGroup">
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
    <kw-form-item
      label="DatePicker"
      class="essential"
    >
      <kw-date-picker
        name="datePicker"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
const twoColumns = `
<!-- Add the column's value as cols="2" in the tag of kw-form -->
<kw-form cols="2">
  <kw-form-row>
    <kw-form-item label="colspan">
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item label="colspan">
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
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          rules="required"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        :model-value="'A'"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        :model-value="'A'"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item label="OptionGroup">
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
    <kw-form-item
      label="DatePicker"
      class="essential"
    >
      <kw-date-picker
        name="datePicker"
        rules="required"
      />
    </kw-form-item>
    <kw-form-item
      label="DatePicker"
      class="essential"
    >
      <kw-date-picker
        name="datePicker"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
</script>
