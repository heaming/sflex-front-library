export default () => {
  const { getters, commit } = useStore();

  const apps = readonly(getters['app/getGlobalApps']);
  const selectedKey = computed(() => getters['app/getSelectedGlobalAppKey']);

  const isSelected = (appKey) => appKey === selectedKey.value;

  function updateSelected(appKey) {
    commit('app/setSelectedGlobalAppKey', appKey);
    commit('app/setSelectedGlobalMenuKey', null);
  }

  if (!selectedKey.value) {
    const appKey = apps[0]?.key || null;
    updateSelected(appKey);
  }

  return {
    apps,
    isSelected,
    updateSelected,
  };
};
