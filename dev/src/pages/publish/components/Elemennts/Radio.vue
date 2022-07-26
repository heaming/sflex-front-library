<template>
  <kw-page class="kw-guide">
    <h2>Radio</h2>
    <p class="kw-guide-description">
      in search form and table, radio is 18px / default is 22px
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
        Add the attribute <b>"disable"</b> in the tag of <b>"kw-radio"</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Radio">
                <kw-field
                  name="radio"
                  rules="required"
                  :model-value="disableRadio"
                >
                  <template #default="{ field }">
                    <kw-radio
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
        Add the attribute <b>"disable"</b> in the tag of <b>"kw-radio"</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Radio">
                <kw-field
                  name="radio"
                  rules="required"
                  :model-value="readonlyRadio"
                >
                  <template #default="{ field }">
                    <kw-radio
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
        default(optiongroup)
      </h3>
      <p class="kw-guide-description">
        default(optiongroup)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="optiongroup(default)">
                <kw-option-group
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
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
        id="disable"
        class="kw-guide-title"
      >
        disable(OptionGroup)
      </h3>
      <p class="kw-guide-description">
        Add the attribute <b>"disable"</b> in the tag of <b>"kw-option-group"</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="optiongroup (disable)">
                <kw-option-group
                  :model-value="readonlyRadio"
                  name="radioOptionGroup"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C']"
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
        readonly(OptionGroup)
      </h3>
      <p class="kw-guide-description">
        Add the attribute <b> "disable"
          in the tag of </b>
        <b>
          &lt;kw-option-group&gt;
        </b>
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
                  :options="['A', 'B', 'C']"
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
const readonlyRadio = ref('A');
const disableRadio = ref('A');
</script>
