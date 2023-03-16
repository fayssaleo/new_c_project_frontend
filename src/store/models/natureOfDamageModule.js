import CustomizedAxios from "../../plugins/axios";

const natureOfDamageModule = {
  state: {
    natureOfDamages: [],
  },
  mutations: {
    SET_natureOfDamage(state, natureOfDamages) {
      state.natureOfDamages = natureOfDamages;
    },
    ADD_natureOfDamage(state, natureOfDamage) {
      state.natureOfDamages.push(natureOfDamage);
    },
    DELETE_natureOfDamage(state, natureOfDamage) {
      state.natureOfDamages = state.natureOfDamages.filter(
        (c) => c.id != natureOfDamage.id
      );
    },
    EDIT_natureOfDamage(state, natureOfDamage) {
      state.natureOfDamages = state.natureOfDamages.map((c) => {
        if (c.id == natureOfDamage.id) return natureOfDamage;
        return c;
      });
    },
  },
  actions: {
    setnatureOfDamagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("NatureOfDamage/")
          .then((response) => {
            commit("SET_natureOfDamage", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setnatureOfDamagesByEquipmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("NatureOfDamage/index/equipment")
          .then((response) => {
            commit("SET_natureOfDamage", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setnatureOfDamagesByAutomobilesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("NatureOfDamage/index/automobile")
          .then((response) => {
            commit("SET_natureOfDamage", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setnatureOfDamagesByVesselsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("NatureOfDamage/index/vessel")
          .then((response) => {
            commit("SET_natureOfDamage", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setnatureOfDamagesByContainersAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("NatureOfDamage/index/container")
          .then((response) => {
            commit("SET_natureOfDamage", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setnatureOfDamagebyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("NatureOfDamage/" + id)
          .then((response) => {
            commit("SET_natureOfDamage", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deletenatureOfDamageAction({ commit }, natureOfDamage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("NatureOfDamage/delete", natureOfDamage)
          .then((response) => {
            commit("DELETE_natureOfDamage", natureOfDamage);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editnatureOfDamageAction({ commit }, natureOfDamage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("NatureOfDamage/update", natureOfDamage)
          .then((response) => {
            commit("EDIT_natureOfDamage", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getnatureOfDamages: (state) => {
      return state.natureOfDamages;
    },
  },
};
export default natureOfDamageModule;
