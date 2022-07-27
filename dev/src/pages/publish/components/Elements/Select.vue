<template>
  <kw-page class="kw-guide">
    <h2>Select(40px)</h2>
    <p class="kw-guide-description">
      default-height:40px, searchform- 32px;
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        select(default)
      </h3>
      <p class="kw-guide-description">
        select default( height:40px)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
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
          </kw-form>
        </div>
        <div class="kw-guide-code" />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="mutiple"
        class="kw-guide-title"
      >
        select(Multiple)
      </h3>
      <p class="kw-guide-description">
        add <span class="kw-guide-highlight"> multiple </span> attribute in the tag of "kw-select"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Select (Multiple)">
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
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명" class="essential"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
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
        id="readonly"
        class="kw-guide-title"
      >
        readonly
      </h3>
      <p class="kw-guide-description">
        add attribute <span class="kw-guide-highlight">readonly</span> in the tag of "kw-select"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="다중선택 샘플 (readonly)">
                <kw-select
                  :model-value="readonlySelect"
                  :options="['A', 'B', 'C', 'D']"
                  multiple
                  name="selectMultiple"
                  rules="required"
                  readonly
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <div class="kw-guide-code" />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disable"
        class="kw-guide-title"
      >
        disable
      </h3>
      <p class="kw-guide-description">
        Add attribute <span class="kw-guide-highlight">disable</span> in the tag of "kw-select"
      </p>
      <q-card>
        <div>
          <div class="kw-guide-example">
            <kw-form>
              <kw-form-row>
                <kw-form-item label="다중선택 샘플 (disable)">
                  <kw-select
                    :model-value="[]"
                    :options="['A', 'B', 'C', 'D']"
                    multiple
                    name="selectMultiple"
                    rules="required"
                    disable
                  />
                </kw-form-item>
              </kw-form-row>
            </kw-form>
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
        </div>
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>
</script>
