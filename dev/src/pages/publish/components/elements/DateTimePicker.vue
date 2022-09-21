<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Date Picker
    </h2>
    <p class="kw-guide-description">
      Date picker/ Date range picker
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
              rules="date_range_required|date_range_months:1"<br>
              from-placeholder="placeholder" | to-placeholder="placeholder"
            </td>
            <td>
              Add the number when it is required date range<br>
              Add the attribute "from-placeholder='시작일 선택'", "to-placeholder='종료일 선택'"
            </td>
          </tr>
          <tr>
            <td>
              kw-date-picker
            </td>
            <td>
              rules="required"<br>
              placeholder="placeholder"
              type="month,year"
            </td>
            <td>
              Add this when Essential Case<br>
              Add the attribute "placeholder='날짜 선택'"<br>
              add the type of month or year
            </td>
          </tr>
          <tr>
            <td>
              kw-time-picker
            </td>
            <td>
              rules="required"<br>
              placeholder="placeholder"
            </td>
            <td>
              Add this when Essential Case<br>
              Add the attribute "placeholder='시간 선택'"
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
        <li><b>Please do not care about placeholder</b></li>
        <li>If there #222 color text in zeplin, please never mind it will be controlled by dev</li>
        <li class="notice">
          Conclude to remove the placeholder attribute in code, because developer will add that.
        </li>
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
                <kw-date-picker />
              </kw-form-item>
              <kw-form-item
                label="DatePicker"
                required
              >
                <kw-date-picker
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="month">
                <kw-date-picker type="month" />
              </kw-form-item>
              <kw-form-item
                label="month"
                required
              >
                <kw-date-picker
                  rules="required"
                  type="month"
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="year">
                <kw-date-picker type="year" />
              </kw-form-item>
              <kw-form-item
                label="year"
                required
              >
                <kw-date-picker
                  rules="required"
                  type="year"
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
                  rules="date_range_months:1"
                />
              </kw-form-item>
              <kw-form-item
                label="DateRangePicker"
                required
              >
                <kw-date-range-picker
                  rules="date_range_required|date_range_months:1"
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
                <kw-time-picker />
              </kw-form-item>
              <kw-form-item
                label="TimePicker"
                required
              >
                <kw-time-picker
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
    <kw-form-item label="DatePicker"><!-- if essential case please add "required" -->
      <kw-date-picker />
      <!-- if essential case please add "rules='required'" -->
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="month">
      <kw-date-picker type="month" />
    </kw-form-item>
    <kw-form-item
      label="month"
      required
    >
      <kw-date-picker
        rules="required"
        type="month"
      />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="year">
      <kw-date-picker type="year" />
    </kw-form-item>
    <kw-form-item
      label="year"
      required
    >
      <kw-date-picker
        rules="required"
        type="year"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="DatePicker"><!-- if essential case please add "required" -->
      <kw-date-picker />
      <!-- if essential case please add "rules='required'" -->
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item label="month">
      <kw-date-picker type="month" />
    </kw-search-item>
    <kw-search-item
      label="month"
      required
    >
      <kw-date-picker
        rules="required"
        type="month"
      />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item label="year">
      <kw-date-picker type="year" />
    </kw-search-item>
    <kw-search-item
      label="year"
      required
    >
      <kw-date-picker
        rules="required"
        type="year"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const dateRangePickerCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="DateRangePicker"> <!-- if essential case please add "required" -->
      <kw-date-range-picker
        rules="date_range_months:1" />
      <!-- if essential case please add 'date_range_required' ex.rules="date_range_required|date_range_months:1"   -->
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="DateRangePicker"> <!-- if essential case please add "required" -->
      <kw-date-range-picker
        rules="date_range_months:1" />
      <!-- if essential case please add 'date_range_required' ex.rules="date_range_required|date_range_months:1"   -->
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
const timePickerCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="TimePicker"><!-- if essential case please add "required" -->
      <kw-time-picker />
      <!-- if essential case please add "rules='required'" -->
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="TimePicker"> <!-- if essential case please add "required" -->
      <kw-time-picker />
      <!-- if essential case please add "rules='required'" -->
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const guideHistory = [
  {
    timestamp: '2022-09-21',
    text: 'Add options of year,month in datepicker',
  },
  {
    timestamp: '2022-09-06',
    text: 'change guide content about essential type',
  },
  {
    timestamp: '2022-09-01',
    text: 'Remove the placeholder attribute',
  },
  {
    timestamp: '2022-08-31',
    text: 'Revised the guide about placeholder',
  },
];
</script>
