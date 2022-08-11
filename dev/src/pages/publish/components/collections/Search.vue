<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Search Form
    </h2>
    <p class="kw-guide-description">
      kw-search-form > kw-search-row > kw-search-item > elements ( CheckBox, Input, Radio , Select, datapicker )<br>
      - This is the sequence to be wrapped<br>
      it is necessary to be wrapped for using the element's tags from 'kw-form' to the element.
    </p>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        the &lt;kw-search&gt; form
      </h3>
      <p class="kw-guide-description">
        The 'kw-search' example is as below.<br>
        when 'kw-search' is used, it is included in the border of outside.<br>
        Instead of 'kw-form', &lt;kw-search&gt; form wrap 'kw-search-row'.<br>
        Add the columns number cols="4" in the tag of 'kw-search' (default: three columns)<br><br>
        If there are more than 3 'rows', only two are exposed and the rest are hidden.
        And the 'More' button will appear automatically.
      </p>
      <q-card>
        <kw-search
          :key="formKey"
          ref="formRef"
          :autofocus="autofocus"
          :no-reset-focus="noResetFocus"
          :cols="4"
        >
          <kw-search-row>
            <kw-search-item label="지점명">
              <kw-input
                name="input"
                rules="required"
                placeholder="입력해주세요"
              />
            </kw-search-item>
            <kw-search-item
              label="담당자명"
              class="essential"
            >
              <!-- 필수 입력의 경우 essential 클래스 추가-->
              <kw-input
                name="input"
                rules="required"
                placeholder="입력해주세요"
              />
            </kw-search-item>
            <kw-search-item label="지역명">
              <kw-input
                v-model="readonlyValue"
                name="input"
                readonly
                rules="required"
                placeholder="입력해주세요"
              />
            </kw-search-item>
            <kw-search-item label="권역명">
              <kw-input
                name="input"
                rules="required"
                placeholder="입력해주세요"
                disable
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item
              label="선택 샘플"
              class="essential"
            >
              <kw-select
                :model-value="[]"
                :options="['A', 'B', 'C', 'D']"
                placeholder="선택해 주세요."
                name="select"
                rules="required"
              />
            </kw-search-item>
            <kw-search-item label="다중선택 샘플 (readonly)">
              <kw-select
                :model-value="readonlySelect"
                :options="['A', 'B', 'C', 'D']"
                multiple
                name="selectMultiple"
                rules="required"
                readonly
              />
            </kw-search-item>
            <kw-search-item label="다중선택 샘플 (disable)">
              <kw-select
                :model-value="[]"
                :options="['A', 'B', 'C', 'D']"
                multiple
                name="selectMultiple"
                rules="required"
                disable="disable"
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="Radio">
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
            </kw-search-item>

            <kw-search-item label="OptionGroup (readonly)">
              <kw-option-group
                :model-value="readonlyRadio"
                name="radioOptionGroup"
                rules="required"
                type="radio"
                :options="['김엄마', '김마', '마']"
                disable
              />
            </kw-search-item>
            <kw-search-item label="optiongroup (disable)">
              <kw-option-group
                name="radioOptionGroup"
                rules="required"
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
            </kw-search-item>
            <kw-search-item label="OptionGroup (readonly)">
              <kw-option-group
                :model-value="readonlyCheckbox"
                name="checkboxOptionGroup"
                rules="required"
                type="checkbox"
                :options="['A', 'B', 'C', 'D']"
                disable
              />
            </kw-search-item>
            <kw-search-item label="OptionGroup (disable)">
              <kw-option-group
                :model-value="[]"
                name="checkboxOptionGroup"
                rules="required"
                type="checkbox"
                :options="['A', 'B', 'C', 'D']"
                disable
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="DatePicker">
              <kw-date-picker
                name="datePicker"
                rules="required"
              />
            </kw-search-item>
          </kw-search-row>

          <kw-search-row>
            <kw-search-item label="DateRangePicker">
              <kw-date-range-picker
                name="dateRangePicker"
                rules="date_range_required|date_range_months:1"
              />
            </kw-search-item>
            <kw-search-item
              label="DateRangePicker"
              cols="2"
            >
              <kw-date-range-picker
                name="dateRangePicker"
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
  </kw-page>
</template>

<script setup>

const searchCode = `
<kw-search
  :key="formKey"
  ref="formRef"
  :autofocus="autofocus"
  :no-reset-focus="noResetFocus"
  :cols="4"
>
  <kw-search-row>
    <kw-search-item label="지점명">
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item
      label="담당자명"
      class="essential"
    >
      <!-- 필수 입력의 경우 essential 클래스 추가-->
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item label="지역명">
      <kw-input
        v-model="readonlyValue"
        name="input"
        readonly
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
    <kw-search-item label="권역명">
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
        disable
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item
      label="선택 샘플"
      class="essential"
    >
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        placeholder="선택해 주세요."
        name="select"
        rules="required"
      />
    </kw-search-item>
    <kw-search-item label="다중선택 샘플 (readonly)">
      <kw-select
        :model-value="readonlySelect"
        :options="['A', 'B', 'C', 'D']"
        multiple
        name="selectMultiple"
        rules="required"
        readonly
      />
    </kw-search-item>
    <kw-search-item label="다중선택 샘플 (disable)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        name="selectMultiple"
        rules="required"
        disable="disable"
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="Radio">
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
    </kw-search-item>

    <kw-search-item label="OptionGroup (readonly)">
      <kw-option-group
        :model-value="readonlyRadio"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['김엄마', '김마', '마']"
        disable
      />
    </kw-search-item>
    <kw-search-item label="optiongroup (disable)">
      <kw-option-group
        name="radioOptionGroup"
        rules="required"
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
    </kw-search-item>
    <kw-search-item label="OptionGroup (readonly)">
      <kw-option-group
        :model-value="readonlyCheckbox"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-search-item>
    <kw-search-item label="OptionGroup (disable)">
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="DatePicker">
      <kw-date-picker
        name="datePicker"
        rules="required"
      />
    </kw-search-item>
  </kw-search-row>

  <kw-search-row>
    <kw-search-item label="DateRangePicker">
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_required|date_range_months:1"
      />
    </kw-search-item>
    <kw-search-item
      label="DateRangePicker"
      cols="2"
    >
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_required|date_range_months:1"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
</script>
<style lang="scss">
// .q-field__native { max-width: 310px; }
// .mw100 > div > div > div > input { max-width: 100% !important; }
</style>
