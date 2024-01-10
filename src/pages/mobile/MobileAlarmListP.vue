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
        @click-item="(alarm) => readAlarm(alarm.value)"
      >
        <template #item="{ item }">
          <kw-item-section>
            <kw-item-label class="row items-center">
              <kw-icon
                :name="item.readYn === 'N' ? 'alert_on' : 'alert_outline' "
                :class="item.readYn === 'Y' ? 'text-disabled' : ''"
              />
              <p class="kw-fc--black3 kw-font-pt14 ml4">
                {{ dayjs(item.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD hh:mm A') }}
              </p>
            </kw-item-label>
            <kw-item-label
              lines="2"
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
      <div
        v-else
        class="mobile-content-center"
      >
        <p
          class="kw-fc--black3"
        >
          알림 메세지가 없습니다.
        </p>
      </div>
    </div>
  </kw-popup>
</template>

<script setup>
import dayjs from 'dayjs';
import useAlarm from '../../components/page/private/useAlarm';

const { getters } = useStore();
const alarms = computed(() => getters['meta/getAlarms']);
const { readAlarm } = useAlarm();

</script>
<style scoped lang="scss">
.mobile-content-center {
  min-height: calc(100vh - 85px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
