const normalizeState = () => ({
  lnbExpanded: true,

  gnbs: [],
  selectedGnbKey: null,

  lnbs: [],
  selectedLnbKey: null,
});

export default {
  namespaced: true,
  state: normalizeState(),

  mutations: {
    setLnbExpanded(state, value) {
      state.lnbExpanded = value;
    },
    setGnbs(state, gnbs) {
      state.gnbs = gnbs;
    },
    setSelectedGnbKey(state, gnbKey) {
      state.selectedGnbKey = gnbKey;
    },
    setLnbs(state, lnbs) {
      state.lnbs = lnbs;
    },
    setSelectedLnbKey(state, lnbKey) {
      state.selectedLnbKey = lnbKey;
    },
  },

  getters: {
    getLnbExpanded: (state) => state.lnbExpanded,
    getGnbs: (state) => state.gnbs,
    getSelectedGnbKey: (state) => state.selectedGnbKey,
    getLnbs: (state) => state.lnbs,
    getSelectedLnbKey: (state) => state.selectedLnbKey,
  },

  actions: {
    createGnbs({ commit }, apps) {
      const normalizedGnbs = apps.map((v) => ({
        key: v.key || v.applicationId,
        label: v.label || v.applicationName,
      }));

      commit('setGnbs', normalizedGnbs);
    },
    createLnbs({ commit }, menus) {
      const normalizedLnbs = menus.map((v) => ({
        gnbKey: v.gnbKey || v.applicationId,
        key: v.key || v.menuUid,
        parentsKey: v.parentsKey || v.parentsMenuUid,
        label: v.label || v.menuName,
        depth: v.depth || v.menuLevel,
      }));

      commit('setLnbs', normalizedLnbs);
    },
  },
};
