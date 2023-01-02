import { last } from 'lodash-es';

export const useBreadcrumbNavigationProps = {
  options: {
    type: Array,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();

  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const { getters } = useStore();

  const meta = { ...currentRoute.value.meta };

  const navigations = computed(() => {
    if (Array.isArray(props.options)) {
      return props.options.map((value) => ({
        value: value?.key || value,
        label: value?.label || value,
      }));
    }

    const {
      applicationId,
      applicationName,
      menuUid,
    } = meta;

    if (applicationId && menuUid) {
      return [
        { key: 'HOME', label: t('MSG_TXT_HOME', null, '홈') },
        { key: applicationId, label: applicationName },
        ...getters['meta/getMenuPath'](menuUid),
      ];
    }

    return [];
  });

  const title = computed(() => last(navigations.value)?.label);

  return {
    navigations,
    title,
  };
};
