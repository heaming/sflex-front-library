<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Form
    </h2>
    <p class="kw-guide-description">
      kw-form > kw-form-row > kw-form-item > the elements (CheckBox, Input, Radio , Select)<br>
      - This is the sequence to be wrapped<br>
      it is necessary to be wrapped for using the element's tags from kw-form to the element.
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
              kw-form-item
            </td>
            <td>
              essential
            </td>
            <td>
              add the class "essential" in the tag of kw-form-item.
            </td>
          </tr>
          <tr>
            <td>
              the element in kw-form-item
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
              the element in kw-form-item
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
              kw-form / kw-search
            </td>
            <td>
              cols=""
            </td>
            <td>
              Add the number in cols="" and it belongs to kw-form / kw-search's tag as attribute
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
              kw-form / kw-search
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
        Columns
      </h3>
      <p class="kw-guide-description">
        There are the 4 types of column.<br>
        Add the tags of <b> kw-form-item </b> (which include
        kw-input, kw-search,
        kw-radio and so on) as many as it needs until <b>4 columns in kw-form-row</b><br>
        Add the columns number in <b>cols = "" </b> in the tag of <b> kw-form or kw-search</b> (default: three
        columns)<br>
        Add the columns number in <b>colspan = "" </b> in the tag of <b>kw-form-item</b><br>
        The example is kw-form cols="4"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="4">
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
              <kw-form-item label="colspan">
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
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
          </kw-form>
        </div>
        <guide-code-view
          :code-value="theColumnsCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columnsFormItem"
        class="kw-guide-title"
      >
        The columns of kw-form-item
      </h3>
      <p class="kw-guide-description">
        if <b>&lt;kw-form&gt; is cols="3" and &lt;kw-form-item&gt; is colspan="2"</b>,
        kw-form-item's size would be one third of kw-form's columns. <br>
        The columns example are as below <br>
        - kw-form is cols="4" from 1st line to 3rd line <br>
        - kw-form is cols="3" from 4th line to 5th line <br>
        - kw-form is cols="2" from 6th line to 7th line
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="4">
            <kw-form-row>
              <kw-form-item
                label="colspan-1/4"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="colspan-1/4"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
              <kw-form-item
                label="colspan-2/4"
                colspan="2"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="colspan-1/4">
                <kw-option-group
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item
                label="colspan-1/4"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
              <kw-form-item
                label="colspan-2/4"
                colspan="2"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
          <kw-form cols="3">
            <kw-form-row>
              <kw-form-item
                label="colspan-1/3"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="colspan-1/3"
                colspan="1"
              >
                <kw-option-group
                  :model-value="[]"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item
                label="colspan-2/3"
                colspan="2"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
          <kw-form cols="2">
            <kw-form-row>
              <kw-form-item
                label="colspan-1/2"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
              <kw-form-item
                label="colspan-1/2"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="colspan-2/2"
                colspan="2"
              >
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  multiple
                  name="selectMultiple"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>

        <guide-code-view
          :code-value="theColumnsOfKwFormItemCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columnsExample"
        class="kw-guide-title"
      >
        Form example
      </h3>
      <p class="kw-guide-description">
        The example is as below<br>
        kw-form cols="2",<br>
        kw-form-item colspan="1" in kw-form-item except of the second line(second line's kw-form-item is colspan"2" )
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="2">
            <kw-form-row>
              <kw-form-item
                label="항목명 기본 2줄일 경우"
                colspan="1"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                class="essential"
                label="프로모션명"
                colspan="3"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="초등 올인원 패키지"
                />
                <span class="kw-text-counter">(10/30)</span>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="프로모션기간"
                class="essential"
              >
                <kw-date-range-picker
                  name="dateRangePicker"
                  rules="date_range_required|date_range_months:1"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="프로모션적용월"
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
          :code-value="theFormExampleCode"
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
        radio,select"), add the class <b>"essential"</b> in the tag of <b> kw-form-item.</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="2">
            <kw-form-row>
              <kw-form-item
                label="input"
                colspan="1"
                class="essential"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
              <kw-form-item
                label="select"
                class="essential"
              >
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  placeholder="선택해 주세요."
                  name="select"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>

            <kw-form-row>
              <kw-form-item
                label="DateRangePicker"
                class="essential"
              >
                <kw-date-range-picker
                  name="dateRangePicker"
                  rules="date_range_required|date_range_months:1"
                />
              </kw-form-item>
              <kw-form-item
                label="dateRangePicker"
                class="essential"
              >
                <kw-date-picker
                  name="datePicker"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item
                label="Radio"
                class="essential"
              >
                <kw-option-group
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
              <kw-form-item
                label="Checkbox"
                class="essential"
              >
                <kw-option-group
                  :model-value="[]"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>

        <guide-code-view
          :code-value="essentialForTheElememtsCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const theColumnsCode = `
<kw-form cols="4">
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
    <kw-form-item label="colspan">
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
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
</kw-form>
`;

const theColumnsOfKwFormItemCode = `
<kw-form cols="4">
  <kw-form-row>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item
      label="colspan-2"
      colspan="2"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="colspan-1">
      <kw-option-group
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item
      label="colspan-2"
      colspan="2"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
<kw-form cols="3">
  <kw-form-row>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item
      label="colspan-2"
      colspan="2"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
<kw-form cols="2">
  <kw-form-row>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item
      label="colspan-1"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="colspan-2"
      colspan="2"
    >
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        name="selectMultiple"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const theFormExampleCode = `
<kw-form cols="2">
  <kw-form-row>
    <kw-form-item
      label="항목명 기본 2줄일 경우"
      colspan="1"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      class="essential"
      label="프로모션명"
      colspan="3"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="초등 올인원 패키지"
      />
      <span class="kw-text-counter">(10/30)</span>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="프로모션기간"
      class="essential"
    >
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_required|date_range_months:1"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="프로모션적용월"
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

const essentialForTheElememtsCode = `
<kw-form cols="2">
  <kw-form-row>
    <kw-form-item
      label="input"
      colspan="1"
      class="essential"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
    <kw-form-item
      label="select"
      class="essential"
    >
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        placeholder="선택해 주세요."
        name="select"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>

  <kw-form-row>
    <kw-form-item
      label="DateRangePicker"
      class="essential"
    >
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_required|date_range_months:1"
      />
    </kw-form-item>
    <kw-form-item
      label="dateRangePicker"
      class="essential"
    >
      <kw-date-picker
        name="datePicker"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item
      label="Radio"
      class="essential"
    >
      <kw-option-group
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item
      label="Checkbox"
      class="essential"
    >
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

</script>

<style lang="scss" scoped>
.kw-guide-code {
  display: none;

  &.active {
    display: block;
  }
}
</style>
