<template>
  <kw-page class="kw-guide">
    <h2>Radio</h2>
    <p class="kw-guide-description">
      검색/테이블 내는 Radio 18px/ default는 22px
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        Radio
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Radio">
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
        Add attribute <span class="kw-guide-highlight"> "disable" </span> in the tag of <span
          class="kw-guide-highlight"
        >
          &lt;kw-option-group&gt; </span>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="optiongroup (disable)">
                <kw-option-group
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['김엄마', '김마', '마']"
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
        id="readonly"
        class="kw-guide-title"
      >
        readonly
      </h3>
      <p class="kw-guide-description">
        Add attribute <span class="kw-guide-highlight"> "disable" </span> in the tag of <span
          class="kw-guide-highlight"
        >
          &lt;kw-option-group&gt; </span>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (readonly)">
                <kw-option-group
                  :model-value="readonlyRadio"
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['김엄마', '김마', '마']"
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
const readonlyRadio = ref('김마');
</script>
