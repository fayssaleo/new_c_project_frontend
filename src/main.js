import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";
import VCalendar from "v-calendar";

import "@/scss/LoginStyle.scss";
import "@/scss/GlobalStyle.scss";
import "@/scss/AddClaim.scss";

Vue.config.productionTip = false;
Vue.use(VCalendar, {
  componentPrefix: "vc",
});
Vue.use(VueSweetalert2);
new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
