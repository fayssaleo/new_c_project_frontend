import Vue from "vue";
import Vuex from "vuex";

import usersModule from "./models/userModule";
import typeOfEquipmentModel from "./models/typeOfEquipmentModel";
import brandModule from "./models/brandModule";
import natureOfDamageModule from "./models/natureOfDamageModule";
import departementModule from "./models/departementModule";
import functionModule from "./models/functionModule";
import claimsEquipmentModule from "./models/claimsEquipmentModule";
import claimsAutomobileModule from "./models/claimsAutomobileModule";
import claimsVesselModule from "./models/claimsVesselModule";
import claimsContainerModule from "./models/claimsContainerModule";
import estimateModule from "./models/estimateModule";
import shippingLineModule from "./models/shippingLineModule";
import loadingModule from "./models/loadingModule";
import claimsModule from "./models/claimsModule";
import companieModule from "./models/companieModule";
import EquipmentMatriculeModule from "./models/EquipmentMatriculeModule";

import VuexPersist from "vuex-persist";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "ClaimCach",
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  reducer: (state) => ({
    usersModule: state.usersModule,
    claimsEquipmentModule: state.claimsEquipmentModule,
    claimsAutomobileModule: state.claimsAutomobileModule,
    claimsVesselModule: state.claimsVesselModule,
    claimsContainerModule: state.claimsContainerModule,
    claimsModule: state.claimsModule,
  }),
  filter: (mutation) => true,
});

let store = null;

export default function () {
  store = new Vuex.Store({
    modules: {
      usersModule,
      loadingModule,
      typeOfEquipmentModel,
      brandModule,
      natureOfDamageModule,
      functionModule,
      departementModule,
      claimsEquipmentModule,
      estimateModule,
      claimsAutomobileModule,
      claimsVesselModule,
      claimsContainerModule,
      shippingLineModule,
      claimsModule,
      EquipmentMatriculeModule,
      companieModule
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [vuexLocalStorage.plugin],
  });
  return store;
}

export { store };
