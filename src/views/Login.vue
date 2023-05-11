<template>
  <v-row style="margin: 0; padding: 0; background: #fff">
    <v-col cols="7" class="backgroundLogin"> </v-col>
    <v-col cols="5" class="form">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8" style="color: red" v-if="failedAuth">
          Incorrect username or password !
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field solo v-model="username" label="username"></v-text-field
        ></v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field
            solo
            type="password"
            v-model="password"
            label="password"
          ></v-text-field>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>

      <div class="btn_form">
        <v-btn color="#A6CEE3" class="mb-2 btn white--text" @click="Login">
          <v-icon left> mdi-login-variant </v-icon>
          LOGIN
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CustomizedAxios from "../plugins/axios";
export default {
  components: {},
  data() {
    return {
      failedAuth: false,
      logged: false,
      username: null,
      password: null,
      userActive: {
        user: {
          id: null,
          username: "",
          lastName: "",
          firstName: "",
          email: "",
          phoneNumber: "",
          fonction_id: null,
          created_at: "",
          updated_at: "",
          fonction: {
            id: null,
            name: "",
            department_id: "",
            created_at: "",
            updated_at: "",
            department: {
              id: null,
              name: "",
              created_at: "",
              updated_at: "",
            },
          },
        },
        token: "",
      },
    };
  },
  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    ...mapGetters(["getUsers", "getUserActive"]),
  },
  watch: {},
  methods: {
    initialize() {},
    Login() {
      var userLogin = {
        username: this.username,
        password: this.password,
      };

      this.LoginAction(userLogin)
        .then((resolve) => {
          this.$router.push({
            name: "Claim",
          });
          window.location.reload();
        })
        .catch(() => {
          this.failedAuth = true;
        });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "LoginAction",
      "addUserAction2",
    ]),
  },
};
</script>
<style></style>
