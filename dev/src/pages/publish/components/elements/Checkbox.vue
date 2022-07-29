<template>
  <kw-page class="kw-guide">
    <h2>Checkbox</h2>
    <p class="kw-guide-description">
      in the search form or table, checkbox's height is 18px / default is 22px
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
              kw-form-item (sample)
            </td>
            <td>
              essential - class (sample)
            </td>
            <td>
              add the class "essential" in the tag of kw-form-item. (sample)
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
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
          <HighCode
            :code-value="checkboxDefaultCode"
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
        add the attribute<b> "disable" </b> in the tag of <b>
          &lt;kw-checkbox&gt; </b>
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
            :code-value="checkboxDisableCode"
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
        add the attribute <b> "disable" </b> in the tag of <b>
          &lt;kw-checkbox&gt; </b>
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
            :code-value="checkboxReadonlyCode"
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
        default
      </h3>
      <p class="kw-guide-description">
        default of kw-option-group
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup">
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
        <div class="kw-guide-code">
          <HighCode
            :code-value="groupCheckboxDefaultCode"
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
        disable
      </h3>
      <p class="kw-guide-description">
        add the attribute <b> "disable" </b> in the tag of <b>
          &lt;kw-option-group&gt; </b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (disable)">
                <kw-option-group
                  :model-value="[]"
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
          <HighCode
            :code-value="groupCheckboxDisableCode"
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
        id="readonlyOptionGroup"
        class="kw-guide-title"
      >
        readonly
      </h3>
      <p class="kw-guide-description">
        add the attribute <b> "disable" </b> in the tag of <b>
          &lt;kw-option-group&gt; </b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup (readonly)">
                <kw-option-group
                  :model-value="[]"
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
          <HighCode
            :code-value="groupCheckboxReadonlyCode"
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

const checkboxDefaultCode = `
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
`;

const checkboxDisableCode = `
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
            disable
          />
        </template>
      </kw-field>
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const checkboxReadonlyCode = `
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
            disable
          />
        </template>
      </kw-field>
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const groupCheckboxDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="OptionGroup">
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

const groupCheckboxDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="OptionGroup (disable)">
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const groupCheckboxReadonlyCode = `
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







<kw-form>
  <kw-form-row>
    <kw-form-item label="OptionGroup (disable)">
      <kw-option-group
        :model-value="[]"
        name="checkboxOptionGroup"
        rules="required"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

// const readonlyCheckbox = ref(['A']);eckboxOptionGroup = ref(['A']);
</script>
