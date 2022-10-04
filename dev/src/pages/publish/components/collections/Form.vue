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
    <guide-history-view
      :items="guideHistory"
    />
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
              <p class="delete">
                Add the class "essential" in the tag of kw-form-item.
              </p>
              Add the prop "required" in tag of kw-form-item
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
              :cols=""
            </td>
            <td>
              Add the number in :cols="" and it belongs to kw-form's tag as attribute
            </td>
          </tr>
          <tr>
            <td>
              kw-form-item
            </td>
            <td>
              :colspan=""
            </td>
            <td>
              Add the number in :colspan="" and it belongs to kw-form-item's tag as attribute
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
        Add the column's value as <b>:cols="1"</b> in the tag of <b>kw-form</b>.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form :cols="1">
            <kw-form-row>
              <kw-form-item label="label">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="Select">
                <kw-select
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input">
                <div class="row items-center w302">
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input">
                <div class="row items-center w460">
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  model-value="A"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="OptionGroup">
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="DatePicker"
              >
                <kw-date-picker />
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
        Add the column's value as <b>:cols="2"</b> in the tag of <b> kw-form.</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form :cols="2">
            <kw-form-row>
              <kw-form-item
                label="colspan"
                required
                hint-message="힌트입니다."
              >
                <kw-input
                  placeholder="입력해주세요"
                  rules="required"
                />
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-form-item>
              <kw-form-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="Select">
                <kw-select
                  :options="['A', 'B', 'C', 'D']"
                  placeholder="placeholder"
                  use-input
                />
              </kw-form-item>
              <kw-form-item label="Select">
                <kw-select
                  :options="['A', 'B', 'C', 'D']"
                  placeholder="placeholder"
                  use-input
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input">
                <div class="row items-center">
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
              <kw-form-item label="input2">
                <div class="row items-center">
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="input2">
                <div class="row items-center w302">
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
              <kw-form-item label="input2">
                <div class="row items-center w302">
                  <kw-input
                    placeholder="입력해주세요"
                  />
                  <span>-</span>
                  <kw-input
                    placeholder="입력해주세요"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  model-value="A"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  model-value="A"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="OptionGroup">
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item label="OptionGroup">
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="DatePicker"
              >
                <kw-date-picker />
              </kw-form-item>
              <kw-form-item
                label="DatePicker"
              >
                <kw-date-picker />
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
    <div class="kw-guide-section">
      <h3
        id="EssentialExample"
        class="kw-guide-title"
      >
        Different Sizes in kw-form-item
      </h3>
      <ol class="kw-guide-description">
        <li>
          <em>Half size</em><br>
          - Add the necessary elements in kw-form-item. It's half size and 10px between the elements.<br>
        </li>
        <li>
          <em>Different size</em><br>
          - Add the size class in one of the elements.<br>
          Please, Ensure not to put size's class in all of the elements.<br>
          Recommend to add the size class as the high priority elements.<br>
          <b>※ The high priority elements</b><br>
          1. select box<br>
          2. shorter size of elements in kw-form-item<br>
          - The other element which has no size class will be flexible as much as the rest size of kw-form-item<br>
        </li>
        <li>
          <em>The bigger column or the smaller column</em><br>
          - If the general size's different compared to
          kw-form-item's size except of label's size,<br>
          The elements should be wrapped with the classes
          ( <b>size's class , row , items-center </b> ) , row , items-center.<br>
          - Also add the element's size as much as required size<br>
          <b>※ The elements mean input, select, radio, checkbox and so on</b>
        </li>
      </ol>
      <q-card>
        <div class="kw-guide-example">
          <kw-form :cols="2">
            <kw-form-row>
              <kw-form-item
                label="Half size"
              >
                <kw-input
                  rules="required"
                  placeholder="Half"
                />
                <kw-input
                  rules="required"
                  placeholder="Half"
                />
              </kw-form-item>
              <kw-form-item
                label="Half"
              >
                <kw-input
                  rules="required"
                  placeholder="Half"
                />
                <kw-select
                  :model-value="['Half']"
                  :options="['Half']"
                  placeholder="Half"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="Flexible"
              >
                <kw-input
                  rules="required"
                  placeholder="100px"
                  class="w100"
                />
                <kw-input
                  rules="required"
                  placeholder="Flexible"
                />
              </kw-form-item>
              <kw-form-item
                label="Flexible"
              >
                <kw-input
                  rules="required"
                  placeholder="Flexible"
                />
                <kw-select
                  :model-value="['200px']"
                  :options="['200px']"
                  placeholder="200px"
                  rules="required"
                  class="w200"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="400px"
              >
                <div class="row items-center w400">
                  <kw-input
                    rules="required"
                    placeholder="100px"
                    class="w100"
                  />
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                </div>
              </kw-form-item>
              <kw-form-item
                label="400px"
              >
                <div class="row items-center w400">
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                  <kw-select
                    :model-value="['300px']"
                    :options="['300px']"
                    placeholder="300px"
                    rules="required"
                    class="w300"
                  />
                </div>
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>

        <guide-code-view
          :code-value="differentSize"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="EmailExample"
        class="kw-guide-title"
      >
        Email form type
      </h3>
      <p class="kw-guide-description">
        please add <em>&lt; zwcm-email-address /&gt;</em> in kw-form-item tag
        <q-card>
          <div class="kw-guide-example">
            <img
              src="../../../../../assets/images/example_email.png"
              alt="email example"
              style="width: 100%;"
            >
          </div>

          <guide-code-view
            :code-value="EmailCode"
            lang="vue"
          />
        </q-card>
      </p>
    </div>
    <div class="kw-guide-section">
      <h3
        id="AddressExample"
        class="kw-guide-title"
      >
        Address form type
      </h3>
      <p class="kw-guide-description">
        please add <em>&lt; zwcm-post-code /&gt;</em> in kw-form-item tag
        <q-card>
          <div class="kw-guide-example">
            <img
              src="../../../../../assets/images/example_address.png"
              alt="address example"
              style="width: 65%;"
            >
          </div>

          <guide-code-view
            :code-value="AddressCode"
            lang="vue"
          />
        </q-card>
      </p>
    </div>
    <div class="kw-guide-section">
      <h3
        id="telephoneExample"
        class="kw-guide-title"
      >
        Telephone form type
      </h3>
      <p class="kw-guide-description">
        please add <em>&lt; zwcm-telephone-number /&gt;</em> in kw-form-item and kw-search-item tag <br>
        Also, please add <em>'carrier</em>' prop, if you need to 1st select like as 1st sample image
        <q-card>
          <div class="kw-guide-example">
            <img
              src="../../../../../assets/images/example_telephone.png"
              alt="address example"
              style="width: 65%;"
            >
          </div>

          <guide-code-view
            :code-value="telephoneCode"
            lang="vue"
          />
        </q-card>
      </p>
    </div>
  </kw-page>
</template>

<script setup>
const oneColumns = `
<!-- Add the column's value as :cols="1" in the tag of kw-form -->
<kw-form :cols="1">
  <kw-form-row>
    <kw-form-item label="label">
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="Select">
      <kw-select
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input">
      <div class="row items-center w302">
        <kw-input
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input">
      <div class="row items-center w460">
        <kw-input
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        model-value="A"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="DatePicker"
    >
      <kw-date-picker />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
const twoColumns = `
<!-- Add the column's value as :cols="2" in the tag of kw-form -->
<kw-form :cols="2">
  <kw-form-row>
    <kw-form-item
      label="colspan"
      required
      hint-message="힌트입니다."
    >
      <kw-input
        class="w400"
        placeholder="입력해주세요"
        rules="required"
      />
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item label="colspan">
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="Select">
      <kw-select
        :options="['A', 'B', 'C', 'D']"
        placeholder="placeholder"
        use-input
      />
    </kw-form-item>
    <kw-form-item label="Select">
      <kw-select
        :options="['A', 'B', 'C', 'D']"
        placeholder="placeholder"
        use-input
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input">
      <div class="row items-center w460">
        <kw-input
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          placeholder="입력해주세요"
        />
        <span>-</span>
        <kw-input
          placeholder="입력해주세요"
        />
      </div>
    </kw-form-item>
    <kw-form-item label="input2">
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
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input2">
      <kw-input
        name="input"
        placeholder="입력해주세요"
      />
      <span>-</span>
      <kw-input
        name="input"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item label="input2">
      <kw-input
        name="input"
        placeholder="입력해주세요"
      />
      <span>-</span>
      <kw-input
        name="input"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        model-value="A"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        model-value="A"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="DatePicker"
    >
      <kw-date-picker />
    </kw-form-item>
    <kw-form-item
      label="DatePicker"
    >
      <kw-date-picker />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const differentSize = `
<kw-form :cols="2">
  <kw-form-row>
  <!-- half size -->
    <kw-form-item
      label="Half size"
    >
      <kw-input
        rules="required"
        placeholder="Half"
      />
      <kw-input
        rules="required"
        placeholder="Half"
      />
    </kw-form-item>
    <!-- Half size -->
    <kw-form-item
      label="Half"
    >
      <kw-input
        rules="required"
        placeholder="Half"
      />
      <kw-select
        :model-value="['Half']"
        :options="['Half']"
        placeholder="Half"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
  <!-- shorter element's high priority: input-width:100px. -->
    <kw-form-item
      label="Flexible"
    >
      <kw-input
        rules="required"
        placeholder="100px"
        class="w100"
      />
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
    </kw-form-item>
      <!-- The high priority element is kw-select in this case -->
    <kw-form-item
      label="Flexible"
    >
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
      <kw-select
        :model-value="['200px']"
        :options="['200px']"
        placeholder="200px"
        rules="required"
        class="w200"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
  <!-- The wrapped tag's size:400px, The high priority element is shorter input in this case -->
    <kw-form-item
      label="400px"
    >
      <div class="row items-center w400">
        <kw-input
          rules="required"
          placeholder="100px"
          class="w100"
        />
        <kw-input
          rules="required"
          placeholder="Flexible"
        />
      </div>
    </kw-form-item>
    <!-- The wrapped tag's size:400px, The high priority element is kw-select in this case -->
    <kw-form-item
      label="400px"
    >
      <div class="row items-center w400">
        <kw-input
          rules="required"
          placeholder="Flexible"
        />
        <kw-select
          :model-value="['300px']"
          :options="['300px']"
          placeholder="300px"
          rules="required"
          class="w300"
        />
      </div>
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const EmailCode = `
<kw-form-row>
  <kw-form-item
    label="email"
  >
    <zwcm-email-address />
  </kw-form-item>
</kw-form-row>
`;

const AddressCode = `
<kw-form-row>
  <kw-form-item
    label="주소"
  >
    <zwcm-post-code />
  </kw-form-item>
</kw-form-row>
`;
const telephoneCode = `
<kw-form-row>
  <kw-form-item
    label="전화번호"
  >
    <zwcm-telephone-number />
  </kw-form-item>

  <kw-form-item
    label="전화번호"
  >
    <zwcm-telephone-number carrier/>
  </kw-form-item>
</kw-form-row>

<!-- In search Form -->
<kw-search-row>
  <kw-search-item
    label="전화번호"
  >
    <zwcm-telephone-number />
  </kw-search-item>
<kw-search-row>
`;

const guideHistory = [
  {
    timestamp: '2022-09-28',
    text: 'Edit guide about essential',
  },
  {
    timestamp: '2022-09-21',
    text: 'Add example of phone form case',
  },
  {
    timestamp: '2022-09-13',
    text: 'Add example of email and address form case',
  },
];
</script>
