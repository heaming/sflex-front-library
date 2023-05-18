import { http } from '../../plugins/http';

export default () => {
  const { push } = useRouter();
  const { dispatch } = useStore();
  async function readAlarm(alarm) {
    const { linkUrl } = alarm.value;
    await http.put(`/sflex/common/common/alarm/read/${alarm.value.alarmId}`);
    await dispatch('meta/fetchAlarms');
    if (linkUrl) push(linkUrl);
  }

  return {
    readAlarm,
  };
};
