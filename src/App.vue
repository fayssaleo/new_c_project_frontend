<template>
  <v-app class="home">
    <LoadingPage v-if="getModuleShow" />
    <Home v-if="logged" />
    <Login v-else />
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import LoadingPage from "./components/LoadingPage.vue";
import Login from "./views/Login.vue";
import Home from "./components/Home/Home.vue";
export default {
  components: {
    Login,
    Home,
    LoadingPage,
  },
  data() {
    return {
      logged: false,

      fonction: "",
      department: "",
    };
  },
  mounted() {
    if (this.getUserActive == null) {
      this.logged = false;
    } else if (this.getUserActive != null) {
      this.fonction = this.getUserActive.fonction.name;
      this.department = this.getUserActive.fonction.department.name;
      this.logged = true;
    }
  },
  computed: {
    ...mapGetters(["getUsers", "getUserActive", "getModuleShow"]),
  },
  watch: {},
  methods: {
    initialize() {},
    logout() {
      localStorage.clear();
      this.$router.push({
        name: "Login",
      });
      window.location.reload();
    },
    changepassword() {
      this.model.id = this.getUserActive.id;
      if (this.model.password == this.Validpassword) {
        this.changePasswordAction(this.model).then(() => {
          swal("success", "Password has been changed successfully", "success");
          this.dialog = false;
        });
      } else {
        swal(
          "warning !!",
          "Please your password not matched with valide password!",
          "warning"
        );
      }
      //this.changePasswordAction().then(() => {});
    },
    ...mapActions(["changePasswordAction"]),
  },
};
</script>
