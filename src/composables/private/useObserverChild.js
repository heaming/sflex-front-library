import { ObserverContextKey } from '../../consts/private/symbols';

export const useObserverChildProps = {
  name: {
    type: String,
    default: null,
  },
  ignoreOnModified: {
    type: Boolean,
    default: false,
  },
  ignoreOnReset: {
    type: Boolean,
    default: false,
  },
};

export default (ctx) => {
  const { props, uid } = getCurrentInstance();

  const name = toRef(props, 'name');
  const ignoreOnModified = toRef(props, 'ignoreOnModified');
  const ignoreOnReset = toRef(props, 'ignoreOnReset');

  const {
    register: registerObserverChild,
    unregister: unregisterObserverChild,
  } = inject(ObserverContextKey, {});

  const observerChildctx = {
    uid,
    name,
    ignoreOnModified,
    ignoreOnReset,
    ctx,
  };

  registerObserverChild?.(observerChildctx);

  onBeforeUnmount(() => {
    unregisterObserverChild?.(observerChildctx);
  });
};
