import { camelCase, toUpper } from 'lodash-es';
import { popups, modal } from '../../plugins/modal';
import { registerCloseEvent, ok, cancel } from '../../utils/popup';

const pascalCase = (s) => camelCase(s).replace(/^(.)/, toUpper);

export default () => {
  const { currentRoute } = useRouter();
  const { path, query } = currentRoute.value;

  const name = `${pascalCase(path)}P`;
  const matched = popups[name] !== undefined;

  onMounted(async () => {
    if (matched) {
      const { result, payload } = await modal({
        component: name,
        componentProps: { ...query },
        dialogProps: { transitionDuration: 0 },
      });

      if (result) {
        ok(payload);
      } else {
        cancel(payload);
      }
    }
  });

  registerCloseEvent();

  return {
    useRouterView: !matched,
  };
};
