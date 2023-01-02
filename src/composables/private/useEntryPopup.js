import { popups, modal } from '../../plugins/modal';
import { registerCloseEvent, ok, cancel } from '../../utils/popup';
import pascalCase from '../../utils/private/pascalCase';

export default () => {
  const { currentRoute } = useRouter();
  const { path, query } = currentRoute.value;

  const name = `${pascalCase(path)}P`;
  const matched = popups[name] !== undefined;

  const { getters, dispatch } = useStore();

  async function isExternallyAccessible() {
    await dispatch('meta/fetchPage', name);
    return getters['meta/getPage'](name)?.pageExtAccYn === 'Y';
  }

  async function invokeModal() {
    if (!await isExternallyAccessible()) {
      cancel();
      return;
    }

    const { result, payload } = await modal({
      component: name,
      componentProps: { ...query },
      dialogProps: {
        class: 'global-modal--window',
        transitionDuration: 0,
      },
    });

    if (result) {
      ok(payload);
    } else {
      cancel(payload);
    }
  }

  onMounted(async () => {
    if (matched) {
      invokeModal();
    }
  });

  registerCloseEvent();

  return {
    useRouterView: !matched,
  };
};
