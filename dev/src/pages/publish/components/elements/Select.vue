<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Select(40px)
    </h2>
    <p class="kw-guide-description">
      default-height:40px, searchform- 32px;
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
              the Element(tag's name)
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
              label=""
            </td>
            <td>
              Add the title of content
            </td>
          </tr>
          <tr>
            <td>
              kw-select
            </td>
            <td>
              :model-value="[]"<br>
              rules="required"<br>
              :options="['A', 'B', 'C', 'D']"<br>
              readonly<br>
              disable<br>
              multiple <br>
              placeholder="placeholder"<br>
              use-input
            </td>
            <td>
              Required, Default : "[]"<br>
              Add this when Essential Case<br>
              Add the option lists in [ ]<br>
              Add the attribute "readonly" when it's required to be readonly<br>
              Add the attribute "disable" when it's required to be disable<br>
              Add the attribute "multiple" in the tag of kw-select, If it's required to be mutilple select <br>
              Add the attribute "placeholder='text'" with "use-input" when necessary <br>
              (please be aware can't use together with "disable")
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
        <li>Usually, 'label' width is fixed but 'select' have flexible width(depending on column)</li>
        <li>If you have to set the width of select or label, please find the details in 'Collections/Form' page.</li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Select(default)
      </h3>
      <p class="kw-guide-description">
        select default(height:40px)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="Select">
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  placeholder="placeholder"
                  use-input
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="selectDefaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="mutiple"
        class="kw-guide-title"
      >
        Select(Multiple)
      </h3>
      <p class="kw-guide-description">
        add <b> multiple </b> attribute in the tag of "kw-select"
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
                  placeholder="placeholder"
                  use-input
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="selectMultipleDefaultCode"
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
        Add attribute <b>readonly</b> in the tag of "kw-select"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="다중선택 샘플 (readonly)">
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  multiple
                  placeholder="placeholder"
                  readonly
                  use-input
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="selectReadonlyCode"
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
        Add attribute <b>disable</b> in the tag of "kw-select"
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
                    disable
                    use-input
                  />
                </kw-form-item>
              </kw-form-row>
            </kw-form>
          </div>
          <guide-code-view
            :code-value="selectDisableCode"
            lang="vue"
          />
        </div>
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
        - add <b> "essential" </b> of the classes in <b> &lt;kw-form-item&gt; </b>
        when it needs to be essential to input <br>
        - add attribute <b>rules="required"</b> in <b>&lt;kw-select&gt;</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="Essential(multiple)"
                class="essential"
              >
                <kw-select
                  :model-value="[]"
                  :options="['A', 'B', 'C', 'D']"
                  multiple
                  rules="required"
                  placeholder="placeholder"
                  use-input
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

const selectDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Select">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        placeholder="placeholder"
        use-input
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="Select">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        placeholder="placeholder"
        use-input
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const selectMultipleDefaultCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="Select (Multiple)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        placeholder="placeholder"
        multiple
        use-input
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="Select (Multiple)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        placeholder="placeholder"
        use-input
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const selectReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="다중선택 샘플 (readonly)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        placeholder="placeholder"
        readonly
        use-input
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="다중선택 샘플 (readonly)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        readonly
        placeholder="placeholder"
        use-input
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const selectDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="다중선택 샘플 (disable)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="다중선택 샘플 (disable)">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
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
      label="Essential(multiple)"
      class="essential"
    >
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
        multiple
        rules="required"
        placeholder="placeholder"
        use-input
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
</script>
