import { http } from '../../../plugins/http';

export default () => {
  const { push } = useRouter();
  const { dispatch } = useStore();
  async function readAlarm(alarm) {
    const { linkUrl, readYn } = alarm.value;

    if (readYn === 'N') {
      await http.put(`/sflex/common/common/alarm/read/${alarm.value.alarmId}`);
      await dispatch('meta/fetchAlarms');
    }
    if (linkUrl) push(linkUrl);
  }

  async function readAllAlarm(alarmIds) {
    await http.put('/sflex/common/common/alarm/read/all', alarmIds);
    await dispatch('meta/fetchAlarms');
  }

  return {
    readAlarm,
    readAllAlarm,
  };
};
