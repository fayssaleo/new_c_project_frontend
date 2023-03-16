import CustomizedAxios from "../../plugins/axios";

const typeOfEquipmentModel = {
  state: {
    typeOfEquipments: [],
  },
  mutations: {
    SET_TypeOfEquipment(state, typeOfEquipments) {
      state.typeOfEquipments = typeOfEquipments;
    },
    ADD_TypeOfEquipment(state, TypeOfEquipment) {
      state.typeOfEquipments.push(TypeOfEquipment);
    },
    DELETE_TypeOfEquipment(state, TypeOfEquipment) {
      state.typeOfEquipments = state.typeOfEquipments.filter(
        (c) => c.id != typeOfEquipment.id
      );
    },
    EDIT_TypeOfEquipment(state, TypeOfEquipment) {
      state.typeOfEquipment = state.typeOfEquipment.map((c) => {
        if (c.id == TypeOfEquipment.id) return TypeOfEquipment;
        return c;
      });
    },
  },
  actions: {
    setTypeOfEquipmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("TypeOfEquipment/")
          .then((response) => {
            commit("SET_TypeOfEquipment", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setTypeOfEquipmentsByEquipmentAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("TypeOfEquipment/index/equipment")
          .then((response) => {
            commit("SET_TypeOfEquipment", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setTypeOfEquipmentsByAutomobileAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("TypeOfEquipment/index/automobile")
          .then((response) => {
            commit("SET_TypeOfEquipment", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setTypeOfEquipmentbyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("TypeOfEquipment/" + id)
          .then((response) => {
            commit("SET_TypeOfEquipment", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteTypeOfEquipmentAction({ commit }, TypeOfEquipment) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("TypeOfEquipment/delete", TypeOfEquipment)
          .then((response) => {
            commit("DELETE_TypeOfEquipment", TypeOfEquipment);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editTypeOfEquipmentAction({ commit }, TypeOfEquipment) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("TypeOfEquipment/update", TypeOfEquipment)
          .then((response) => {
            commit("EDIT_TypeOfEquipment", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getTypeOfEquipments: (state) => {
      return state.typeOfEquipments;
    },
  },
};
export default typeOfEquipmentModel;
