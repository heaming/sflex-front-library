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
          <HighCode
            :code-value="radioDefaultCode"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
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
                  :model-value="[]"
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
          <HighCode
            :code-value="radioDisableCode"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
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
                  :model-value="[]"
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
          <HighCode
            :code-value="radioReadonlyCode"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="defaultOptionGroup"
        class="kw-guide-title"
      >
        default(optionGroup)
      </h3>
      <p class="kw-guide-description">
        default(optiongroup)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="optiongroup (default)">
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
          <HighCode
            :code-value="groupRadioDefaultCode"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disableOptionGroup"
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
                  :model-value="[]"
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
            <HighCode
              :code-value="groupRadioDisableCode"
              :lang="vue"
              theme="light"
              width="100%"
              height="auto"
            />
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="readonlyOptionGroup"
        class="kw-guide-title"
      >
        readonly(OptionGroup)
      </h3>
      <p class="kw-guide-description">
        Add the attribute <b>"disable"</b> in the tag of <b>"kw-option-group"</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (readonly)">
                <kw-option-group
                  :model-value="[]"
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
          <HighCode
            :code-value="groupRadioReadonlyCode"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

const vue = 'vue';

const radioDefaultCode = `
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
`;

const radioDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Radio">
      <kw-field
        name="radio"
        rules="required"
        :model-value="[]"
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
`;

const radioReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Radio">
      <kw-field
        name="radio"
        rules="required"
        :model-value="[]"
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
`;

const groupRadioDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const groupRadioDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (disable)">
      <kw-option-group
        :model-value="[]"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const groupRadioReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (disable)">
      <kw-option-group
        :model-value="[]"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

// const readonlyRadio = ref('A');
// const disableRadio = ref('A');
</script>
