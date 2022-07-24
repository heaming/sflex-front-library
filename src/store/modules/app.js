const normalizeState = () => ({
  lnbExpanded: true,
  selectedAppId: null,
  selectedMenuId: null,
});

export default {
  namespaced: true,
  state: normalizeState(),

  mutations: {
    setLnbExpanded(state, value) {
      state.lnbExpanded = value;
    },
    setSelectedAppId(state, applicationId) {
      state.selectedAppId = applicationId;
    },
    setSelectedMenuId(state, menuUid) {
      state.selectedMenuId = menuUid;
    },
  },

  getters: {
    getLnbExpanded: (state) => state.lnbExpanded,
    getSelectedAppId: (state) => state.selectedAppId,
  },

  actions: {
    toggleLnb({ state, commit }) {
      commit('setLnbExpanded', !state.lnbExpanded);
    },
    selectApp({ commit }, { applicationId }) {
      commit('setSelectedAppId', applicationId);
    },
    selectMenu({ commit }, { menuUid }) {
      commit('setSelectedMenuId', menuUid);
    },
  },
};
