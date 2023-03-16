import CustomizedAxios from "../../plugins/axios";

const EquipmentMatriculeModule = {
  state: {
    equipmentMatricules: [],
    equipmentMatricule: "",
  },
  mutations: {
    SET_equipmentMatricule(state, equipmentMatricules) {
      state.equipmentMatricules = equipmentMatricules;
    },
    SET_equipmentMatriculeById_eq(state, equipmentMatricule) {
      state.equipmentMatricule = equipmentMatricule;
    },
    ADD_equipmentMatricule(state, equipmentMatricule) {
      state.equipmentMatricules.push(equipmentMatricule);
    },
    DELETE_equipmentMatricule(state, equipmentMatricule) {
      state.equipmentMatricules = state.equipmentMatricules.filter(
        (c) => c.id != equipmentMatricule.id
      );
    },
    EDIT_equipmentMatricule(state, equipmentMatricule) {
      state.equipmentMatricules = state.equipmentMatricules.map((c) => {
        if (c.id == equipmentMatricule.id) return equipmentMatricule;
        return c;
      });
    },
  },
  actions: {
    setequipmentMatriculesAction({ commit }, equipment) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("EquipmentMatricule/" + equipment)
          .then((response) => {
            commit("SET_equipmentMatricule", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setequipmentMatriculeById_eqAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("EquipmentMatricule/index/" + id)
          .then((response) => {
            commit("SET_equipmentMatriculeById_eq", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getequipmentMatricules: (state) => {
      return state.equipmentMatricules;
    },
    getequipmentMatricule: (state) => {
      return state.equipmentMatricule;
    },
  },
};
export default EquipmentMatriculeModule;
