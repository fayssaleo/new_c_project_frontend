import CustomizedAxios from "../../plugins/axios";

const departementModule = {
  state: {
    departements: [],
  },
  mutations: {
    SET_DEPARTEMENTS(state, departements) {
      state.departements = departements;
    },
    ADD_DEPARTEMENT(state, departement) {
      state.departements.push(departement);
    },
    DELETE_DEPARTEMENT(state, id) {
      state.departements = state.departements.filter((c) => c.id != id);
    },
    EDIT_DEPARTEMENT(state, departements) {
      state.departements = state.departements.map((c) => {
        if (c.id == departements.id) return departements;
        return c;
      });
    },
  },
  actions: {
    setDepartementsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("departments/")
          .then((response) => {
            commit("SET_DEPARTEMENTS", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDepartementAction({ commit }, departement) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departments/create", {
          name: departement.name,
        })
          .then((response) => {
            commit("ADD_DEPARTEMENT", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDepartementAction({ commit }, departement) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departments/delete", {
          id: departement.id,
        })
          .then((response) => {
            commit("DELETE_DEPARTEMENT", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDepartementAction({ commit }, departement) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departments/update", {
          name: departement.name,
        })
          .then((response) => {
            commit("EDIT_DEPARTEMENT", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdepartements: (state) => {
      return state.departements;
    },
  },
};
export default departementModule;
