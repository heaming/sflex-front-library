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
        summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              the Element(tag's name)
            </th>
            <th>
              attribute(class)
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
              essential - class
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
              add the attribute "disable" in the tag of element which is wrapped for kw-form-item.
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
              add the attribute "disable" in the tag of element which is wrapped for kw-form-item
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
              add the number in cols="" and it belongs to kw-form / kw-search's tag as attribute
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
              add the number in colspan="" and it belongs to kw-form-item's tag as attribute
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
        the columns
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
        the columns of kw-form-item
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
                <kw-field
                  name="radio"
                  rules="required"
                >
                  <template #default="{ field }">
                    <kw-radio
                      v-for="(item, i) of ['A', 'B', 'C', 'D']"
                      :key="i"
                      v-bind="field"
                      :val="item"
                    />
                  </template>
                </kw-field>
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
        the Form example
      </h3>
      <p class="kw-guide-description">
        the example is as below<br>
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
                <kw-field
                  name="radio"
                  rules="required"
                >
                  <template #default="{ field }">
                    <kw-radio
                      v-for="(item, i) of ['A', 'B', 'C', 'D']"
                      :key="i"
                      v-bind="field"
                      :val="item"
                    />
                  </template>
                </kw-field>
              </kw-form-item>
              <kw-form-item
                label="Checkbox"
                class="essential"
              >
                <kw-field
                  :model-value="[]"
                  name="checkbox"
                  rules="required"
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
      <kw-field
        name="radio"
        rules="required"
      >
        <template #default="{ field }">
          <kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"
            :key="i"
            v-bind="field"
            :val="item"
          />
        </template>
      </kw-field>
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
      <kw-field
        name="radio"
        rules="required"
      >
        <template #default="{ field }">
          <kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"
            :key="i"
            v-bind="field"
            :val="item"
          />
        </template>
      </kw-field>
    </kw-form-item>
    <kw-form-item
      label="Checkbox"
      class="essential"
    >
      <kw-field
        :model-value="[]"
        name="checkbox"
        rules="required"
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
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

</script>

<script>
export default {
  data() {
    return {
      isActive: false,
      isActive02: false,
      isActive03: false,
      isActive04: false,
    };
  },
  methods: {
    toggleShow(e) {
      switch (e) {
        case 'code01':
          this.isActive = !this.isActive;
          break;
        case 'code02':
          this.isActive02 = !this.isActive02;
          break;
        case 'code03':
          this.isActive03 = !this.isActive03;
          break;
        case 'code04':
          this.isActive04 = !this.isActive04;
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.kw-guide-code {
  display: none;

  &.active {
    display: block;
  }
}
</style>
