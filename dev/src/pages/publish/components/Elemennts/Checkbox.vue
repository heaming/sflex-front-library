<template>
  <kw-page class="kw-guide">
    <h2>Checkbox</h2>
    <p class="kw-guide-description">
      in the search form or table, checkbox is 18px / default is 22px
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        checkbox
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Checkbox">
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
        <div class="kw-guide-code">
          <code>
            &lt;kw-field
            name="radio"<br>
            rules="required"<br>
            &gt;
            &lt;template #default="{ field }"&gt;<br>
            &lt;kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"<br>
            :key="i"
            v-bind="field"<br>
            :val="item"
            /&gt;<br>
            &lt;/template&gt;<br>
            &lt;/kw-field&gt;<br>
          </code>
        </div>
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
        add <span class="kw-guide-highlight"> "disable" </span> in the tag of <span class="kw-guide-highlight">
          &lt;kw-checkbox&gt; </span>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Checkbox">
                <kw-field
                  :model-value="checkboxOptionGroup"
                  name="checkbox"
                  rules="required"
                >
                  <template #default="{ field }">
                    <kw-checkbox
                      v-for="(item, i) of ['A', 'B', 'C', 'D']"
                      :key="i"
                      v-bind="field"
                      :val="item"
                      disable
                    />
                  </template>
                </kw-field>
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-field
            name="radio"<br>
            rules="required"<br>
            &gt;
            &lt;template #default="{ field }"&gt;<br>
            &lt;kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"<br>
            :key="i"
            v-bind="field"<br>
            :val="item"
            /&gt;<br>
            &lt;/template&gt;<br>
            &lt;/kw-field&gt;<br>
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
        add <span class="kw-guide-highlight"> "disable" </span> in the tag of <span class="kw-guide-highlight">
          &lt;kw-checkbox&gt; </span>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Checkbox">
                <kw-field
                  :model-value="readonlyCheckbox"
                  name="checkbox"
                  rules="required"
                >
                  <template #default="{ field }">
                    <kw-checkbox
                      v-for="(item, i) of ['A', 'B', 'C', 'D']"
                      :key="i"
                      v-bind="field"
                      :val="item"
                      disable
                    />
                  </template>
                </kw-field>
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-field
            name="radio"<br>
            rules="required"<br>
            &gt;
            &lt;template #default="{ field }"&gt;<br>
            &lt;kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"<br>
            :key="i"
            v-bind="field"<br>
            :val="item"
            /&gt;<br>
            &lt;/template&gt;<br>
            &lt;/kw-field&gt;<br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="defaultOption"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        default of kw-option-group
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (readonly)">
                <kw-option-group
                  :model-value="readonlyCheckbox"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
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
        id="disableOption"
        class="kw-guide-title"
      >
        disable
      </h3>
      <p class="kw-guide-description">
        add <span class="kw-guide-highlight"> "disable" </span> in the tag of <span class="kw-guide-highlight">
          &lt;kw-option-group&gt; </span>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (readonly)">
                <kw-option-group
                  :model-value="readonlyCheckbox"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
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
        id="readonlyOption"
        class="kw-guide-title"
      >
        readonly
      </h3>
      <p class="kw-guide-description">
        add <span class="kw-guide-highlight"> "disable" </span> in the tag of <span class="kw-guide-highlight">
          &lt;kw-option-group&gt; </span>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (disable)">
                <kw-option-group
                  :model-value="checkboxOptionGroup"
                  name="checkboxOptionGroup"
                  rules="required"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
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
            v-model="readonlyValue"<br>
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
  </kw-page>
</template>
<script setup>
const readonlyCheckbox = ref(['A']);
const checkboxOptionGroup = ref(['A']);
</script>
