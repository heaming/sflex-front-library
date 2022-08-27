const normalizeState = () => ({
  lnbExpanded: true,

  gnbItems: [],
  selectedGnbKey: null,

  lnbItems: [],
  selectedLnbKey: null,
});

export default {
  namespaced: true,
  state: normalizeState(),

  mutations: {
    setLnbExpanded(state, value) {
      state.lnbExpanded = value;
    },
    setGnbItems(state, gnbItems) {
      state.gnbItems = gnbItems;
    },
    setSelectedGnbKey(state, gnbKey) {
      state.selectedGnbKey = gnbKey;
    },
    setLnbItems(state, lnbItems) {
      state.lnbItems = lnbItems;
    },
    setSelectedLnbKey(state, lnbKey) {
      state.selectedLnbKey = lnbKey;
    },
  },

  getters: {
    getLnbExpanded: (state) => state.lnbExpanded,
    getGnbItems: (state) => state.gnbItems,
    getSelectedGnbKey: (state) => state.selectedGnbKey,
    getLnbItems: (state) => state.lnbItems,
    getSelectedLnbKey: (state) => state.selectedLnbKey,
  },

  actions: {
    createGnbItems({ commit }, apps) {
      const normalizedGnbItems = apps.map((v) => ({
        key: v.key || v.applicationId,
        label: v.label || v.applicationName,
      }));

      commit('setGnbItems', normalizedGnbItems);
    },
    createLnbItems({ commit }, menus) {
      const normalizedLnbItems = menus.map((v) => ({
        gnbKey: v.gnbKey || v.applicationId,
        key: v.key || v.menuUid,
        parentsKey: v.parentsKey || v.parentsMenuUid,
        label: v.label || v.menuName,
        depth: v.depth || v.menuLevel,
      }));

      commit('setLnbItems', normalizedLnbItems);
    },
  },
};
