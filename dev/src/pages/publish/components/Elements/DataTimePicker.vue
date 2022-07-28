<template>
  <kw-page class="kw-guide">
    <h2>Data Picker</h2>
    <p class="kw-guide-description">
      Data picker/ Data range picker
    </p>
    <div class="kw-guide-section">
      <h3
        id="defaultDataPicker"
        class="kw-guide-title"
      >
        default(Data picker)
      </h3>
      <p class="kw-guide-description">
        Data picker
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
        <div class="kw-guide-code">
          <HighCode
            :code-value="datePickerCode"
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
        id="defaultDataRange"
        class="kw-guide-title"
      >
        default(Data Range picker)
      </h3>
      <p class="kw-guide-description">
        Data Range picker
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
        <div class="kw-guide-code">
          <HighCode
            :code-value="dateRangePickerCode"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
    <h2>Time Picker</h2>
    <p class="kw-guide-description">
      Time picker/ Time range picker
    </p>
    <div class="kw-guide-section">
      <h3
        id="defaultTimePicker"
        class="kw-guide-title"
      >
        default(Time picker)
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
        <div class="kw-guide-code">
          <HighCode
            :code-value="datePickerCode"
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
`;

</script>
