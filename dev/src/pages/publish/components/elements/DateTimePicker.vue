<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Date Picker
    </h2>
    <p class="kw-guide-description">
      Date picker/ Date range picker
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
              kw-form-item / kw-search-item
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
              kw-date-range-picker
            </td>
            <td>
              name="dateRangePicker"<br>
              rules="date_range_required|date_range_months:1"<br>
              from-placeholder="placeholder" | to-placeholder="placeholder"
            </td>
            <td>
              Required, Default : "dateRangePicker" <br>
              Add the number when it is required date range<br>
              Add the attribute "from-placeholder='text'", "to-placeholder='text'" in need
            </td>
          </tr>
          <tr>
            <td>
              kw-date-picker
            </td>
            <td>
              name="datePicker"<br>
              rules="required"<br>
              placeholder="placeholder"
            </td>
            <td>
              Required, Default : "datePicker"<br>
              Add this when Essential Case<br>
              Add the attribute "placeholder='text'" in need
            </td>
          </tr>
          <tr>
            <td>
              kw-time-picker
            </td>
            <td>
              name="timePicker"<br>
              rules="required"<br>
              placeholder="placeholder"
            </td>
            <td>
              Required, Default : "timePicker" <br>
              Add this when Essential Case<br>
              Add the attribute "placeholder='text'" in need
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
        id="defaultDatePicker"
        class="kw-guide-title"
      >
        default(Date picker)
      </h3>
      <p class="kw-guide-description">
        Date picker
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="DatePicker">
                <kw-date-picker
                  name="datePicker"
                  placeholder="placeholder"
                />
              </kw-form-item>
              <kw-form-item
                label="DatePicker"
                class="essential"
              >
                <kw-date-picker
                  name="datePicker"
                  placeholder="placeholder"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="datePickerCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="defaultDateRange"
        class="kw-guide-title"
      >
        Default(Date Range picker)
      </h3>
      <p class="kw-guide-description">
        Date Range picker
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="DateRangePicker">
                <kw-date-range-picker
                  name="dateRangePicker"
                  rules="date_range_months:1"
                  from-placeholder="시작일선택"
                  to-placeholder="종료일선택"
                />
              </kw-form-item>
              <kw-form-item
                label="DateRangePicker"
                class="essential"
              >
                <kw-date-range-picker
                  name="dateRangePicker"
                  rules="date_range_required|date_range_months:1"
                  from-placeholder="시작일선택"
                  to-placeholder="종료일선택"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="dateRangePickerCode"
          lang="vue"
        />
      </q-card>
    </div>
    <h2 class="kw-guide-h2 kw-mt-5">
      Time Picker
    </h2>
    <p class="kw-guide-description">
      Time picker
    </p>
    <div class="kw-guide-section">
      <h3
        id="defaultTimePicker"
        class="kw-guide-title"
      >
        Default(Time picker)
      </h3>
      <p class="kw-guide-description">
        Time picker
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="TimePicker">
                <kw-time-picker
                  name="timePicker"
                  placeholder="시간선택"
                />
              </kw-form-item>
              <kw-form-item
                label="TimePicker"
                class="essential"
              >
                <kw-time-picker
                  name="timePicker"
                  placeholder="시간선택"
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="timePickerCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>

const datePickerCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="DatePicker">
      <kw-date-picker
        name="datePicker"
        placeholder="placeholder"
      />
      <!-- if essential case please add "rules='required'" -->
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="DatePicker">
      <kw-date-picker
        name="datePicker"
        placeholder="placeholder"
      />
      <!-- if essential case please add "rules='required'" -->
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const dateRangePickerCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="DateRangePicker">
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_months:1"
        from-placeholder="시작일선택"
        to-placeholder="종료일선택"
      />
      <!-- if essential case please add 'date_range_required' ex.rules="date_range_required|date_range_months:1"   -->
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="DateRangePicker">
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_months:1"
        from-placeholder="시작일선택"
        to-placeholder="종료일선택"
      />
      <!-- if essential case please add 'date_range_required' ex.rules="date_range_required|date_range_months:1"   -->
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
const timePickerCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="TimePicker">
      <kw-time-picker
        name="timePicker"
        placeholder="placeholder"
      />
      <!-- if essential case please add "rules='required'" -->
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="TimePicker">
      <kw-time-picker
        name="timePicker"
        placeholder="placeholder"
      />
      <!-- if essential case please add "rules='required'" -->
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

</script>
