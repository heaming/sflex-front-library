import { popups, modal } from '../../plugins/modal';
import { registerCloseEvent, ok, cancel } from '../../utils/popup';
import pascalCase from '../../utils/private/pascalCase';

const searchParams = new URLSearchParams(window.location.search);
const isRedirect = searchParams.has('redirect');

export default () => {
  const { currentRoute } = useRouter();
  const { path, query } = currentRoute.value;

  const name = `${pascalCase(path)}P`;
  const matched = popups[name] !== undefined;

  async function invokeModal() {
    const { result, payload } = await modal({
      component: name,
      componentProps: { ...query },
      dialogProps: {
        class: 'global-modal--window',
        transitionDuration: 0,
        maximized: true,
      },
    });

    (result ? ok : cancel)(payload);
  }

  onMounted(() => {
    if (matched) {
      invokeModal();
    }
  });

  if (isRedirect === false) {
    registerCloseEvent();
  }

  return {
    useRouterView: !matched,
  };
};
