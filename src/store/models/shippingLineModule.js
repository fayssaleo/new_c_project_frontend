import CustomizedAxios from "../../plugins/axios";

const shippingLineModule = {
  state: {
    shippingLines: [],
  },
  mutations: {
    SET_shippingLine(state, shippingLines) {
      state.shippingLines = shippingLines;
    },
    ADD_shippingLine(state, shippingLine) {
      state.shippingLines.push(shippingLine);
    },
    DELETE_shippingLine(state, shippingLine) {
      state.shippingLines = state.shippingLines.filter((c) => c.id != shippingLine.id);
    },
    EDIT_shippingLine(state, shippingLine) {
      state.shippingLines = state.shippingLines.map((c) => {
        if (c.id == shippingLine.id) return shippingLine;
        return c;
      });
    },
  },
  actions: {
    setshippingLinesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("shippingLine/")
          .then((response) => {
            commit("SET_shippingLine", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setshippingLinebyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("shippingLine/" + id)
          .then((response) => {
            commit("SET_shippingLine", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteshippingLineAction({ commit }, shippingLine) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("shippingLine/delete", shippingLine)
          .then((response) => {
            commit("DELETE_shippingLine", shippingLine);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editshippingLineAction({ commit }, shippingLine) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("shippingLine/update", shippingLine)
          .then((response) => {
            commit("EDIT_shippingLine", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getshippingLines: (state) => {
      return state.shippingLines;
    },
  },
};
export default shippingLineModule;
