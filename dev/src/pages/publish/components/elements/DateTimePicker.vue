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
      Time picker/ Time range picker
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
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="DatePicker">
      <kw-date-picker
        name="datePicker"
        rules="required"
      />
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
        rules="date_range_required|date_range_months:1"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="DateRangePicker">
      <kw-date-range-picker
        name="dateRangePicker"
        rules="date_range_required|date_range_months:1"
      />
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
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="TimePicker">
      <kw-time-picker
        name="timePicker"
        rules="required"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

</script>
