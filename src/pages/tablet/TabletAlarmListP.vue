<template>
  <kw-popup
    title="알림"
    size="full"
  >
    <kw-list
      v-if="alarms.length > 0"
      class="kw-alarm-list__tablet"
      :items="alarms"
      separator
      item-padding
      clickable
      item-key="alarmId"
      @click-item="readAlarm"
    >
      <template #item="{ item }">
        <kw-item-section
          top
          side
        >
          <kw-icon
            :name="item.readYn === 'N' ? 'alert_on_24' : 'alert_off_24' "
            size="24px"
          />
        </kw-item-section>
        <kw-item-section>
          <kw-item-label>
            <p class="kw-font-dense">
              {{ dayjs(item.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD hh:mm A') }}
            </p>
          </kw-item-label>
          <kw-item-label
            lines="1"
            class="kw-font-body mt8 alarm-msg"
            :class="
              { 'text-underline': item.linkUrl,
                'text-primary': item.linkUrl && item.readYn === 'N',
                'text-disabled': item.readYn === 'Y' }"
          >
            {{ item.alarmMsg }}
          </kw-item-label>
        </kw-item-section>
      </template>
    </kw-list>
    <div v-else>
      알림이 없습니다.
    </div>
  </kw-popup>
</template>

<script setup>
import dayjs from 'dayjs';
import useAlarm from '../../composables/private/useAlarm';

const { getters } = useStore();
const alarms = computed(() => getters['meta/getAlarms']);
const { readAlarm } = useAlarm();
</script>

<style scoped lang="scss">
::v-deep(.kw-list) {
  .kw-item-type--padding:first-of-type {
    padding-top: 0;
  }
}

.kw-item__section.q-item__section--side {
  padding-right: 8px !important;
}

</style>
