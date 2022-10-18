export default () => {
  const { getters, commit } = useStore();
  const isExpanded = computed(() => getters['app/getLnbExpanded']);

  function toggleExapnded(value) {
    commit('app/setLnbExpanded', value ?? !isExpanded.value);
  }

  return {
    isExpanded,
    toggleExapnded,
  };
};
