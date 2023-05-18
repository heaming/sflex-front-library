<template>
  <kw-popup title="알림">
    <div class="px20">
      <kw-list
        v-if="alarms.length > 0"
        :items="alarms"
        separator
        item-padding
        clickable
        item-key="alarmId"
        @click-item="readAlarm"
      >
        <template #item="{ item }">
          <kw-item-section>
            <kw-item-label class="row items-center">
              <kw-icon :name="item.readYn === 'N' ? 'alert_on' : 'alert_outline' " />
              <p class="kw-fc--black3 kw-font-pt14 ml4">
                {{ dayjs(item.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD hh:mm A') }}
              </p>
            </kw-item-label>
            <kw-item-label
              lines="2"
              class="kw-font-body mt8"
            >
              {{ item.alarmMsg }}
            </kw-item-label>
          </kw-item-section>
        </template>
      </kw-list>
      <div v-else>
        알림이 없습니다.
      </div>
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
