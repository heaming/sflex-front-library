import { open } from '../../../utils/popup';
import consts from '../../../consts';

export default () => {
  const { currentRoute } = useRouter();
  const { path } = currentRoute.value;

  function openNewWindow() {
    open(`${consts.ENTRY_POPUP_PATHNAME}#${path}`);
  }

  return {
    openNewWindow,
  };
};
