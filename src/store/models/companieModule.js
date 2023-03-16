import CustomizedAxios from "../../plugins/axios";

const companieModule = {
  state: {
    companies: [],
  },
  mutations: {
    SET_companie(state, companies) {
      state.companies = companies;
    },
    ADD_companie(state, companie) {
      state.companies.push(companie);
    },
    DELETE_companie(state, companie) {
      state.companies = state.companies.filter((c) => c.id != companie.id);
    },
    EDIT_companie(state, companie) {
      state.companies = state.companies.map((c) => {
        if (c.id == companie.id) return companie;
        return c;
      });
    },
  },
  actions: {
    setcompaniesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("companie/")
          .then((response) => {
            commit("SET_companie", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setcompaniesEquipmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("companie/index/equipment")
          .then((response) => {
            commit("SET_companie", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setcompaniesAutomobilesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("companie/index/automobile")
          .then((response) => {
            commit("SET_companie", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setcompaniesContainersAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("companie/index/container")
          .then((response) => {
            commit("SET_companie", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setcompaniesVesselsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("companie/index/vessel")
          .then((response) => {
            commit("SET_companie", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setcompaniebyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("companie/" + id)
          .then((response) => {
            commit("SET_companie", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deletecompanieAction({ commit }, companie) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("companie/delete", companie)
          .then((response) => {
            commit("DELETE_companie", companie);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editcompanieAction({ commit }, companie) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("companie/update", companie)
          .then((response) => {
            commit("EDIT_companie", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getcompanies: (state) => {
      return state.companies;
    },
  },
};
export default companieModule;
