export default () => {
  const { getters, commit } = useStore();
  const isExpanded = computed(() => getters['app/getLnbExpanded']);

  function setExpanded(state) {
    commit('app/setLnbExpanded', state);
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
