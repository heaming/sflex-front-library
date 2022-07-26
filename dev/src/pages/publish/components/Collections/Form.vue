<template>
  <kw-page class="kw-guide">
    <h2>Form</h2>
    <p class="kw-guide-description">
      kw-form > kw-form-row > kw-form-item > "CheckBox, Input, Radio , Select"
    </p>
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
        Add the columns number in <b>cols = "" </b> in the tag of kw-form-row (default: three columns)<br>
        Add the columns number in <b>colspan = "" </b> in the tag of kw-form-item<br>
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
        the columns of kw-form-item
      </h3>
      <p class="kw-guide-description">
        if <b>&lt;kw-form&gt; is cols="3" and &lt;kw-form-item&gt; is colspan="2"</b>,
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

</style>
