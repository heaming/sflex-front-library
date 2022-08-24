const normalizeState = () => ({
  lnbExpanded: true,
  selectedAppKey: null,
  selectedLnbKey: null,
});

export default {
  namespaced: true,
  state: normalizeState(),

  mutations: {
    setLnbExpanded(state, value) {
      state.lnbExpanded = value;
    },
    setSelectedAppKey(state, appKey) {
      state.selectedAppKey = appKey;
    },
    setSeletedLnbKey(state, lnbKey) {
      state.selectedLnbKey = lnbKey;
    },
  },

  getters: {
    getLnbExpanded: (state) => state.lnbExpanded,
    getSelectedAppKey: (state) => state.selectedAppKey,
    getSelectedLnbKey: (state) => state.selectedLnbKey,
  },

  actions: {
    toggleLnb({ state, commit }) {
      commit('setLnbExpanded', !state.lnbExpanded);
    },
  },
};
