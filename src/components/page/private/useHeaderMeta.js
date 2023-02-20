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
  const isSubPage = computed(() => meta.pageUseCode === 'S');
  return {
    pageTitle: title,
    pageUseIsSub: isSubPage,
    noMenuPage: meta.noMenuPage,
  };
};
