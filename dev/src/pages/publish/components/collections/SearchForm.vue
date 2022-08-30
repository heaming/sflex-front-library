<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Search Form
    </h2>
    <p class="kw-guide-description">
      kw-search-form > kw-search-row > kw-search-item > elements ( CheckBox, Input, Radio , Select, datapicker )<br>
      - This is the sequence to be wrapped<br>
      It is only for "search form". form is diffrent with form. Go to the reference page for form <br>
      (The roots for the Search form: components/collections/form)
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
              kw-search-item
            </td>
            <td>
              essential
            </td>
            <td>
              add the attribute "required" in the tag of kw-search-item.
            </td>
          </tr>
          <tr>
            <td>
              The element in kw-search-item
            </td>
            <td>
              readonly
            </td>
            <td>
              Add the attribute "disable" in the tag of element which is wrapped for kw-search-item.<br>
              (Except of the tags of kw-select or kw-input,
              It is required to add attribute 'readonly' Instead of 'disable')
            </td>
          </tr>
          <tr>
            <td>
              The element in kw-search-item
            </td>
            <td>
              disable
            </td>
            <td>
              Add the attribute "disable" in the tag of element which is wrapped for kw-search-item
            </td>
          </tr>
          <tr>
            <td>
              kw-search
            </td>
            <td>
              :cols=""
            </td>
            <td>
              Add the number in :cols="" and it belongs to kw-search's tag as attribute
            </td>
          </tr>
          <tr>
            <td>
              kw-search-item
            </td>
            <td>
              :colspan=""
            </td>
            <td>
              Add the number in :colspan="" and it belongs to kw-search-item's tag as attribute
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
              kw-search
            </td>
            <td>
              :label-size="200"
            </td>
            <td>
              Defines the size of all labels inside 'kw-form(kw-search)'.
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
        &lt;kw-search&gt; form
      </h3>
      <p class="kw-guide-description">
        The 'kw-search' example is as below.<br>
        When 'kw-search' is used, It is included in the border of outside.<br>
        Add the columns number :cols="4" in the tag of 'kw-search' (default: three columns)<br>
        If there are more than 3 'rows', only two rows are exposed and The other rows except of two rows are hidden.<br>
        And the 'More' button will be appeared automatically.
      </p>
      <q-card>
        <kw-search :cols="4">
          <kw-search-row>
            <kw-search-item label="지점명">
              <kw-input
                placeholder="입력해주세요"
              />
            </kw-search-item>
            <kw-search-item
              label="담당자명"
              required
            >
              <kw-input
                placeholder="입력해주세요"
                rules="required"
              />
            </kw-search-item>
            <kw-search-item label="지역명">
              <kw-input
                readonly
                placeholder="입력해주세요"
              />
            </kw-search-item>
            <kw-search-item label="권역명">
              <kw-input
                placeholder="입력해주세요"
                disable
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item
              label="선택 샘플"
            >
              <kw-select
                :options="['A', 'B', 'C', 'D']"
                placeholder="선택해 주세요."
              />
            </kw-search-item>
            <kw-search-item label="다중선택 샘플 (readonly)">
              <kw-select
                :model-value="[]"
                :options="['A', 'B', 'C', 'D']"
                multiple
                readonly
              />
            </kw-search-item>
            <kw-search-item label="다중선택 샘플 (disable)">
              <kw-select
                :model-value="[]"
                :options="['A', 'B', 'C', 'D']"
                multiple
                disable="disable"
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="Radio">
              <kw-option-group
                type="radio"
                :options="['김엄마', '김마', '마']"
              />
            </kw-search-item>

            <kw-search-item label="readonly">
              <kw-option-group
                type="radio"
                :options="['김엄마', '김마', '마']"
                disable
              />
            </kw-search-item>
            <kw-search-item label="disable">
              <kw-option-group
                type="radio"
                :options="['김엄마', '김마', '마']"
                disable
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="Optiongroup (Checkbox)">
              <kw-option-group
                :model-value="[]"
                type="checkbox"
                :options="['A', 'B', 'C', 'D']"
              />
            </kw-search-item>
            <kw-search-item label="OptionGroup (readonly)">
              <kw-option-group
                :model-value="[]"
                type="checkbox"
                :options="['A', 'B', 'C', 'D']"
                disable
              />
            </kw-search-item>
            <kw-search-item label="OptionGroup (disable)">
              <kw-option-group
                :model-value="[]"
                type="checkbox"
                :options="['A', 'B', 'C', 'D']"
                disable
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="DatePicker">
              <kw-date-picker />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="DateRangePicker">
              <kw-date-range-picker
                rules="date_range_required|date_range_months:1"
              />
            </kw-search-item>
            <kw-search-item
              label="DateRangePicker"
              :colspan="2"
            >
              <kw-date-range-picker
                rules="date_range_required|date_range_months:1"
              />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <guide-code-view
          :code-value="searchCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        Columns
      </h3>
      <p class="kw-guide-description">
        There are the 4 types of column.<br>
        Add the tags of <b> kw-search-item </b> (which include
        kw-input, kw-search,
        kw-radio and so on) as many as it needs until <b>4 columns in kw-search-row</b><br>
        Add the columns number in <b>:cols="" </b> in the tag of <b> kw-search</b> (default: three
        columns)<br>
        Add the columns number in <b>:colspan="" </b> in the tag of <b>kw-search-item</b><br>
        The example is kw-search :cols="4"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-search :cols="4">
            <kw-search-row>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </div>
        <guide-code-view
          :code-value="theColumnsCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        1 or 2 Columns in 1 row
      </h3>
      <p class="kw-guide-description">
        If there is only one row in the searchForm and there are only 1 or 2 columns in it
        , the button should be on the right side. Because it looks too empty.<br>
        In this case,
        <ol>
          <li>add 'kw-search--onerow' class</li>
        </ol>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-search
            class="kw-search--onerow"
          >
            <kw-search-row>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item label="colspan">
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </div>
        <guide-code-view
          :code-value="theOneRowCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columnsFormItem"
        class="kw-guide-title"
      >
        The columns of kw-search-item
      </h3>
      <p class="kw-guide-description">
        If <b>&lt;kw-search&gt; is :cols="3" and &lt;kw-search-item&gt; is :colspan="2"</b>,
        kw-search-item's size would be one third of kw-search's columns. <br>
        The columns example are as below <br>
        - First kw-search is :cols="4"<br>
        - second kw-search is :cols="3"<br>
        - third kw-search is :cols="2"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-search :cols="4">
            <kw-search-row>
              <kw-search-item
                label="colspan-1/4"
                :colspan="1"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item
                label="colspan-1/4"
                :colspan="1"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item
                label="colspan-2/4"
                :colspan="2"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item label="colspan-1/4">
                <kw-option-group
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-search-item>
              <kw-search-item
                label="colspan-1/4"
                :colspan="1"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item
                label="colspan-2/4"
                :colspan="2"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
          <kw-search
            :cols="3"
            class="mt20"
          >
            <kw-search-row>
              <kw-search-item
                label="colspan-1/3"
                :colspan="1"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item
                label="colspan-1/3"
                :colspan="1"
              >
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-search-item>
              <kw-search-item
                label="colspan-2/3"
                :colspan="2"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
          <kw-search
            :cols="2"
            class="mt20"
          >
            <kw-search-row>
              <kw-search-item
                label="colspan-1/2"
                :colspan="1"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
              <kw-search-item
                label="colspan-1/2"
                :colspan="1"
              >
                <kw-input
                  placeholder="입력해주세요"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item
                label="colspan-2/2"
                :colspan="2"
              >
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  multiple
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </div>

        <guide-code-view
          :code-value="theColumnsOfKwFormItemCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="EssentialExample"
        class="kw-guide-title"
      >
        Essential for the elements
      </h3>
      <p class="kw-guide-description">
        If it is the essential elements(such as "input,checkbox,datapicker,
        radio,select"), add the attribute <b>"required"</b> in the tag of <b> kw-search-item.</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-search :cols="2">
            <kw-search-row>
              <kw-search-item
                label="input"
                :colspan="1"
                required
              >
                <kw-input
                  placeholder="입력해주세요"
                  rules="required"
                />
              </kw-search-item>
              <kw-search-item
                label="select"
                required
              >
                <kw-select
                  :options="['A', 'B', 'C', 'D']"
                  placeholder="선택해 주세요."
                  rules="required"
                />
              </kw-search-item>
            </kw-search-row>

            <kw-search-row>
              <kw-search-item
                label="DateRangePicker"
                required
              >
                <kw-date-range-picker
                  rules="date_range_required|date_range_months:1"
                />
              </kw-search-item>
              <kw-search-item
                label="Date Picker"
                required
              >
                <kw-date-picker
                  rules="required"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item
                label="Radio"
                required
              >
                <kw-option-group
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                  rules="required"
                />
              </kw-search-item>
              <kw-search-item
                label="Checkbox"
                required
              >
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                  rules="required"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </div>

        <guide-code-view
          :code-value="EssentialExample"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="EssentialExample"
        class="kw-guide-title"
      >
        Different Sizes in kw-search-item
      </h3>
      <ol class="kw-guide-description">
        <li>
          <em>Half size</em><br>
          - Add the nessesary elements in kw-search-item. It's half size and 10px between the elements.<br>
        </li>
        <li>
          <em>Different size</em><br>
          - Add the size class in one of the elements.<br>
          Please, Ensure not to put size's class in all of the elements.<br>
          Recommend to add the size class as the high priority elements.<br>
          <b>※ The high priority elements</b><br>
          1. select box<br>
          2. shorter size of elements in kw-search-item<br>
          - The other element which has no size class will be flexible as much as the rest size of kw-search-item<br>
        </li>
        <li>
          <em>The bigger column or the smaller column</em><br>
          - If the general size's different compared to
          kw-form-item's size except of label's size,<br>
          The elements should be wrapped with the classes
          ( <b>size's class , row , items-center </b> )<br>
          - Also add the element's size as much as required size<br>
          <b>※ The elements mean input, select, radio, checkbox and so on</b>
        </li>
      </ol>
      <q-card>
        <div class="kw-guide-example">
          <kw-search>
            <kw-search-row>
              <kw-search-item
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
              </kw-search-item>
              <kw-search-item
                label="Flexible"
              >
                <kw-input
                  rules="required"
                  placeholder="Flexible"
                />
                <kw-select
                  :model-value="['190px']"
                  :options="['190px']"
                  placeholder="190px"
                  rules="required"
                  class="w190"
                />
              </kw-search-item>
              <kw-search-item
                label="width:250"
              >
                <div class="row items-center w250">
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                  <kw-select
                    :model-value="['100px']"
                    :options="['100px', 'B']"
                    placeholder="선택해 주세요."
                    rules="required"
                    class="w100"
                  />
                </div>
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item
                label="600px"
                :colspan="2"
              >
                <div class="row items-center w600">
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                  <kw-select
                    :model-value="['400px']"
                    :options="['400px']"
                    placeholder="선택해 주세요."
                    rules="required"
                    class="w400"
                  />
                </div>
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item
                label="600px"
                :colspan="2"
              >
                <div class="row items-center w600">
                  <kw-input
                    rules="required"
                    placeholder="100px"
                    class="w100"
                  />
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                  <kw-input
                    rules="required"
                    placeholder="Flexible"
                  />
                </div>
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </div>

        <guide-code-view
          :code-value="differentSize"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const searchCode = `
<kw-search :cols="4">
  <kw-search-row>
    <kw-search-item label="지점명">
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item
      label="담당자명"
      required
    >
      <kw-input
        placeholder="입력해주세요"
        rules="required"
      />
    </kw-search-item>
    <kw-search-item label="지역명">
      <kw-input
        readonly
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item label="권역명">
      <kw-input
        placeholder="입력해주세요"
        disable
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item
      label="선택 샘플"
    >
      <kw-select
        :options="['A', 'B', 'C', 'D']"
        placeholder="선택해 주세요."
      />
    </kw-search-item>
    <kw-search-item label="다중선택 샘플 (readonly)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        readonly
      />
    </kw-search-item>
    <kw-search-item label="다중선택 샘플 (disable)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        disable="disable"
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="Radio">
      <kw-field>
        <template #default="{ field }">
          <kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"
            :key="i"
            v-bind="field"
            :val="item"
          />
        </template>
      </kw-field>
    </kw-search-item>

    <kw-search-item label="OptionGroup (readonly)">
      <kw-option-group
        type="radio"
        :options="['김엄마', '김마', '마']"
        disable
      />
    </kw-search-item>
    <kw-search-item label="optiongroup (disable)">
      <kw-option-group
        type="radio"
        :options="['김엄마', '김마', '마']"
        disable
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-for="(item, i) of ['A', 'B', 'C', 'D']"
            :key="i"
            v-bind="field"
            :val="item"
          />
        </template>
      </kw-field>
    </kw-search-item>
    <kw-search-item label="OptionGroup (readonly)">
      <kw-option-group
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-search-item>
    <kw-search-item label="OptionGroup (disable)">
      <kw-option-group
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="DatePicker">
      <kw-date-picker />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="DateRangePicker">
      <kw-date-range-picker
        rules="date_range_required|date_range_months:1"
      />
    </kw-search-item>
    <kw-search-item
      label="DateRangePicker"
      :cols="2"
    >
      <kw-date-range-picker
        rules="date_range_required|date_range_months:1"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
const theColumnsCode = `
  <kw-search :cols="4">
    <kw-search-row>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
    </kw-search-row>
    <kw-search-row>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
    </kw-search-row>
    <kw-search-row>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
    </kw-search-row>
    <kw-search-row>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
      <kw-search-item label="colspan">
        <kw-input
          placeholder="입력해주세요"
        />
      </kw-search-item>
    </kw-search-row>
  </kw-search>
`;
const theColumnsOfKwFormItemCode = `
<!-- 4 columns  -->
<kw-search :cols="4">
  <kw-search-row>
    <kw-search-item
      label="colspan-1/4"
      :colspan="1"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item
      label="colspan-1/4"
      :colspan="1"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item
      label="colspan-2/4"
      :colspan="2"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item label="colspan-1/4">
      <kw-option-group
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-search-item>
    <kw-search-item
      label="colspan-1/4"
      :colspan="1"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item
      label="colspan-2/4"
      :colspan="2"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
<!-- 3 columns  -->
<kw-search :cols="3">
  <kw-search-row>
    <kw-search-item
      label="colspan-1/3"
      :colspan="1"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item
      label="colspan-1/3"
      :colspan="1"
    >
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-search-item>
    <kw-search-item
      label="colspan-2/3"
      :colspan="2"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
<!-- 2 columns  -->
<kw-search :cols="2">
  <kw-search-row>
    <kw-search-item
      label="colspan-1/2"
      :colspan="1"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item
      label="colspan-1/2"
      :colspan="1"
    >
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item
      label="colspan-2/2"
      :colspan="2"
    >
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const EssentialExample = `
<kw-search :cols="2">
  <kw-search-row>
    <kw-search-item
      label="input"
      :colspan="1"
      required
    >
      <kw-input
        placeholder="입력해주세요"
        rules="required"
      />
    </kw-search-item>
    <kw-search-item
      label="select"
      required
    >
      <kw-select
        :options="['A', 'B', 'C', 'D']"
        placeholder="선택해 주세요."
        rules="required"
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item
      label="DateRangePicker"
      required
    >
      <kw-date-range-picker
        rules="date_range_required|date_range_months:1"
      />
    </kw-search-item>
    <kw-search-item
      label="Date Picker"
      required
    >
      <kw-date-picker
        rules="required"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item
      label="Radio"
      required
    >
      <kw-option-group
        type="radio"
        :options="['A', 'B', 'C', 'D']"
        rules="required"
      />
    </kw-search-item>
    <kw-search-item
      label="Checkbox"
      required
    >
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        rules="required"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const differentSize = `

<kw-search-row>
  <!-- half sizes  -->
  <kw-search-item
    label="Half sizes"
  >
    <kw-input
      rules="required"
      placeholder="Half"
    />
    <kw-input
      rules="required"
      placeholder="Half"
    />
  </kw-search-item>
  <!-- one of the elements has 'width' -->
  <kw-search-item
    label="Flexible"
  >
    <kw-input
      rules="required"
      placeholder="Flexible"
    />
    <kw-select
      :model-value="['190px']"
      :options="['190px']"
      placeholder="190px"
      rules="required"
      class="w190"
    />
  </kw-search-item>
  <!-- search-item's width:250. Select's width : 100px -->
  <kw-search-item
    label="width:250"
  >
    <div class="row items-center w250">
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
      <kw-select
        :model-value="['100px']"
        :options="['100px', 'B']"
        placeholder="선택해 주세요."
        rules="required"
        class="w100"
      />
    </div>
  </kw-search-item>
</kw-search-row>
<kw-search-row>
<!-- search-item: :colspan="2" and width:600px. select's width:400px -->
  <kw-search-item
    label="600px"
    :colspan="2"
  >
    <div class="row items-center w600">
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
      <kw-select
        :model-value="['400px']"
        :options="['400px']"
        placeholder="선택해 주세요."
        rules="required"
        class="w400"
      />
    </div>
  </kw-search-item>
</kw-search-row>
<kw-search-row>
<!-- search-item: :colspan="2" and width:600px. Shortest input's width:100px the other one is flexible-->
  <kw-search-item
    label="600px"
    :colspan="2"
  >
    <div class="row items-center w600">
      <kw-input
        rules="required"
        placeholder="100px"
        class="w100"
      />
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
      <kw-input
        rules="required"
        placeholder="Flexible"
      />
    </div>
  </kw-search-item>
</kw-search-row>
`;

const theOneRowCode = `
<kw-search
  class="kw-search--onerow"
>
  <kw-search-row>
    <kw-search-item label="colspan">
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item label="colspan">
      <kw-input
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const guideHistory = [
  {
    timestamp: '2022.08.29',
    text: 'Add case - 1 or 2 Columns in 1 row',
  },
  {
    timestamp: '2022.08.29',
    text: 'Remove the attribut of :col="4" in 1 or 2 Columns in 1 row',
  },
];
</script>
