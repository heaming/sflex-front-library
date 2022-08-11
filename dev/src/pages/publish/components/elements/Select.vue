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
                  name="select"
                  rules="required"
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
                  name="selectMultiple"
                  rules="required"
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
        add attribute <b>readonly</b> in the tag of "kw-select"
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
                  name="selectMultiple"
                  rules="required"
                  readonly
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
                    multiple
                    name="selectMultiple"
                    rules="required"
                    disable
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
        name="select"
        rules="required"
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
        name="select"
        rules="required"
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
        multiple
        name="selectMultiple"
        rules="required"
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
        name="selectMultiple"
        rules="required"
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
        name="selectMultiple"
        rules="required"
        readonly
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
        name="selectMultiple"
        rules="required"
        readonly
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
        name="selectMultiple"
        rules="required"
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
        name="selectMultiple"
        rules="required"
        disable
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
</script>
