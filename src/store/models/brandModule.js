import CustomizedAxios from "../../plugins/axios";

const brandModule = {
  state: {
    brands: [],
  },
  mutations: {
    SET_brand(state, brands) {
      state.brands = brands;
    },
    ADD_brand(state, brand) {
      state.brands.push(brand);
    },
    DELETE_brand(state, brand) {
      state.brands = state.brands.filter((c) => c.id != brand.id);
    },
    EDIT_brand(state, brand) {
      state.brands = state.brands.map((c) => {
        if (c.id == brand.id) return brand;
        return c;
      });
    },
  },
  actions: {
    setbrandsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("brand/")
          .then((response) => {
            commit("SET_brand", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setbrandsEquipmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("brand/index/equipment")
          .then((response) => {
            commit("SET_brand", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setbrandsAutomobilesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("brand/index/automobile")
          .then((response) => {
            commit("SET_brand", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setbrandbyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("brand/" + id)
          .then((response) => {
            commit("SET_brand", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deletebrandAction({ commit }, brand) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("brand/delete", brand)
          .then((response) => {
            commit("DELETE_brand", brand);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editbrandAction({ commit }, brand) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("brand/update", brand)
          .then((response) => {
            commit("EDIT_brand", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getbrands: (state) => {
      return state.brands;
    },
  },
};
export default brandModule;
