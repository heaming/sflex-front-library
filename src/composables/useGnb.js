export default () => {
  const { getters, commit } = useStore();

  const gnbs = getters['app/getGnbs'];
  const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);

  const isSelected = (gnbKey) => gnbKey === selectedGnbKey.value;

  function updateSelected(gnbKey) {
    commit('app/setSelectedGnbKey', gnbKey);
    commit('app/setSelectedLnbKey', null);
  }

  if (!selectedGnbKey.value) {
    const gnbKey = gnbs[0]?.key || null;
    updateSelected(gnbKey);
  }

  return {
    gnbs,
    selectedGnbKey,
    isSelected,
    updateSelected,
  };
};
