import { Fragment, Suspense } from 'vue';
import { GlobalModal } from './components/globalModal';
import { GlobalDialog } from './components/globalDialog';
import { GlobalLoading } from './components/globalLoading';

export default (App) => defineComponent({
  setup() {
    return () => h(Fragment, null, [
      h(GlobalModal),
      h(GlobalDialog),
      h(GlobalLoading),
      h(Suspense, null, {
        default: () => h(App),
        fallback: () => 'Loading...',
      }),
    ]);
  },
});
