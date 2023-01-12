<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Search Form
    </h2>
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
              Tag
            </th>
            <th>
              Class(attribue)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-search <br>
              kw-search-item
            </td>
            <td class="kw-fc--error text-bold">
              :cols="0"  <br>
              no-label
            </td>
            <td>
              automatically added <br>
              automatically added
            </td>
          </tr>
          <tr>
            <td>
              each form component
            </td>
            <td>
              label="" <br>
              required
            </td>
            <td>
              add label text<br>
              add essential type
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        Same structure with pc, but <em>please put label text in each form component</em>
      </p>
      <q-card>
        <kw-search :cols="0">
          <kw-search-row>
            <kw-search-item no-label>
              <kw-field-wrap
                required
                label="조회"
              >
                <kw-input
                  grow
                />
                <kw-btn
                  label="입력"
                  class="ml8"
                />
              </kw-field-wrap>
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item no-label>
              <kw-btn-toggle
                v-model="strModel2"
                :options="['남성','여성']"
                gap="0px"
                dense="false"
                grow
              />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item no-label>
              <kw-input
                label="label"
                required
              />
            </kw-search-item>
            <kw-search-item no-label>
              <kw-select
                label="label"
                :options="['label','b']"
              />
            </kw-search-item>
            <kw-search-item no-label>
              <kw-select
                label="label"
                :options="['label','b']"
              />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item no-label>
              <kw-date-picker
                label="label"
              />
            </kw-search-item>
            <kw-search-item no-label>
              <kw-time-picker
                label="label"
              />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item no-label>
              <kw-date-range-picker label="label" />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <guide-code-view
          :code-value="searchCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const strModel2 = ref('남성');
const searchCode = `
<kw-search>
  <kw-search-row>
    <kw-search-item>
      <kw-field-wrap
        required
        label="조회"
      >
        <kw-input
          grow
        />
        <kw-btn
          label="입력"
          class="ml8"
        />
      </kw-field-wrap>
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item>
      <kw-btn-toggle
        v-model="strModel2"
        :options="['남성','여성']"
        gap="0px"
        dense="false"
        grow
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item>
      <kw-input
        label="label"
        required
      />
    </kw-search-item>
    <kw-search-item>
      <kw-select
        label="label"
        :options="['label','b']"
      />
    </kw-search-item>
    <kw-search-item>
      <kw-select
        label="label"
        :options="['label','b']"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item>
      <kw-date-picker
        label="label"
      />
    </kw-search-item>
    <kw-search-item>
      <kw-time-picker
        label="label"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item>
      <kw-date-range-picker label="label" />
    </kw-search-item>
  </kw-search-row>
  </kw-search>
`;

</script>
