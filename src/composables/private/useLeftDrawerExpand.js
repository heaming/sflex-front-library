import store from '../../store';

export default () => {
  const { getters, commit } = useStore();
  const { currentRoute } = useRouter();
  const isLeftExist = computed(() => getters['app/getLeftExist']);
  const isExpanded = computed(() => getters['app/getLeftDrawerExpanded']);

  function setExpanded(state) {
    commit('app/setLeftDrawerExpanded', state);
  }

  function toggleExpanded() {
    setExpanded(!isExpanded.value);
  }

  function deleteLnb() {
    if (currentRoute.value.fullPath === '/' && currentRoute.value.name === 'Home') {
      store.commit('app/setLeftExist', false);
    }
  }

  watch(currentRoute, deleteLnb);

  return {
    isLeftExist,
    isExpanded,
    setExpanded,
    toggleExpanded,
  };
};
