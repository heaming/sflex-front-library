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
      <h4 class="my10">
        16px <span class="ml10 kw-fc--black3">{{ iconList1.length }} 개</span>
      </h4>
      <ul
        class="temp_icons"
      >
        <li
          v-for="icon in iconList1"
          :key="`${icon.index}`"
          class="temp_icons__item"
        >
          <p class="temp_icons__name">
            {{ icon }}
          </p>
          <p class="temp_icons__icon">
            <kw-icon :name="icon" />
          </p>
        </li>
      </ul>
      <kw-separator />
      <h4 class="mb10">
        24px <span class="ml10 kw-fc--black3">{{ iconList2.length }} 개</span>
      </h4>
      <ul
        class="temp_icons"
      >
        <li
          v-for="icon in iconList2"
          :key="`${icon.index}`"
          class="temp_icons__item"
        >
          <p class="temp_icons__name">
            {{ icon }}
          </p>
          <p class="temp_icons__icon  temp_icons__icon--24px">
            <kw-icon :name="icon" />
          </p>
        </li>
      </ul>
      <kw-separator />
      <h4 class="mb10">
        Tablet visual img icons <span class="ml10 kw-fc--black3">{{ visuals.length }} 개</span>
      </h4>
      <ul
        class="temp_icons"
      >
        <li
          v-for="visual in visuals"
          :key="`${visual.index}`"
          class="temp_icons__item"
        >
          <p class="temp_icons__name">
            {{ visual }}
          </p>
          <p class="temp_icons__icon ">
            <kw-icon
              :name="visual"
              style="font-size: 36px;"
            />
          </p>
        </li>
      </ul>
    </div>
  </kw-page>
</template>
<script setup>

const iconList1 = [
  'alert_on',
  'alert_outline',
  'arrow_down',
  'arrow_left',
  'arrow_next',
  'arrow_prev',
  'arrow_right',
  'arrow_stepper',
  'arrow_up',
  'bookmark_off',
  'bookmark_on',
  'bookmark_outline',
  'calendar',
  'camera',
  'checked',
  'checked_stepper',
  'clear',
  'clock',
  'close',
  'delete',
  'detail',
  'download_on',
  'download_off',
  'excel',
  'file',
  'filter',
  'group',
  'group_minus',
  'group_plus',
  'info',
  'imgpreview',
  'list',
  'minus',
  'more',
  'new_window',
  'notice_off',
  'notice_on',
  'pdf',
  'plus',
  'price',
  'print',
  'report',
  'report_on',
  'retry',
  'save',
  'search',
  'sorti',
  'sorting_down',
  'sorting_up',
  'upload_on',
  'upload_off',
  'warning',
  'write',
  'up',
  'down',
  'top',
  'bottom',
  'up_to',
  'down_to',
  'cellphone_reject',
  'cellphone',
  'cellphone_off',
  'holding',
  'break',
  'release',
  'pause',
  'sms',
  'redo',
  'qrcode',
  'viewer',
];
const iconList2 = [
  'add_list_24',
  'alert_off_24',
  'alert_on_24',
  'arrow_down_24',
  'arrow_left_24',
  'arrow_left_breadcrumbs_24',
  'arrow_next_24',
  'arrow_prev_24',
  'arrow_right_24',
  'arrow_up_24',
  'barcode_24',
  'calendar_24',
  'call_24',
  'certi_24',
  'check_24',
  'checked_24',
  'close_24',
  'download_24',
  'gnb_menu',
  'filter_24',
  'id_24',
  'imgpreview_24',
  'info_24',
  'menu_24',
  'minus_24',
  'more_24',
  'notice_24',
  'pdf_24',
  'plus_24',
  'preview_24',
  'preview_img_24',
  'price_24',
  'price_cycle_24',
  'profile_none',
  'pw_24',
  'search_24',
  'search_doc_24',
  'setting_24',
  'sms_24',
  'tool_24',
  'user_24',
  'warning_24',
  'write_24',
  'qrcode_24',
  'support_24',
];

const visuals = [
  'visual_check',
  'visual_info',
  'visual_search',
  'visual_campus',
  'visual_edit',
  'visual_online',
  'visual_payment',
  'visual_partner',
];
const guideHistory = [
  {
    timestamp: '2023-04-25',
    text: 'add viewer icon for file component',
  },
  {
    timestamp: '2022-10-14',
    text: 'add minus 16px and change name(plus/minus_box -> group_minus/plus)',
  },
  {
    timestamp: '2022-09-21',
    text: 'add guide page',
  },
];
</script>
<style scoped lang="scss">
// .kw-icon {
//   font-size: 16px;
// }
.temp_icons {
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  &__item {
    padding: 5px;
    background-color: $bg-white;
    border: 1px solid $line-stroke;
    text-align: center;
  }

  &__name {
    padding-bottom: 10px;
    border-bottom: 1px solid $line-stroke;
  }

  &__icon {
    padding: 10px 0;
    font-size: 16px;

    &--24px {
      font-size: 24px;
    }
  }
}
</style>
