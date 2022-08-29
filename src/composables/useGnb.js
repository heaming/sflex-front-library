export default () => {
  const { getters, commit } = useStore();

  const gnbItems = getters['app/getGnbItems'];
  const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);

  const isSelected = (gnbKey) => gnbKey === selectedGnbKey.value;

  function updateSelected(gnbKey) {
    commit('app/setSelectedGnbKey', gnbKey);
    commit('app/setSelectedLnbKey', null);
  }

  if (!selectedGnbKey.value) {
    const gnbKey = gnbItems[0]?.key || null;
    updateSelected(gnbKey);
  }

  return {
    gnbItems,
    selectedGnbKey,
    isSelected,
    updateSelected,
  };
};
