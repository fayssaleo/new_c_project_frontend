import CustomizedAxios from "../../plugins/axios";

const estimateModule = {
  state: {
    estimates: [],
    otherValuations: [],
    estimateFile: [],
  },
  mutations: {
    SET_ESTIMATES(state, estimates) {
      state.estimates = estimates;
    },
    SET_estimateFile(state, estimateFile) {
      state.estimateFile = estimateFile;
    },
    ADD_ESTIMATE(state, estimate) {
      state.estimates.push(estimate);
    },
    DELETE_ESTIMATE(state, estimate) {
      state.estimates = state.estimates.filter(
        (c) => c.estimate.id != estimate.estimate.id
      );
    },
    EDIT_ESTIMATE(state, estimate) {
      state.estimates = state.estimates.map((c) => {
        if (c.estimate.id == estimate.estimate.id) return estimate;
        return c;
      });
    },
    SET_OTHERVALUATIONS(state, otherValuations) {
      state.otherValuations = otherValuations;
    },
    ADD_OTHERVALUATIONS(state, otherValuation) {
      state.otherValuations.push(otherValuation);
    },
    DELETE_OTHERVALUATIONS(state, otherValuation) {
      state.otherValuations = state.otherValuations.filter(
        (c) => c.id != otherValuation.id
      );
    },
    DELETE_OTHERVALUATIONS_BYNAME(state, otherValuation) {
      state.otherValuations = state.otherValuations.filter(
        (c) => c.name != otherValuation.name
      );
    },
    EDIT_OTHERVALUATIONS(state, otherValuation) {
      state.otherValuations = state.otherValuations.map((c) => {
        if (c.id == otherValuation.id) return otherValuation;
        return c;
      });
    },
    EDIT_OTHERVALUATIONS_BYNAME(state, otherValuation) {
      state.otherValuations = state.otherValuations.map((c) => {
        if (c.name == otherValuation.name) return otherValuation;
        return c;
      });
    },
  },
  actions: {
    setCustomedFieldByEstimateAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/CustomedField/" + id)
          .then((response) => {
            commit("SET_CUSTOMEDFIELDS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesEquipmentAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexEquipment/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesAutomobileAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexAutomobile/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesVesselAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexVessel/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesContainerAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexContainer/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("equipment_id", estimate.equipment_id);
        //estimateFormData.append("file", estimate.file);
        if (estimate.file != "create") {
          estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        estimateFormData.append("equipment_id", estimate.equipment_id);
        if (estimate.otherValuations.length > 0) {
          var i = 0;

          estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateContainerAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("container_id", estimate.container_id);
        if (estimate.file != "create") {
          estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        if (estimate.otherValuations.length > 0) {
          var i = 0;

          estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateAutomobileAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("automobile_id", estimate.automobile_id);
        if (estimate.file != "create") {
          estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        if (estimate.otherValuations.length > 0) {
          var i = 0;

          estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateVesselAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("vessel_id", estimate.vessel_id);
        if (estimate.file != "create") {
          estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        if (estimate.otherValuations.length > 0) {
          var i = 0;

          estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteestimateAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("estimates/delete", estimate.estimate)
          .then((response) => {
            commit("DELETE_ESTIMATE", estimate);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("equipment_id", estimate.estimate.equipment_id);
        if (estimate.estimate.file != "create") {
          estimate.estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }

        if (estimate.estimate.filesDelete.length > 0) {
          var i = 0;

          estimate.estimate.filesDelete.map((item) => {
            estimateFormData.append(`filesDelete[${i}][id]`, item.id);
            estimateFormData.append(
              `filesDelete[${i}][filename]`,
              item.filename
            );
            estimateFormData.append(
              `filesDelete[${i}][estimate_id]`,
              item.estimate_id
            );

            i++;
          });
        }
        if (estimate.estimate.otherValuations.length > 0) {
          var i = 0;
          estimate.estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateContainerAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("container_id", estimate.estimate.container_id);

        if (estimate.estimate.file != "create") {
          estimate.estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        if (estimate.estimate.otherValuations.length > 0) {
          var i = 0;
          estimate.estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update/container", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateAutomobileAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append(
          "automobile_id",
          estimate.estimate.automobile_id
        );
        if (estimate.estimate.file != "create") {
          estimate.estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        if (estimate.estimate.otherValuations.length > 0) {
          var i = 0;
          estimate.estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update/automobile", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateVesselAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );

        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("vessel_id", estimate.estimate.vessel_id);

        if (estimate.estimate.file != "create") {
          estimate.estimate.file.map((item) => {
            estimateFormData.append("files[]", item);
          });
        }
        if (estimate.estimate.otherValuations.length > 0) {
          var i = 0;
          estimate.estimate.otherValuations.map((customedField) => {
            estimateFormData.append(
              `otherValuations[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `otherValuations[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `otherValuations[${i}][currency]`,
              customedField.currency
            );
            estimateFormData.append(
              `otherValuations[${i}][value]`,
              customedField.value
            );
            estimateFormData.append(
              `otherValuations[${i}][taux_change]`,
              customedField.taux_change
            );
            estimateFormData.append(
              `otherValuations[${i}][value_valuation]`,
              customedField.value_valuation
            );
            estimateFormData.append(
              `otherValuations[${i}][estimate_id]`,
              customedField.estimate_id
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update/vessel", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setFilesByidEstimateAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimateFile/index/" + id)
          .then((response) => {
            commit("SET_estimateFile", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setOtherValuationsByidEstimateAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("otherValuation/index/" + id)
          .then((response) => {
            commit("SET_OTHERVALUATIONS", response.data.payload);

            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    AddOtherValuationsByidEstimateAction({ commit }, otherValuation) {
      commit("ADD_OTHERVALUATIONS", otherValuation);
    },
    DeleteOtherValuationsByidEstimateAction({ commit }, otherValuation) {
      commit("DELETE_OTHERVALUATIONS", otherValuation);
    },
    DeleteOtherValuationsBynameAction({ commit }, otherValuation) {
      commit("DELETE_OTHERVALUATIONS_BYNAME", otherValuation);
    },
    EditeOtherValuationsByidAction({ commit }, otherValuation) {
      commit("EDIT_OTHERVALUATIONS", otherValuation);
    },
    EditeOtherValuationsBynameAction({ commit }, otherValuation) {
      commit("EDIT_OTHERVALUATIONS_BYNAME", otherValuation);
    },
  },
  getters: {
    getestimates: (state) => {
      return state.estimates;
    },
    getotherValuations: (state) => {
      return state.otherValuations;
    },
    getestimateFiles: (state) => {
      return state.estimateFile;
    },
  },
};
export default estimateModule;
