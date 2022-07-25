<template>
  <kw-page class="kw-guide">
    <h2>Search Form</h2>
    <p class="kw-guide-description">
      kw-form-row > kw-form-item > "CheckBox, Input, Radio , Select"
    </p>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        columns
      </h3>
      <p class="kw-guide-description">
        There are the 4 types of column.<br>
        Add the tags of kw-form-item(which inclunde kw-input, kw-search,
        kw-radio and so on) as many as it needs until 4 in
        kw-form-row<br>
        Add the columns number cols="3" in the tag of "kw-form-row" (default: three columns)<br>
        Add the columns number colspan="2" in the tag of "kw-form-item"<br>
        The example below is kw-form cols="4"
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
        <div class="kw-guide-codeButton">
          <button>
            Show code &darr;
          </button>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            disable<br>
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id=""
        class="kw-guide-title"
      >
        column of kw-form-item
      </h3>
      <p class="kw-guide-description">
        if kw-form is cols="3" and kw-form-item is colspan="2",
        kw-form-item's size would be one third of kw-form's columns.
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
              <kw-form-item label="colspan-1">
                <kw-option-group
                  :model-value="[]"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                  disable
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
              <kw-form-item label="colspan-2">
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  multiple
                  name="selectMultiple"
                  rules="required"
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
          </kw-form>
        </div>
        <div class="kw-guide-codeButton">
          <button>
            Show code &darr;
          </button>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            disable<br>
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="example"
        class="kw-guide-title"
      >
        Form example
      </h3>
      <p class="kw-guide-description">
        the example below
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="3">
            <kw-form-row>
              <kw-form-item
                label="항목명 기본 2줄일 경우"
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
                label="DateRangePicker"
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
        <div class="kw-guide-codeButton">
          <button>
            Show code &darr;
          </button>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            disable<br>
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
</script>
<style lang="scss">
// .q-field__native { max-width: 310px; }
// .mw100 > div > div > div > input { max-width: 100% !important; }
</style>
