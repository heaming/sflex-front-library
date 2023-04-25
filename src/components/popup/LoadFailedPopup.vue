<template>
  <slot />
</template>

<script>
import { alert } from '../../plugins/dialog';
import useModal from '../../composables/useModal';

export default {
  name: 'LoadFailedPopup',
  setup() {
    const { cancel } = useModal();
    const { t } = useI18n();
    async function doAlert() {
      await alert(t('MSG_ALT_POPUP_ERROR_MAIN'), { subMessage: t('MSG_ALT_POPUP_ERROR_SUB'), icon: 'warning_24' });

      cancel();
    }

    doAlert();
    return {
    };
  },
};
</script>
