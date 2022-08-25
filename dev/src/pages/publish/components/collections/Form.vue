<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Form
    </h2>
    <p class="kw-guide-description">
      kw-form > kw-form-row > kw-form-item > the elements (CheckBox, Input, Radio , Select)<br>
      - This is the sequence to be wrapped<br>
      It is only for "Form". Search form is diffrent with form. Go to the reference page for search <br>
      (The roots for the Search form: components/collections/Search)
    </p>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              Tag
            </th>
            <th>
              Class(attribue)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-form-item
            </td>
            <td>
              essential
            </td>
            <td>
              Add the class "essential" in the tag of kw-form-item.
            </td>
          </tr>
          <tr>
            <td>
              The element in kw-form-item
            </td>
            <td>
              readonly
            </td>
            <td>
              Add the attribute "disable" in the tag of element which is wrapped for kw-form-item.<br>
              (Except of the tags of kw-select or kw-input,
              It is required to add attribute 'readonly' Instead of 'disable')
            </td>
          </tr>
          <tr>
            <td>
              The element in kw-form-item
            </td>
            <td>
              disable
            </td>
            <td>
              Add the attribute "disable" in the tag of element which is wrapped for kw-form-item
            </td>
          </tr>
          <tr>
            <td>
              kw-form
            </td>
            <td>
              cols=""
            </td>
            <td>
              Add the number in cols="" and it belongs to kw-form's tag as attribute
            </td>
          </tr>
          <tr>
            <td>
              kw-form-item
            </td>
            <td>
              colspan=""
            </td>
            <td>
              Add the number in colspan="" and it belongs to kw-form-item's tag as attribute
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Width
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              The Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-form
            </td>
            <td>
              :label-size="200"
            </td>
            <td>
              Defines the size of all labels inside 'kw-form'.
            </td>
          </tr>
          <tr>
            <td>
              kw-input / kw-select
            </td>
            <td>
              w1, w2, w3......w1000
            </td>
            <td>
              In general, the width of 'input' is set to 100% according to the column width.<br>
              However, in some cases, the size may be flexible.<br>
              In this case, the size must be defined through the helper class.
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        1column/ width:1212px
      </h3>
      <p class="kw-guide-description">
        Add the column's value as <b>cols="1"</b> in the tag of <b>kw-form</b>.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="1">
            <kw-form-row>
              <kw-form-item label="colspan">
                <kw-input
                  name="input"
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
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
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
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
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
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="DatePicker"
              >
                <kw-date-picker
                  name="datePicker"
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
              <kw-form-item
                label="colspan"
                class="essential"
              >
                <kw-input
                  name="input"
                  placeholder="입력해주세요"
                  rules="required"
                />
              </kw-form-item>
              <kw-form-item label="colspan">
                <kw-input
                  name="input"
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
                  placeholder="placeholder"
                  use-input
                />
              </kw-form-item>
              <kw-form-item label="Select">
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  name="select"
                  placeholder="placeholder"
                  use-input
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
              <kw-form-item label="input2">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
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
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
              <kw-form-item label="input2">
                <div class="kw-hypen-input">
                  <kw-input
                    name="input"
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    name="input"
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
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  :model-value="'A'"
                  name="radioOptionGroup"
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
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item label="OptionGroup">
                <kw-option-group
                  :model-value="[]"
                  name="checkboxOptionGroup"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="DatePicker"
              >
                <kw-date-picker
                  name="datePicker"
                />
              </kw-form-item>
              <kw-form-item
                label="DatePicker"
              >
                <kw-date-picker
                  name="datePicker"
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
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
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
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
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
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="DatePicker"
    >
      <kw-date-picker
        name="datePicker"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
const twoColumns = `
<!-- Add the column's value as cols="2" in the tag of kw-form -->
<kw-form cols="2">
  <kw-form-row>
    <kw-form-item
      label="colspan"
      class="essential"
    >
      <kw-input
        name="input"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item label="colspan">
      <kw-input
        name="input"
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
      />
    </kw-form-item>
    <kw-form-item label="Select">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        name="select"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
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
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
    <kw-form-item label="input2">
      <div class="kw-hypen-input">
        <kw-input
          name="input"
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          name="input"
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
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        :model-value="'A'"
        name="radioOptionGroup"
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
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="DatePicker"
    >
      <kw-date-picker
        name="datePicker"
      />
    </kw-form-item>
    <kw-form-item
      label="DatePicker"
    >
      <kw-date-picker
        name="datePicker"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
</script>
