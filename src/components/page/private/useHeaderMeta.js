export const useHeaderMetaProps = {
  title: {
    type: String,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const { currentRoute } = useRouter();
  const meta = { ...currentRoute.value.meta };
  const title = computed(() => props.title || meta.menuName);

  return {
    pageTitle: title,
    pageUseIsSub: meta.pageUseCode === 'S',
  };
};
