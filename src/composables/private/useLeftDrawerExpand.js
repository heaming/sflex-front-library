export default () => {
  const { getters, commit } = useStore();
  const isExpanded = computed(() => getters['app/getLeftDrawerExpanded']);

  function setExpanded(state) {
    commit('app/setLeftDrawerExpanded', state);
  }

  function toggleExpanded() {
    setExpanded(!isExpanded.value);
  }

  return {
    isExpanded,
    setExpanded,
    toggleExpanded,
  };
};
