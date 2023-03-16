const loadingModule = {
  state: {
    moduleShow: false,
  },
  mutations: {
    SET_TO_TRUE(state) {
      state.moduleShow = true;
    },
    SET_TO_False(state) {
      state.moduleShow = false;
    },
  },
  actions: {
    setModuleShowToTrueAction({ commit }) {
      commit("SET_TO_TRUE");
    },
    setModuleShowToFalseAction({ commit }) {
      commit("SET_TO_False");
    },
  },
  getters: {
    getModuleShow: (state) => {
      return state.moduleShow;
    },
  },
};
export default loadingModule;
