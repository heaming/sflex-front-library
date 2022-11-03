export default () => {
  const { getters, commit } = useStore();

  const gnbMenus = readonly(getters['app/getGnbItems']);
  const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);

  const isSelected = (gnbKey) => gnbKey === selectedGnbKey.value;

  function updateSelected(gnbKey) {
    commit('app/setSelectedGnbKey', gnbKey);
    commit('app/setSelectedLnbKey', null);
  }

  if (!selectedGnbKey.value) {
    const gnbKey = gnbMenus[0]?.key || null;
    updateSelected(gnbKey);
  }

  return {
    gnbMenus,
    selectedGnbKey,
    isSelected,
    updateSelected,
  };
};
