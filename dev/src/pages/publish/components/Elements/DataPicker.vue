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
          <code>
            &lt;kw-field
            name="radio"<br>
            rules="required"<br>
            &gt;
            &lt;template #default="{ field }"&gt;<br>
            &lt;kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"<br>
            :key="i"
            v-bind="field"<br>
            :val="item"
            /&gt;<br>
            &lt;/template&gt;<br>
            &lt;/kw-field&gt;<br>
          </code>
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
          <code>
            &lt;kw-field
            name="radio"<br>
            rules="required"<br>
            &gt;
            &lt;template #default="{ field }"&gt;<br>
            &lt;kw-radio
            v-for="(item, i) of ['A', 'B', 'C', 'D']"<br>
            :key="i"
            v-bind="field"<br>
            :val="item"
            /&gt;<br>
            &lt;/template&gt;<br>
            &lt;/kw-field&gt;<br>
          </code>
        </div>
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>
</script>
