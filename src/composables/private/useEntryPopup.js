import { popups, modal } from '../../plugins/modal';
import { registerCloseEvent, ok, cancel } from '../../utils/popup';
import pascalCase from '../../utils/private/pascalCase';

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
      },
    });

    (result ? ok : cancel)(payload);
  }

  onMounted(() => {
    if (matched) {
      invokeModal();
    }
  });

  registerCloseEvent();

  return {
    useRouterView: !matched,
  };
};
