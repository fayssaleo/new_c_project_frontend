import Vue from "vue";
import VueRouter from "vue-router";
import Equipment from "../views/Equipment/Equipment.vue";
import Addclaim from "../views/Equipment/Addclaim.vue";
import Automobile from "../views/Automobile/Automobile.vue";
import AddclaimAuto from "../views/Automobile/AddclaimAuto.vue";
import Vessel from "../views/Vessel/Vessel.vue";
import AddclaimVessel from "../views/Vessel/AddclaimVessel.vue";
import Container from "../views/Container/Container.vue";
import AddclaimContainer from "../views/Container/AddclaimContainer.vue";
import CreateClaimOrIncident from "../views/Claim/CreateClaimOrIncident.vue";
import Claim from "../views/Claim/Claim.vue";
import User from "../views/User/User.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Equipment",
    component: Equipment,
  },
  {
    path: "/CreateClaimOrIncident",
    name: "CreateClaimOrIncident",
    component: CreateClaimOrIncident,
  },
  {
    path: "/Claim",
    name: "Claim",
    component: Claim,
  },
  {
    path: "/Addclaim",
    name: "Addclaim",
    component: Addclaim,
  },
  {
    path: "/Automobile",
    name: "Automobile",
    component: Automobile,
  },
  {
    path: "/AddclaimAuto",
    name: "AddclaimAuto",
    component: AddclaimAuto,
  },
  {
    path: "/Vessel",
    name: "Vessel",
    component: Vessel,
  },
  {
    path: "/AddclaimVessel",
    name: "AddclaimVessel",
    component: AddclaimVessel,
  },
  {
    path: "/Container",
    name: "Container",
    component: Container,
  },
  {
    path: "/AddclaimContainer",
    name: "AddclaimContainer",
    component: AddclaimContainer,
  },
  {
    path: "/User",
    name: "User",
    component: User,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
