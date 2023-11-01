import { http } from '../../../plugins/http';
import { open } from '../../../utils/popup';
import { alert } from '../../../plugins/dialog';

export default () => {
  const { push } = useRouter();
  const { dispatch } = useStore();
  async function readAlarm(alarm) {
    const { linkUrl, readYn, windowPopupYn } = alarm;

    if (readYn === 'N') {
      await http.put(`/sflex/common/common/alarm/read/${alarm.alarmId}`);
      await dispatch('meta/fetchAlarms');
    }
    if (linkUrl) {
      if (windowPopupYn === 'Y') {
        const rtn = open(linkUrl);
        console.log('useAlarm Test :::: ');
        console.log(rtn);
        console.log(typeof rtn);
        if (rtn === null || typeof rtn === 'undefined') {
          alert('브라우저 보안으로 팝업이 차단되었습니다. 팝업 허용을 해주세요.');
        }
      } else {
        push(linkUrl);
      }
    }
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
