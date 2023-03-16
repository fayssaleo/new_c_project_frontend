import CustomizedAxios from "../../plugins/axios";

const functionModule = {
  state: {
    functions: [],
  },
  mutations: {
    SET_FUNCTIONS(state, functions) {
      state.functions = functions;
    },
    ADD_FUNCTION(state, FUNCTION) {
      state.functions.push(FUNCTION);
    },
    DELETE_FUNCTION(state, id) {
      state.functions = state.functions.filter((c) => c.id != id);
    },
    EDIT_FUNCTION(state, FUNCTION) {
      state.functions = state.functions.map((c) => {
        if (c.id == FUNCTION.id) return FUNCTION;
        return c;
      });
    },
  },
  actions: {
    setFUNCTIONSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("fonctions/")
          .then((response) => {
            commit("SET_FUNCTIONS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addFUNCTIONAction({ commit }, FUNCTION) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("fonctions/create", {
          name: FUNCTION.name,
          department_id: FUNCTION.department_id,
        })
          .then((response) => {
            commit("ADD_FUNCTION", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteFUNCTIONAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("fonctions/delete", {
          id: id,
        })
          .then((response) => {
            commit("DELETE_FUNCTION", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editFUNCTIONAction({ commit }, FUNCTION) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("fonctions/update", {
          id: FUNCTION.id,
          name: FUNCTION.name,
          department_id: FUNCTION.department_id,
        })
          .then((response) => {
            commit("EDIT_FUNCTION", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getfunctions: (state) => {
      return state.functions;
    },
  },
};
export default functionModule;
