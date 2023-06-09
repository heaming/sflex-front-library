import { Fragment, Suspense } from 'vue';
import { GlobalBottomSheet } from './components/globalBottomSheet';
import { GlobalDialog } from './components/globalDialog';
import { GlobalLoading } from './components/globalLoading';
import { GlobalModal } from './components/globalModal';
import { GlobalNotify } from './components/globalNotify';

export default (App) => defineComponent({
  setup() {
    return () => h(Fragment, null, [
      h(GlobalBottomSheet),
      h(GlobalDialog),
      h(GlobalLoading),
      h(GlobalModal),
      h(GlobalNotify),
      h(Suspense, null, {
        default: () => h(App),
      }),
    ]);
  },
});
