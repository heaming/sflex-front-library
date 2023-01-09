<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Radio
    </h2>
    <p class="kw-guide-description">
      Default size is 22px / In search form and table, radio size is 18px
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
              The Element(Tag's name)
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
              label=" " <br>
              required
            </td>
            <td>
              Add the title of content <br>
              Add this when Essential Case
            </td>
          </tr>
          <tr>
            <td>
              kw-option-group
            </td>
            <td>
              rules="required"<br>
              type="radio"<br>
              :options="['A', 'B', 'C', 'D']"<br>
              disable<br>
              :model-value="[]" <br>
              dense
            </td>
            <td>
              Add this when Essential Case<br>
              Required, Default : "radio"<br>
              Add the option lists in [ ]<br>
              Add the attribue "disable" when it is required to be readonly or disable<br>
              Required, Default : "[]" <br>
              height: 32px; font-size: 14px
            </td>
          </tr>
          <tr>
            <td>
              kw-radio
            </td>
            <td>
              label="text"
            </td>
            <td>
              If you need single radio option please use kw-radio tag<br>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>For 'label' width, refer to 'Collections/Form'.</li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="defaultOptionGroup"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        single
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="single radio">
                <kw-radio label="single radio" />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="singleRadioCode"
          lang="vue"
        />
      </q-card>
      <p class="kw-guide-description mt30">
        multiple
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="optiongroup (default)">
                <kw-option-group
                  :model-value="'A'"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="groupRadioDefaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disableOptionGroup"
        class="kw-guide-title"
      >
        Disable
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
                  :model-value="'B'"
                  type="radio"
                  :options="['A', 'B', 'C']"
                  disable
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="groupRadioDisableCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="readonlyOptionGroup"
        class="kw-guide-title"
      >
        Readonly
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
                  :model-value="'C'"
                  type="radio"
                  :options="['A', 'B', 'C']"
                  disable
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="groupRadioReadonlyCode"
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
        - add attribute <b> "required" </b> in <b> &lt;kw-form-item&gt; </b>
        when it needs to be essential to input <br>
        - add attribute <b>rules="required"</b> in <b>&lt;kw-radio&gt;</b>
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
                  :model-value="'C'"
                  rules="required"
                  type="radio"
                  :options="['A', 'B', 'C']"
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
const singleRadioCode = `
<kw-radio label="single radio" />
`;
const groupRadioDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        :model-value="'A'"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="optiongroup (default)">
      <kw-option-group
        :model-value="'A'"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const groupRadioDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (disable)">
      <kw-option-group
        :model-value="'B'"
        type="radio"
        :options="['A', 'B', 'C']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="optiongroup (disable)">
      <kw-option-group
        :model-value="'B'"
        type="radio"
        :options="['A', 'B', 'C']"
        disable
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const groupRadioReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (readonly)">
      <kw-option-group
        :model-value="'C'"
        type="radio"
        :options="['A', 'B', 'C']"
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="optiongroup (readonly)">
      <kw-option-group
        :model-value="'C'"
        type="radio"
        :options="['A', 'B', 'C']"
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
        :model-value="'C'"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C']"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item
      label="optiongroup"
      required
    >
      <kw-option-group
        :model-value="'C'"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C']"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const guideHistory = [
  {
    timestamp: '2022-01-09',
    text: 'Add single radio element',
  },
  {
    timestamp: '2022-10-20',
    text: 'delete code about rules in non-essential type ',
  },
  {
    timestamp: '2022-09-21',
    text: 'add guide content of summary about essential type',
  },
  {
    timestamp: '2022-09-06',
    text: 'change guide content about essential type',
  },
];

// const readonlyRadio = ref('A');
// const disableRadio = ref('A');
</script>
