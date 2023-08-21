<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Checkbox
    </h2>
    <p class="kw-guide-description">
      In the search form or table, checkbox's height is 18px / default is 22px
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              The Element(tag's name)
            </th>
            <th>
              Attr or Class
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
              label
            </td>
            <td>
              Add the title of content
            </td>
          </tr>
          <tr>
            <td>
              kw-field
            </td>
            <td>
              :model-value="[]"<br>
              rules="required"<br>
            </td>
            <td>
              Required, Default : "[]"<br>
              Add this when Essential Case<br>
            </td>
          </tr>
          <tr>
            <td>
              template
            </td>
            <td>
              template #default="{ field }"<br>
            </td>
            <td>
              Required, Default : "{ field }"<br>
            </td>
          </tr>
          <tr>
            <td>
              kw-checkbox
            </td>
            <td>
              v-bind="field"<br>
              label=""<br>
              val=""<br>
              disable
            </td>
            <td>
              Required, Default : "field"<br>
              Copy the text from zeplin if there is something to write in<br>
              Required, Default : ""<br>
              Add the attribue "disable" when it is required to be readonly or disable
            </td>
          </tr>
          <tr>
            <td>
              kw-option-group
            </td>
            <td>
              :model-value="[]"<br>
              rules="required"<br>
              type="checkbox"<br>
              :options="['A', 'B', 'C', 'D']"<br>
              dense <br>
              disable
            </td>
            <td>
              Required, Default : "[]" <br>
              Add this when Essential Case <br>
              Required, Default : "checkbox" <br>
              Add the option lists in [ ]<br>
              height: 32px; font-size: 14px <br>
              Add the attribue "disable" when it is required to be readonly or disable
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <p class="kw-guide-description" />
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          If there is only one option in checkbox, kw-checkbox is required to be wrapped by <b>kw-field</b>.<br>
        </li>
        <li>If there are more than two options, it is required to use <b>kw-option-group</b></li>
        <li>For 'label' width, refer to 'Collections/Form'.</li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        checkbox - If there is <b> only one option </b> in checkbox, it is required to use
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Checkbox">
                <kw-field
                  :model-value="[]"
                >
                  <template #default="{ field }">
                    <kw-checkbox
                      v-bind="field"
                      label=""
                      val=""
                    />
                  </template>
                </kw-field>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="Checkbox">
                <kw-checkbox
                  v-model="checkTemp"
                  label="플러스서비스"
                  checked-icon="check_24"
                  unchecked-icon="check_24"
                  class="check-btn"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="checkboxDefaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disable"
        class="kw-guide-title"
      >
        Disable
      </h3>
      <p class="kw-guide-description">
        Add the attribute<b> "disable" </b> in the tag of <b>
          &lt;kw-checkbox&gt; </b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Checkbox">
                <kw-field
                  :model-value="['Y']"
                >
                  <template #default="{ field }">
                    <kw-checkbox
                      v-bind="field"
                      label=""
                      val=""
                      disable
                    />
                  </template>
                </kw-field>
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="checkboxDisableCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="readonly"
        class="kw-guide-title"
      >
        Readonly
      </h3>
      <p class="kw-guide-description">
        Add the attribute <b> "disable" </b> in the tag of <b>
          &lt;kw-checkbox&gt; </b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Checkbox">
                <kw-field
                  :model-value="[]"
                >
                  <template #default="{ field }">
                    <kw-checkbox
                      v-bind="field"
                      label=""
                      val=""
                      disable
                    />
                  </template>
                </kw-field>
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="checkboxReadonlyCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="defaultOptionGroup"
        class="kw-guide-title"
      >
        Default(OptionGroup)
      </h3>
      <p class="kw-guide-description">
        kw-option-group - If there are <b> more than two options</b>, it is required to use kw-option-group
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="OptionGroup">
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="groupCheckboxDefaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disableOptionGroup"
        class="kw-guide-title"
      >
        Disable(OptionGroup)
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
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                  disable
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="groupCheckboxDisableCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="readonlyOptionGroup"
        class="kw-guide-title"
      >
        Readonly(OptionGroup)
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
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                  disable
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="groupCheckboxReadonlyCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="essential"
        class="kw-guide-title"
      >
        Essential
      </h3>
      <p class="kw-guide-description">
        - add attribute <b> "required" </b> <b> &lt;kw-form-item&gt; </b>
        when it needs to be essential to input <br>
        - add attribute <b>rules="required"</b> in <b>&lt;kw-checkbox&gt;</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="OptionGroup"
                required
              >
                <kw-option-group
                  :model-value="[]"
                  type="checkbox"
                  :options="['A', 'B', 'C', 'D']"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="essentialCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>
const checkTemp = ref('Y');
const checkboxDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-bind="field"
            label=""
            val=""
          />
        </template>
      </kw-field>
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-bind="field"
            label=""
            val=""
          />
        </template>
      </kw-field>
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const checkboxDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-bind="field"
            label=""
            val=""
            disable
          />
        </template>
      </kw-field>
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-bind="field"
            label=""
            val=""
            disable
          />
        </template>
      </kw-field>
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const checkboxReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-bind="field"
            label=""
            val=""
            disable
          />
        </template>
      </kw-field>
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="Checkbox">
      <kw-field
        :model-value="[]"
      >
        <template #default="{ field }">
          <kw-checkbox
            v-bind="field"
            label=""
            val=""
            disable
          />
        </template>
      </kw-field>
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const groupCheckboxDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="OptionGroup">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const groupCheckboxDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="OptionGroup (disable)">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="OptionGroup (disable)">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const groupCheckboxReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="OptionGroup (readonly)">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="OptionGroup (readonly)">
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        disable
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const essentialCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item
      label="OptionGroup"
      required
    >
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-form-item
      label="OptionGroup"
      required
    >
      <kw-option-group
        :model-value="[]"
        type="checkbox"
        :options="['A', 'B', 'C', 'D']"
        rules="required"
      />
    </kw-form-item>
  </kw-search-row>
</kw-search>
`;
// const readonlyCheckbox = ref(['A']);eckboxOptionGroup = ref(['A']);

const guideHistory = [
  {
    timestamp: '2022-11-22',
    text: 'Add dense prop',
  },
  {
    timestamp: '2022-09-06',
    text: 'change guide content about essential type',
  },
  {
    timestamp: '2022-09-02',
    text: 'add the example of having tilde special symbol',
  },
  {
    timestamp: '2022-09-01',
    text: 'remove the placeholder attribute',
  },
];
</script>
