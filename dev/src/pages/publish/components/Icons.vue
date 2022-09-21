<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Icon svg name
    </h2>
    <p class="kw-guide-description">
      when you need icon img  ( ex: icon="iconName" or name="iconName"), Check the below each icon name
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Icon info
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th style="width: 250px;">
              Preview
            </th>
            <th>
              Name/id
            </th>
          </tr>
        </thead>
        <tbody class="color-system">
          <tr>
            <td>
              <kw-icon name="bookmark_on_16" />
            </td>
            <td>
              bookmark_on_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="alert_16" />
            </td>
            <td>
              alert_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="alert_24" />
            </td>
            <td>
              alert_24
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="search_24" />
            </td>
            <td>
              search_24
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="arrow_down_16" />
            </td>
            <td>
              arrow_down_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="print_16" />
            </td>
            <td>
              print_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="calendar" />
            </td>
            <td>
              calendar
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="info_16" />
            </td>
            <td>
              info_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="warning_16" />
            </td>
            <td>
              warning_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="clock_16" />
            </td>
            <td>
              clock_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="excel_download_16" />
            </td>
            <td>
              excel_download_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="excel_upload_16" />
            </td>
            <td>
              excel_upload_16
            </td>
          </tr>
          <tr>
            <td>
              <kw-icon name="plus_16" />
            </td>
            <td>
              plus_16
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </kw-page>
</template>
<script setup>
const guideHistory = [
  {
    timestamp: '2022-09-21',
    text: 'add guide page',
  },
];
</script>
<style scoped lang="scss">
.kw-icon {
  font-size: 16px;
}
</style>
