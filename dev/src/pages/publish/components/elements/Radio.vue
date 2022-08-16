<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Radio
    </h2>
    <p class="kw-guide-description">
      In search form and table, radio is 18px / default is 22px
    </p>
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
              Attribute(Class)
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
              label=" "
            </td>
            <td>
              Add the title of content
            </td>
          </tr>
          <tr>
            <td>
              kw-option-group
            </td>
            <td>
              name="radioOptionGroup"<br>
              rules="required"<br>
              type="radio"<br>
              :options="['A', 'B', 'C', 'D']"<br>
              disable<br>
              :model-value="[]"
            </td>
            <td>
              Required, Default : "radioOptionGroup"<br>
              Required, Default : "required"<br>
              Required, Default : "radio"<br>
              Add the option lists in [ ]<br>
              Add the attribue "disable" when it is required to be readonly or disable<br>
              Required, Default : "[]"
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="defaultOptionGroup"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        Default
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
        <guide-code-view
          :code-value="groupRadioReadonlyCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>

const groupRadioDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="optiongroup (default)">
      <kw-option-group
        :model-value="[]"
        name="radioOptionGroup"
        rules="required"
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
        :model-value="[]"
        name="radioOptionGroup"
        rules="required"
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

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="optiongroup (disable)">
      <kw-option-group
        :model-value="[]"
        name="radioOptionGroup"
        rules="required"
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

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="optiongroup (readonly)">
      <kw-option-group
        :model-value="[]"
        name="radioOptionGroup"
        rules="required"
        type="radio"
        :options="['A', 'B', 'C']"
        disable
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

// const readonlyRadio = ref('A');
// const disableRadio = ref('A');
</script>
